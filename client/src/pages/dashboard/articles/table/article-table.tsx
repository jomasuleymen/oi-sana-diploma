import { DataTable } from "@components/data-table/data-table";
import { Heading } from "@components/ui/heading";
import { Separator } from "@components/ui/separator";
import $api from "@lib/http";
import { cn } from "@utils/utils";
import { Article } from "@pages/main/article/article.service";
import { useQueryClient } from "@tanstack/react-query";
import React, { useCallback, useMemo } from "react";
import { filterableColumns, generateColumns, searchableColumns } from "./article-columns";

const POSTS_API_ENDPOINT = "/articles";
const ARTICLE_QUERY_KEY = "article";

const deleteArticles = async (articles: Article | Article[]) => {
	const id = Array.isArray(articles) ? articles.map((article) => article.id) : articles.id;
	return $api.delete(POSTS_API_ENDPOINT + "/many", { data: { id } });
};

export const ArticlesTable: React.FC = () => {
	const queryClient = useQueryClient();
	const queryKey = ARTICLE_QUERY_KEY;

	const deleteRowsAction = useCallback(
		async (article: Article | Article[]) => {
			await deleteArticles(article)
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
				<Heading title="Articles" description="Manage articles" />
			</div>
			<Separator />
			<DataTable
				columns={columns}
				filterableColumns={filterableColumns}
				searchableColumns={searchableColumns}
				deleteRowsAction={deleteRowsAction}
				url={POSTS_API_ENDPOINT}
				queryKey={queryKey}
			/>
		</div>
	);
};
