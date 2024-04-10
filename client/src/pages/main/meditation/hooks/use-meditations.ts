import { useQuery } from "@tanstack/react-query";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { getMeditations } from "../meditation.service";

export const useMeditations = (category: string) => {
	const [page, setPage] = useState<number>(1);
	const { data, error, isError, isLoading } = useQuery({
		queryKey: ["meditations", page.toString()],
		queryFn: async () => await getMeditations({ page, category }),
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
