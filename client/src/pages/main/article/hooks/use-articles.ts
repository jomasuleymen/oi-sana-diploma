import { getArticles } from "@pages/main/article/article.service";
import { useQuery } from "@tanstack/react-query";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

export const useArticles = (userId?: string) => {
	const [page, setPage] = useState<number>(1);
	const { data, error, isError, isLoading } = useQuery({
		queryKey: ["articles", userId, page.toString()],
		queryFn: async () => await getArticles({ page, userId }),
		refetchOnWindowFocus: false,
		refetchOnReconnect: true,
	});

	useEffect(() => {
		if (isError) toast.error("Something went wrong");
	}, [isError, error]);

	const nextPage = useCallback(() => {
		if (data?.pageCount && page < data.pageCount) setPage((p) => p + 1);
	}, [data, page]);

	return { isLoading, articles: data?.items || [], nextPage };
};
