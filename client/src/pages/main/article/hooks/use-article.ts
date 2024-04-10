import { getArticle } from "@pages/main/article/article.service";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { toast } from "sonner";

export const useArticle = (slug: string) => {
	const { data, error, isError, isLoading } = useQuery({
		queryKey: ["article", slug],
		queryFn: async () => await getArticle(slug),
		refetchOnWindowFocus: false,
		refetchOnReconnect: true,
	});

	useEffect(() => {
		if (isError) toast.error("Something went wrong");
	}, [isError, error]);

	return { isLoading, item: data || null };
};
