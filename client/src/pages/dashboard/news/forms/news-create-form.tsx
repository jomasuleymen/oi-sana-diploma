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

import { useEffect } from "react";
import { toast } from "sonner";

import RichTextEditor from "@components/rich-text-editor";
import Container from "@components/ui/container";
import { FormErrorProps } from "@components/ui/form-error";
import { Input } from "@components/ui/input";
import { UploadDropZone } from "@components/upload-dropzone";
import { createNews, CreateNewsType, newsSchema } from "@pages/main/home/services/news.service";
import { useMutation } from "@tanstack/react-query";
import "react-quill/dist/quill.snow.css";
type IForm = CreateNewsType;

export function NewsCreateForm() {
	const { mutate, isPending, isSuccess, isError, error } = useMutation<
		any,
		FormErrorProps,
		CreateNewsType
	>({ mutationFn: createNews });

	const form = useForm<IForm>({
		resolver: zodResolver(newsSchema),
		defaultValues: {
			image: "",
			content: "",
			title: "",
			description: "",
		},
	});

	const onSubmit = async (article: IForm) => {
		mutate(article);
	};

	useEffect(() => {
		if (isSuccess) {
			toast.success("Article added successfully");
			form.reset();
		} else if (isError) {
			toast.error(error?.message);
		}
	}, [isSuccess, isError]);

	return (
		<Container>
			<Container transparent className="text-center text-xl font-semibold mb-4">
				New news
			</Container>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
					<FormField
						control={form.control}
						name="image"
						render={({ field }) => (
							<FormItem className="w-full">
								<FormLabel>Image</FormLabel>
								<FormControl>
									<UploadDropZone
										allowImagePreview
										acceptedFileTypes={["image/*"]}
										onChange={field.onChange}
										value={field.value}
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
										onChange={field.onChange}
										value={field.value}
									/>
								</FormControl>
								<FormMessage className="mx-2 my-1 mb-0 text-xs" />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="description"
						render={({ field }) => (
							<FormItem className="w-full">
								<FormLabel>Description</FormLabel>
								<FormControl>
									<Input
										type="text"
										disabled={isPending}
										placeholder="Description"
										onChange={field.onChange}
										value={field.value}
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
	);
}
