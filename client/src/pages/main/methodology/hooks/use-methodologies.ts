import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { toast } from "sonner";
import { getMethodologies } from "../methodology.service";

export const useMethodologies = () => {
	const { data, error, isError, isLoading } = useQuery({
		queryKey: ["methodologies"],
		queryFn: async () => await getMethodologies(),
		refetchOnWindowFocus: false,
		refetchOnReconnect: true,
	});

	useEffect(() => {
		if (isError) toast.error("Something went wrong");
	}, [isError, error]);

	return { isLoading, items: data || [] };
};
