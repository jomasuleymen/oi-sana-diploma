import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { toast } from "sonner";
import { fetchCategories } from "../meditation.service";

export const useMeditationCategories = () => {
	const { data, error, isError, isLoading } = useQuery({
		queryKey: ["meditations-catergories"],
		queryFn: async () => await fetchCategories(),
		refetchOnWindowFocus: false,
		refetchOnReconnect: true,
	});

	useEffect(() => {
		if (isError) toast.error("Something went wrong");
	}, [isError, error]);

	return { isLoading, items: data || [] };
};
