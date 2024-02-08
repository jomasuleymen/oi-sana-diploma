import { Button } from "@components/ui/button";
import { Form, FormField, FormItem, FormMessage } from "@components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Input } from "@components/ui/input";
import { ArticleSchema } from "@pages/main/article/article.schema";
import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import { toast } from "sonner";

import { FormErrorProps } from "@components/ui/form-error";
import { CreateArticleType, createArticle } from "@pages/main/article/article.service";
import { useMutation } from "@tanstack/react-query";
import "react-quill/dist/quill.snow.css";

type IArticleForm = z.infer<typeof ArticleSchema>;

export function CreateArticleForm() {
	const { mutate, isPending, isSuccess, isError, error } = useMutation<
		any,
		FormErrorProps,
		CreateArticleType
	>({ mutationFn: createArticle });
	const [imageUrl, setImageUrl] = useState<string | null>(null);

	const form = useForm<IArticleForm>({
		resolver: zodResolver(ArticleSchema),
		defaultValues: {
			title: "",
			content: "",
			coverImage: "",
		},
	});

	const onSubmit = async (article: IArticleForm) => {
		mutate(article);
	};

	useEffect(() => {
		if (isSuccess) {
			toast.success("Article created successfully");
			form.reset();
		} else if (isError) {
			toast.error(error?.message);
		}
	}, [isSuccess, isError]);

	const uploadImages = async (files: File[]) => {};

	return (
		<>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="">
					<FormField
						control={form.control}
						name="coverImage"
						render={({ field }) => (
							<FormItem className="w-full">
								{imageUrl && <img src={imageUrl} width={200} height={200} />}
								<Input
									type="file"
									accept="image/*"
									disabled={isPending}
									onChange={(e) => {
										e.preventDefault();
										const files = e.target.files;
										if (!files || !files.length) return;
										uploadImages(Array.from(files));
									}}
								/>
								<FormMessage className="mx-2 my-1 mb-0 text-xs" />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="title"
						render={({ field }) => (
							<FormItem className="w-full">
								<Input
									type="text"
									disabled={isPending}
									placeholder="Title"
									{...field}
								/>
								<FormMessage className="mx-2 my-1 mb-0 text-xs" />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="content"
						render={({ field }) => (
							<FormItem className="w-full">
								<ReactQuill
									theme="snow"
									placeholder="Write something..."
									className="h-72 mb-12"
									onChange={(value) => {
										form.setValue("content", value);
									}}
								/>
								<FormMessage className="mx-2 my-1 mb-0 text-xs" />
							</FormItem>
						)}
					/>
					<Button type="submit">Submit</Button>
				</form>
			</Form>
		</>
	);
}
