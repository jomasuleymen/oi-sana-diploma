import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { toast } from "sonner";
import { getReviews } from "../course.service";

export const useReviews = (slug: string) => {
	const { data, error, isError, isLoading } = useQuery({
		queryKey: ["reviews", slug],
		queryFn: async () => await getReviews(slug),
		refetchOnWindowFocus: false,
		refetchOnReconnect: true,
	});

	useEffect(() => {
		if (isError) toast.error("Something went wrong");
	}, [isError, error]);

	return { isLoading, item: data || [] };
};
