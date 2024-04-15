import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuthStore } from "@store/auth.store";

type useAuthParams = {
	admin?: boolean;
	specialist?: boolean;
	doNavigate?: boolean;
};

export const useAuth = (
	{ admin, specialist, doNavigate }: useAuthParams = {
		doNavigate: true,
	}
) => {
	const navigate = useNavigate();
	const [done, setDone] = useState(false);
	const [user, loading, triedFetch, fetchMe] = useAuthStore((store) => [
		store.user,
		store.loading,
		store.triedFetch,
		store.fetchMe,
	]);

	useEffect(() => {
		if (!triedFetch) {
			fetchMe();
			return;
		}

		if (loading) return;

		if (doNavigate) {
			if (!user) {
				const searchParams = new URLSearchParams(window.location.search);
				searchParams.delete("callbackUrl");
				searchParams.append("callbackUrl", window.location.pathname);
				navigate(`/auth?${searchParams.toString()}`);
			} else if (admin && !user.isAdmin) {
				navigate("/");
			} else if (specialist && !user.isAdmin && !user.isSpecialist) {
				navigate("/");
			}
		}

		setDone(true);
	}, [user, loading, triedFetch, fetchMe, doNavigate, admin, specialist]);

	return { user, loading: loading || !triedFetch || !done };
};
