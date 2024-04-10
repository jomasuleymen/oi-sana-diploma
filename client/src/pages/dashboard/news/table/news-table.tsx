import { DataTable } from "@components/data-table/data-table";
import { Heading } from "@components/ui/heading";
import { Separator } from "@components/ui/separator";
import $api from "@lib/http";
import { cn } from "@utils/utils";
import { useQueryClient } from "@tanstack/react-query";
import React, { useCallback, useMemo } from "react";
import { filterableColumns, generateColumns, searchableColumns } from "./news-columns";
import { NewsArticle } from "@pages/main/home/services/news.service";

const API_ENDPOINT = "/news";
const QUERY_KEY = "news";

const deleteNews = async (news: NewsArticle | NewsArticle[]) => {
	const id = Array.isArray(news) ? news.map((affirmation) => affirmation.id) : news.id;
	return $api.delete(API_ENDPOINT + "/many", { data: { id } });
};

export const NewsTable: React.FC = () => {
	const queryClient = useQueryClient();
	const queryKey = QUERY_KEY;

	const deleteRowsAction = useCallback(
		async (affirmation: NewsArticle | NewsArticle[]) => {
			await deleteNews(affirmation)
				.catch((err) => {})
				.finally(() => {
					queryClient.invalidateQueries({ queryKey: [queryKey] });
				});
		},
		[queryClient, queryKey]
	);

	const columns = useMemo(
		() => generateColumns({ onRowDeleteAction: deleteRowsAction }),
		[deleteRowsAction]
	);

	return (
		<div className={cn("h-full flex-1 space-y-4 pt-6")}>
			<div className="flex items-start justify-between">
				<Heading title="News" description="Manage news" addNewLink="/dashboard/news/new" />
			</div>
			<Separator />
			<DataTable
				columns={columns}
				filterableColumns={filterableColumns}
				searchableColumns={searchableColumns}
				deleteRowsAction={deleteRowsAction}
				url={API_ENDPOINT}
				queryKey={queryKey}
			/>
		</div>
	);
};
