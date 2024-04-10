import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { toast } from "sonner";
import { getSpecialist } from "../specialist.service";

export const useSpecialist = (id: string) => {
	const { data, error, isError, isLoading } = useQuery({
		queryKey: ["specialist", id],
		queryFn: async () => await getSpecialist(id),
		refetchOnWindowFocus: false,
		refetchOnReconnect: true,
	});

	useEffect(() => {
		if (isError) toast.error("Something went wrong");
	}, [isError, error]);

	return { isLoading, item: data };
};
