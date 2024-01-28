import axios from "axios";

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
		const errorData = err.response?.data || { message: "Some error occured" };
		return Promise.reject({ ...err, data: errorData });
	}
);

export default axiosInstance;
