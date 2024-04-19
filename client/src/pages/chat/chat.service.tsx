import $api from "@lib/http";

const CHATS_ENDPOINT = "/chats";

export const checkMessagePermission = async (userId: string | number) => {
	return await $api.get<boolean>(`${CHATS_ENDPOINT}/message-permission/${userId}`).then((res) => {
		return res.data;
	});
};
