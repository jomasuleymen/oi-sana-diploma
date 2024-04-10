import { getSpecialists } from "@pages/specialist/specialist.service";
import { useQuery } from "@tanstack/react-query";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

type Props = {
	search?: string;
};

export const useSpecialists = ({ search }: Props) => {
	const [page, setPage] = useState<number>(1);
	const { data, error, isError, isLoading } = useQuery({
		queryKey: ["specialists", search, page.toString()],
		queryFn: async () => await getSpecialists({ page, name: search }),
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
