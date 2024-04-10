import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { toast } from "sonner";
import { getAffirmations } from "../services/affirmation.service";

export const useAffirmations = () => {
	const { data, error, isError, isLoading } = useQuery({
		queryKey: ["affirmations"],
		queryFn: async () => await getAffirmations(),
		refetchOnWindowFocus: false,
		refetchOnReconnect: true,
	});

	useEffect(() => {
		if (isError) toast.error("Something went wrong");
	}, [isError, error]);

	return { isLoading, items: data || [] };
};
