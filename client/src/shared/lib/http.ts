import axios from "axios";

const axiosInstance = axios.create({
	baseURL: import.meta.env.VITE_SERVER_URL + "/api",
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
