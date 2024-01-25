import { AUTH_PATH } from "@/constants/paths";
import axios from "axios";

const UNAUTHORIZED = 401;

const defaultErrorData = {
	message: "Произошла ошибка",
	success: false,
};

const axiosInstance = axios.create({
	baseURL: import.meta.env.VITE_SERVER_URL,
	headers: { "Content-Type": "application/json" },
	withCredentials: true,
});

axiosInstance.interceptors.response.use(
	(response) => {
		return response;
	},
	(err) => {
		if (err.response?.status === UNAUTHORIZED) {
			window.location.href = AUTH_PATH;
		}
		const errorData = err.response?.data || defaultErrorData;
		return Promise.reject({ ...err, ...errorData });
	}
);

export default axiosInstance;
