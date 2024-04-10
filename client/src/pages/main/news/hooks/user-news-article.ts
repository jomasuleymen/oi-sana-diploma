import { getNewsArticle } from "@pages/main/home/services/news.service";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { toast } from "sonner";

export const useNewsArticle = (slug: string) => {
	const { data, error, isError, isLoading } = useQuery({
		queryKey: ["news-article", slug],
		queryFn: async () => await getNewsArticle(slug),
		refetchOnWindowFocus: false,
		refetchOnReconnect: true,
	});

	useEffect(() => {
		if (isError) toast.error("Something went wrong");
	}, [isError, error]);

	return { isLoading, item: data || null };
};
