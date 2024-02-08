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
import { useEffect } from "react";
import { toast } from "sonner";

import { FormErrorProps } from "@components/ui/form-error";
import { UploadDropZone } from "@components/upload-dropzone";
import { useMutation } from "@tanstack/react-query";
import "react-quill/dist/quill.snow.css";
import { BookSchema } from "../book.schema";
import { CreateBookType, createBook } from "../book.service";

type IForm = z.infer<typeof BookSchema>;

export function BookCreateForm() {
	const { mutate, isPending, isSuccess, isError, error } = useMutation<
		any,
		FormErrorProps,
		CreateBookType
	>({ mutationFn: createBook });

	const form = useForm<IForm>({
		resolver: zodResolver(BookSchema),
		defaultValues: {
			title: "",
			author: "",
			details: "",
			image: "",
		},
	});

	const onSubmit = async (article: IForm) => {
		mutate(article);
	};

	useEffect(() => {
		if (isSuccess) {
			toast.success("Book created successfully");
			form.reset();
		} else if (isError) {
			toast.error(error?.message);
		}
	}, [isSuccess, isError]);

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="">
				<FormField
					control={form.control}
					name="image"
					render={({ field }) => (
						<FormItem className="w-full">
							<FormLabel>Cover image</FormLabel>
							<FormControl>
								<UploadDropZone
									acceptedFileTypes={["image/*"]}
									onChange={(fileId) => {
										if (fileId) form.setValue("image", fileId);
										else form.resetField("image");
									}}
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
					name="author"
					render={({ field }) => (
						<FormItem className="w-full">
							<FormLabel>Author</FormLabel>
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
					name="details"
					render={({ field }) => (
						<FormItem className="w-full">
							<FormLabel>Details</FormLabel>
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
				<Button type="submit">Submit</Button>
			</form>
		</Form>
	);
}
