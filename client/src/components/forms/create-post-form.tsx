import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import axios from "axios";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { Input } from "../ui/input";
import ReactQuill from "react-quill";
import { PostSchema } from "@/schemas/post.schema";

import "react-quill/dist/quill.snow.css";

type IPostForm = z.infer<typeof PostSchema>;

export function CreatePostForm() {
	const [error, setError] = useState<string | undefined>("");
	const [success, setSuccess] = useState<string | undefined>("");
	const [isPending, startTransition] = useTransition();
	const [imageUrl, setImageUrl] = useState<string | null>(null);

	const form = useForm<IPostForm>({
		resolver: zodResolver(PostSchema),
		defaultValues: {
			title: "",
			content: "",
			image: "",
		},
	});

	const onSubmit = (post: IPostForm) => {
		setError("");
		setSuccess("");

		startTransition(() => {
			axios
				.post("/api/post/new", post)
				.then((data) => {
					console.log(data.data);
					form.reset();
				})
				.catch((err) => {
					console.log(err.message);
				});
		});
	};

	const uploadImages = async (files: File[]) => {
		const formData = new FormData();
		const file = files[0];
		formData.append("file", file);
		await axios
			.post<{ url: string }>("/api/upload", formData, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
				withCredentials: true,
			})
			.then((res) => res.data)
			.then((data) => {
				setImageUrl(data.url);
				form.setValue("image", data.url);
			})
			.catch((err) => {
				toast.error(err.message);
			});
	};

	return (
		<>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="">
					<FormField
						control={form.control}
						name="image"
						render={({ field }) => (
							<FormItem className="w-full">
								{imageUrl && <img src={imageUrl} />}
								<Input
									type="file"
									accept="image/*"
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
								<Input type="text" placeholder="Title" {...field} />
								<FormMessage className="mx-2 my-1 mb-0 text-xs" />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="content"
						render={({ field }) => (
							<FormItem className="w-full">
								<FormControl></FormControl>
								<FormMessage className="mx-2 my-1 mb-0 text-xs" />
							</FormItem>
						)}
					/>
					<Button type="submit">Submit</Button>
				</form>
				<ReactQuill
					theme="snow"
					placeholder="Write something..."
					className="h-72 mb-12"
					onChange={(value) => {
						form.setValue("content", value);
					}}
				/>
			</Form>
		</>
	);
}
