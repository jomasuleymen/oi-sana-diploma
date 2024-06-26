import { useQuery } from "@tanstack/react-query";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { getNews } from "../services/news.service";

export const useNews = () => {
	const [page, setPage] = useState<number>(1);
	const { data, error, isError, isLoading } = useQuery({
		queryKey: ["news", page.toString()],
		queryFn: async () => await getNews({ page }),
		refetchOnWindowFocus: false,
		refetchOnReconnect: true,
	});

	useEffect(() => {
		if (isError) toast.error("Something went wrong");
	}, [isError, error]);

	const nextPage = useCallback(() => {
		if (data?.pageCount && page < data.pageCount) setPage((p) => p + 1);
	}, [data, page]);

	return { isLoading, items: data?.items || [], nextPage };
};
