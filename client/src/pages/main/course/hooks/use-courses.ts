import { useQuery } from "@tanstack/react-query";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { getCourses } from "../course.service";

type Props = {
	search?: string;
	specId?: number | string;
	my?: boolean;
};

export const useCourses = ({ search, specId, my }: Props) => {
	const [page, setPage] = useState<number>(1);
	const { data, error, isError, isLoading } = useQuery({
		queryKey: ["courses", search, specId, my, page.toString()],
		queryFn: async () => await getCourses({ page, specId, name: search, my }),
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
