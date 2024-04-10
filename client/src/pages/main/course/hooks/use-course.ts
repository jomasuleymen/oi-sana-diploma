import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { toast } from "sonner";
import { getCourse } from "../course.service";

export const useCourse = (slug: string) => {
	const { data, error, isError, isLoading } = useQuery({
		queryKey: ["course", slug],
		queryFn: async () => await getCourse(slug),
		refetchOnWindowFocus: false,
		refetchOnReconnect: true,
	});

	useEffect(() => {
		if (isError) toast.error("Something went wrong");
	}, [isError, error]);

	return { isLoading, item: data || null };
};
