import { cn } from "@utils/utils";
import { Check, CheckCheck, Clock } from "lucide-react";
import React from "react";
import { IncomeMessage, WriteMessage } from "../chat.types";

type Props = {
	myMessage: boolean;
	message: IncomeMessage | WriteMessage;
};

const ChatMessage: React.FC<Props> = ({ myMessage, message }) => {
	return (
		<div
			className={cn(
				"p-2 mx-0 rounded-lg max-w-xl relative",
				!myMessage && "bg-accent rounded-tl-none",
				myMessage && "bg-[#E1FFC7] rounded-tr-none"
			)}
		>
			<span className="break-words whitespace-pre-wrap">{message.content}</span>
			<MetaData message={message} myMessage={myMessage} />
		</div>
	);
};

export function isIncomeMessage(message: IncomeMessage | WriteMessage): message is IncomeMessage {
	return (message as IncomeMessage).senderId !== undefined;
}

const MetaData: React.FC<Props> = ({ message, myMessage }) => {
	return (
		<span className="text-[10px] text-gray-400 flex items-center gap-[0.15rem] float-right p-0 pl-2 relative -bottom-2">
			<span className="time inline-block">
				{new Date(message.date).toLocaleTimeString("ru-RU", {
					minute: "numeric",
					hour: "numeric",
				})}
			</span>
			<span className="status inline-block">
				{isIncomeMessage(message) ? (
					myMessage &&
					(message.read ? (
						<CheckCheck height={15} width={15} color="#4fc3f7" />
					) : message.delivered ? (
						<CheckCheck height={15} width={15} color="#88AEA5" />
					) : (
						<Check height={15} width={15} />
					))
				) : (
					<Clock height={15} width={15} />
				)}
			</span>
		</span>
	);
};

export default React.memo(ChatMessage);
