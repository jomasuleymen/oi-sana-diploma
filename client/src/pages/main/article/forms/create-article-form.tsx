import { Button } from "@components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Input } from "@components/ui/input";
import { ArticleSchema } from "@pages/main/article/article.schema";
import { useEffect } from "react";
import ReactQuill from "react-quill";
import { toast } from "sonner";

import { FormErrorProps } from "@components/ui/form-error";
import { UploadDropZone } from "@components/upload-dropzone";
import { CreateArticleType, createArticle } from "@pages/main/article/article.service";
import { useMutation } from "@tanstack/react-query";
import "react-quill/dist/quill.snow.css";
import Container from "@components/ui/container";
import RichTextEditor from "@components/rich-text-editor";

type IArticleForm = z.infer<typeof ArticleSchema>;

export function CreateArticleForm() {
	const { mutate, isPending, isSuccess, isError, error } = useMutation<
		any,
		FormErrorProps,
		CreateArticleType
	>({ mutationFn: createArticle });

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

	return (
		<Container transparent>
			<Container transparent className="text-center text-lg font-semibold mb-4">
				New Article
			</Container>
			<Container>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-3">
						<FormField
							control={form.control}
							name="coverImage"
							render={({ field }) => (
								<FormItem className="w-full">
									<FormLabel>Cover image</FormLabel>
									<FormControl>
										<UploadDropZone
											acceptedFileTypes={["image/*"]}
											onChange={field.onChange}
											value={field.value}
											allowImagePreview
										/>
									</FormControl>
									<FormMessage className="mx-2 my-1 mb-0 text-xs" />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="title"
							render={({ field }) => (
								<FormItem className="w-full">
									<FormLabel>Title</FormLabel>
									<FormControl>
										<Input
											type="text"
											disabled={isPending}
											placeholder="Title"
											{...field}
										/>
									</FormControl>
									<FormMessage className="mx-2 my-1 mb-0 text-xs" />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="content"
							render={({ field }) => (
								<FormItem className="w-full">
									<FormLabel>Content</FormLabel>
									<FormControl>
										<RichTextEditor
											onChange={(value) => {
												form.setValue("content", value);
											}}
											value={field.value}
										/>
									</FormControl>
									<FormMessage className="mx-2 my-1 mb-0 text-xs" />
								</FormItem>
							)}
						/>
						<Button type="submit">Submit</Button>
					</form>
				</Form>
			</Container>
		</Container>
	);
}
