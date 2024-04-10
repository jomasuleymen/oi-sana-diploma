import { LoginUserType, fetchMe, login, logout } from "@pages/auth/auth.service";
import {
	UpdateProfileType,
	User,
	updateSpecialistProfile,
	updateUserProfile,
} from "@pages/main/user/user.service";
import { create } from "zustand";

type AuthStore = {
	user: User | null;
	isAuth: boolean;
	loading: boolean;
	triedFetch: boolean;
	login: (data: LoginUserType) => Promise<any>;
	logout: () => Promise<void>;
	fetchMe: () => Promise<any>;
	updateProfile: (data: UpdateProfileType) => Promise<any>;
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

	async updateProfile(data: UpdateProfileType) {
		const user = get().user;
		if (!user) return;

		let res;

		if (user.isSpecialist) {
			res = await updateSpecialistProfile(user.id.toString(), data);
		} else {
			res = await updateUserProfile(user.id.toString(), data);
		}

		get().fetchMe();
		return res;
	},
}));
