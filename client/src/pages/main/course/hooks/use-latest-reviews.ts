import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { toast } from "sonner";
import { getLatestReviews } from "../course.service";

export const useLatestReviews = () => {
	const { data, error, isError, isLoading } = useQuery({
		queryKey: ["latest-reviews"],
		queryFn: async () => await getLatestReviews(),
		refetchOnWindowFocus: false,
		refetchOnReconnect: true,
	});

	useEffect(() => {
		if (isError) toast.error("Something went wrong");
	}, [isError, error]);

	return { isLoading, item: data || [] };
};
