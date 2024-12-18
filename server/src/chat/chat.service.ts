import { RedisService } from "@liaoliaots/nestjs-redis";
import {
	BadRequestException,
	forwardRef,
	Inject,
	Injectable,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { isUUID } from "class-validator";
import { CourseService } from "src/course/course.service";
import { ROLE } from "src/user/user-enums";
import { UserService } from "src/user/user.service";
import { Repository } from "typeorm";
import { MessageDTO } from "./dto/message.dto";
import { Message } from "./entities/message.entity";

@Injectable()
export class ChatService {
	constructor(
		@InjectRepository(Message)
		private readonly messageRepo: Repository<Message>,
		private readonly userService: UserService,
		@Inject(forwardRef(() => CourseService))
		private readonly courseService: CourseService,
		private readonly redisService: RedisService,
	) {}

	async findDialogByRoomId(userId: number, roomId: string) {
		const [, id1, id2] = roomId.split("_");
		if (!id1 || !id2) {
			throw new BadRequestException("Invalid room id");
		}

		const anotherUserId = +id1 == userId ? +id2 : +id1;
		return await this.findDialog(userId, anotherUserId);
	}

	async findDialog(userId: number, anotherUserId: number) {
		const anotherUser = await this.userService.findById(anotherUserId);
		if (!anotherUser) {
			throw new BadRequestException("User not found");
		}

		const roomId = this.getRoomIdByUsers(userId, anotherUserId);

		const qb = this.messageRepo
			.createQueryBuilder("msg")
			.addSelect("u.id", "u_id")
			.addSelect("u.username", "u_username")
			.addSelect("u.profileImage", "u_profileImage")
			.addSelect(
				qb =>
					qb
						.from(Message, "msg")
						.select(`COUNT(*)`, "unreadMessagesCount")
						.where(`msg."receiverId" = :userId AND msg."read" = false`, {
							userId,
						}),
				"unread_messages_count",
			)
			.innerJoin(
				"users",
				"u",
				`(CASE WHEN msg."senderId" = :userId THEN msg."receiverId" ELSE msg."senderId" END) = u.id`,
				{ userId },
			)
			.where(`:roomId = msg."roomId"`, {
				roomId,
			});

		const result = await qb.getRawOne();

		if (!result) {
			return {
				id: this.getRoomIdByUsers(userId, anotherUser.id),
				user: {
					id: anotherUser.id,
					username: anotherUser.username,
					profileImage: anotherUser.profileImage,
				},
				latestMessage: null,
				unreadMessagesCount: 0,
			};
		}

		return {
			id: roomId,
			user: {
				id: result.u_id,
				username: result.u_username,
				profileImage: result.u_profileImage,
			},
			latestMessage: {
				id: result.msg_id,
				content: result.msg_content,
				date: result.msg_createdAt,
				read: result.msg_read,
				delivered: result.msg_delivered,
				senderId: result.msg_senderId,
				roomId,
			},
			unreadMessagesCount: Number(result.unread_messages_count) || 0,
		};
	}

	async findDialogMessages(roomId: string, before?: string) {
		const query = this.messageRepo
			.createQueryBuilder("msg")
			.addSelect("sender.id", "sender_id")
			.addSelect("receiver.id", "receiver_id")
			.innerJoinAndSelect("msg.sender", "sender")
			.innerJoinAndSelect("msg.receiver", "receiver")
			.where(`msg."roomId" = :roomId`, { roomId })
			.orderBy("msg.createdAt", "ASC");

		// before is uuid, id of message
		if (before) {
			if (!isUUID(before)) {
				throw new BadRequestException("Invalid before param");
			}

			query.andWhere(
				`msg.createdAt < (
				SELECT "createdAt" FROM "messages" WHERE "id" = :before
			)`,
				{ before },
			);
		}

		const messages = await query.getMany();

		const messagesDto = messages.map(message => ({
			id: message.id,
			content: message.content,
			date: message.createdAt,
			read: message.read,
			delivered: message.delivered,
			senderId: message.sender.id,
			roomId,
		}));

		return messagesDto;
	}

	async sendMessage(userId: number, createChatDto: MessageDTO) {
		try {
			const roomId = this.getRoomIdByUsers(userId, +createChatDto.receiverId);

			const isAllowed = await this.checkMessagePermission(roomId, userId);
			if (!isAllowed) {
				throw new BadRequestException("You are not allowed to send messages");
			}

			const sender = await this.userService.findById(userId);
			if (!sender) {
				throw new BadRequestException("Sender user not found");
			}

			const receiver = await this.userService.findById(
				+createChatDto.receiverId,
			);
			if (!receiver) {
				throw new BadRequestException("Receiver not found");
			}

			const message = await this.messageRepo.save({
				sender,
				receiver,
				roomId,
				content: createChatDto.content,
			});

			return message;
		} catch (e) {
			if (e instanceof BadRequestException) {
				throw e;
			}

			throw new BadRequestException("Failed to send message");
		}
	}

	async findRecentDialogs(userId: number) {
		const messageQuery = this.messageRepo
			.createQueryBuilder("msg")
			.addSelect("u.id", "u_id")
			.addSelect("u.username", "u_username")
			.addSelect("u.profileImage", "u_profileImage")
			.addSelect(
				`ROW_NUMBER() OVER(PARTITION BY "msg"."roomId" ORDER BY "msg"."createdAt" DESC)`,
				"row_n",
			)
			.addSelect(
				qb =>
					qb
						.from(Message, "msg")
						.select(`COUNT(*)`, "unreadMessagesCount")
						.where(`msg."receiverId" = :userId AND msg."read" = false`),
				"unread_messages_count",
			)
			.innerJoin(
				"users",
				"u",
				`(CASE WHEN msg."senderId" = :userId THEN msg."receiverId" ELSE msg."senderId" END) = u.id`,
			)
			.where(`:userId IN (msg."senderId", msg."receiverId")`);

		const query = this.messageRepo.manager
			.createQueryBuilder()
			.select("*")
			.from(`(${messageQuery.getSql()})`, "msg")
			.where(`msg."row_n" = 1`)
			.setParameters({
				userId,
			});

		const rows = await query.getRawMany();

		const result = rows.map(row => ({
			id: row.msg_roomId,
			user: {
				id: row.u_id,
				username: row.u_username,
				profileImage: row.u_profileImage,
			},
			latestMessage: {
				id: row.msg_id,
				content: row.msg_content,
				date: row.msg_createdAt,
				read: row.msg_read,
				delivered: row.msg_delivered,
				senderId: row.msg_senderId,
				roomId: row.msg_roomId,
			},
			unreadMessagesCount: Number(row.unread_messages_count) || 0,
		}));

		return result;
	}

	getRoomIdByUsers(id1: number, id2: number) {
		id1 = Number(id1);
		id2 = Number(id2);
		return `room_${Math.min(id1, id2)}_${Math.max(id1, id2)}`;
	}

	isMemberOfRoom(roomId: string, userId: number) {
		if (!roomId) return false;
		const [, id1, id2] = roomId.split("_");
		if (!id1 || !id2) return false;
		return +id1 == userId || +id2 == userId;
	}

	getMembersOfRoom(roomId: string) {
		const [, id1, id2] = roomId.split("_");
		if (!id1 || !id2) return null;
		return [+id1, +id2];
	}

	async checkMessagePermission(roomId: string, userId: number) {
		const redis = this.redisService.getOrThrow();

		const members = this.getMembersOfRoom(roomId);
		if (!members) throw new BadRequestException("Invalid room id");
		if (members[0] !== userId && members[1] !== userId)
			throw new BadRequestException("You are not a member of this room");

		const counterPartyId = members.find(id => id !== userId);
		if (!counterPartyId) throw new BadRequestException("Invalid room id");

		const redisKey = this.getMessagePermissionCacheKey(userId, counterPartyId);

		const cache = await redis.get(redisKey);
		if (cache !== null) {
			return cache === "1";
		}

		const user = await this.userService.findById(userId);
		if (!user) throw new BadRequestException("User not found");

		if (user.role === ROLE.ADMIN) {
			await redis.set(redisKey, 1);
			return true;
		}

		const counterparty = await this.userService.findById(counterPartyId);
		if (!counterparty) throw new BadRequestException("Counterparty not found");

		if (user.role === ROLE.SPECIAL && counterparty.role === ROLE.USER) {
			await redis.set(redisKey, 1);
			return true;
		}

		const isEnrolled = await this.courseService.checkIfUserEnrolledSpecCourse(
			counterPartyId,
			userId,
		);

		await redis.set(redisKey, isEnrolled ? 1 : 0);

		return isEnrolled;
	}

	async clearMessagePermissionCache(userId: number, counterPartyId: number) {
		const redis = this.redisService.getOrThrow();

		await redis.del(this.getMessagePermissionCacheKey(userId, counterPartyId));
		await redis.del(this.getMessagePermissionCacheKey(counterPartyId, userId));
	}

	private getMessagePermissionCacheKey(userId: number, counterPartyId: number) {
		return `message:permission:${userId}:${counterPartyId}`;
	}
}
