import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserService } from "src/user/user.service";
import { Equal, FindOneOptions, Repository } from "typeorm";
import { MessageDTO } from "./dto/message.dto";
import { MessageEntity } from "./entities/message.entity";
import { RoomEntity } from "./entities/room.entity";

@Injectable()
export class ChatService {
	private readonly findOptions: FindOneOptions<RoomEntity> = {
		relations: ["u1", "u2", "messages"],
		select: {
			id: true,
			messages: true,
			createdAt: true,
			u1: {
				id: true,
				username: true,
				profileImage: true,
			},
			u2: {
				id: true,
				username: true,
				profileImage: true,
			},
		},
		order: {
			createdAt: "DESC",
		},
	};

	constructor(
		@InjectRepository(MessageEntity)
		private messageRepo: Repository<MessageEntity>,
		@InjectRepository(RoomEntity)
		private roomRepo: Repository<RoomEntity>,
		private readonly userService: UserService,
	) {}

	async getRoom(user1Id: string, user2Id: string): Promise<RoomEntity> {
		let existsRoom = await this.roomRepo.findOne({
			where: [
				{
					u1: {
						id: user1Id,
					},
					u2: {
						id: user2Id,
					},
				},
				{
					u1: {
						id: user2Id,
					},
					u2: {
						id: user1Id,
					},
				},
			],
			...this.findOptions,
		});

		if (existsRoom) return existsRoom;

		if (!existsRoom) {
			const [user1, user2] = await Promise.all([
				this.userService.findById(user1Id),
				this.userService.findById(user2Id),
			]);

			if (!user1 || !user2) {
				throw new BadRequestException("User not found");
			}

			const roomEntity = this.roomRepo.create({
				u1: user1,
				u2: user2,
			});

			existsRoom = await this.roomRepo.save(roomEntity);
		}

		return await this.getRoom(user1Id, user2Id);
	}

	async createMessage(userId: string, createChatDto: MessageDTO) {
		try {
			const sender = await this.userService.findById(userId);
			if (!sender) {
				throw new BadRequestException("Sender user not found");
			}

			const room = await this.roomRepo.findOneBy({
				id: Equal(createChatDto.roomId),
			});
			if (!room) {
				throw new BadRequestException("Room not found");
			}

			// TODO: Check if user is part of the room

			const messageEntity = this.messageRepo.create({
				sender: sender,
				room: room,
				content: createChatDto.content,
			});

			return await this.messageRepo.save(messageEntity);
		} catch (e) {
			throw new BadRequestException("Room not found");
		}
	}

	async findRooms(userId: string) {
		const query = this.roomRepo
			.createQueryBuilder("rooms")
			.select([
				"rooms.id",
				"u1.id",
				"u1.username",
				"u1.profileImage",
				"u2.id",
				"u2.username",
				"u2.profileImage",
				"messages.id",
				"messages.content",
				"messages.createdAt",
			])
			.leftJoin(
				subQuery =>
					subQuery
						.select(
							`messages."id", messages."roomId", ROW_NUMBER() OVER (PARTITION BY messages.roomId ORDER BY messages.createdAt DESC) AS RowNumber`,
						)
						.from(MessageEntity, "messages"),
				`messagesLined`,
				`"messagesLined"."roomId" = rooms."id" AND "messagesLined"."rownumber" = 1`,
			)
			.leftJoin(
				"rooms.messages",
				"messages",
				`messages.id = "messagesLined"."id"`,
			)
			.leftJoin("rooms.u1", "u1")
			.leftJoin("rooms.u2", "u2")
			.where("u1.id = :userId OR u2.id = :userId", { userId });

		return await query.getMany();
	}
}
