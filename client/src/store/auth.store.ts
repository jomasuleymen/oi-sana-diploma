import { LoginUserType, fetchMe, login, logout } from "@pages/main/auth/auth.service";
import { User } from "@pages/main/profile/user.service";
import { create } from "zustand";

type AuthStore = {
	user: User | null;
	isAuth: boolean;
	loading: boolean;
	triedFetch: boolean;
	login: (data: LoginUserType) => Promise<any>;
	logout: () => Promise<void>;
	fetchMe: () => Promise<any>;
};

export const useAuthStore = create<AuthStore>((set, get) => ({
	user: null,
	isAuth: false,
	loading: false,
	triedFetch: false,

	async login(data: LoginUserType) {
		const res = await login(data);
		get().fetchMe();

		return res;
	},

	async logout() {
		set({ loading: true });

		const res = await logout();
		set({ user: null, isAuth: false, loading: false });

		return res;
	},

	async fetchMe() {
		if (get().loading) return;
		
		set({ loading: true, triedFetch: true });

		const user = (await fetchMe()) || null;
		set({ user, isAuth: user != null, loading: false });
	},
}));
