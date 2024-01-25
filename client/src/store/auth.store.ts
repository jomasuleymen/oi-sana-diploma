import { User } from "@/services/user.service";
import { LoginUserType, fetchMe, login, logout } from "@/services/auth.service";
import { create } from "zustand";

type AuthStore = {
	user: User | null;
	isAuth: boolean;
	loading: boolean;
	login: (data: LoginUserType) => Promise<any>;
	logout: () => Promise<void>;
	checkAuth: () => Promise<any>;
};

export const useAuthStore = create<AuthStore>((set, get) => ({
	user: null,
	isAuth: false,
	loading: false,

	async login(data: LoginUserType) {
		const res = await login(data);
		set({ isAuth: true });
		return res;
	},

	async logout() {
		set({ loading: true });

		await logout();
		set({ user: null, isAuth: false, loading: false });
	},

	async checkAuth() {
		set({ loading: true });

		const user = await fetchMe();
		set({ user, isAuth: true, loading: false });

		return {
			success: true,
		};
	},
}));
