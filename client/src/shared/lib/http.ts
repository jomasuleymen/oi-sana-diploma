import axios from "axios";

export const API_ENDPOINT = import.meta.env.VITE_SERVER_URL + "/api";

const axiosInstance = axios.create({
	baseURL: API_ENDPOINT,
	headers: { "Content-Type": "application/json" },
	withCredentials: true,
});

axiosInstance.interceptors.response.use(
	(response) => response,
	(err) => {
		const errorData = err.response?.data || { message: "Some error occured" };
		return Promise.reject(errorData);
	}
);

export default axiosInstance;
