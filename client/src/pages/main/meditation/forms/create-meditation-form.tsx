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

import { MeditationSchema } from "@pages/main/meditation/meditation.schema";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Input } from "@components/ui/input";

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@components/ui/select";
import {
	CreateMeditationType,
	MeditationCategory,
	createMeditation,
	fetchCategories,
} from "@pages/main/meditation/meditation.service";
import { useMutation, useQuery } from "@tanstack/react-query";
import "react-quill/dist/quill.snow.css";
import { FormErrorProps } from "@components/ui/form-error";
import { UploadDropZone } from "@components/upload-dropzone";
import CreateMeditationCategory from "./create-meditation-category-form";

type IForm = z.infer<typeof MeditationSchema>;

export function CreateMeditationForm() {
	const { mutate, isPending, isSuccess, isError, error } = useMutation<
		any,
		FormErrorProps,
		CreateMeditationType
	>({ mutationFn: createMeditation });
	const [addCatergory, setAddCategory] = useState<boolean>(false);

	const {
		data: categories,
		isLoading: categoryLoading,
		isSuccess: categorySuccess,
	} = useQuery<any, any, MeditationCategory[]>({
		initialData: [],
		queryKey: ["meditation-categories"],
		queryFn: fetchCategories,
	});

	const form = useForm<IForm>({
		resolver: zodResolver(MeditationSchema),
		defaultValues: {
			title: "",
			categoryId: "",
			video: "",
		},
	});

	const onSubmit = async (article: IForm) => {
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
		<>
			<CreateMeditationCategory isOpen={addCatergory} setIsOpen={setAddCategory} />
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="">
					<FormField
						control={form.control}
						name="video"
						render={({ field }) => (
							<FormItem className="w-full">
								<FormLabel>Video</FormLabel>
								<FormControl>
									<UploadDropZone
										acceptedFileTypes={["video/*"]}
										onChange={(fileId) => {
											if (fileId) form.setValue("video", fileId);
											else form.resetField("video");
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

					<div className="flex gap-2 items-end">
						<FormField
							control={form.control}
							name="categoryId"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Category</FormLabel>
									<FormControl>
										<Select
											onValueChange={field.onChange}
											defaultValue={field.value}
											disabled={categoryLoading}
										>
											<SelectTrigger className="w-[180px]">
												<SelectValue
													placeholder={
														categoryLoading ? "...Loading" : field.value
													}
												/>
											</SelectTrigger>
											<SelectContent>
												{categorySuccess &&
													categories &&
													categories?.map(
														(category: MeditationCategory) => (
															<SelectItem
																key={category.id}
																value={category.id.toString()}
															>
																{category.name}
															</SelectItem>
														)
													)}
											</SelectContent>
										</Select>
									</FormControl>
									<FormMessage className="mx-2 my-1 mb-0 text-xs" />
								</FormItem>
							)}
						/>
						<Button type="button" onClick={() => setAddCategory(true)}>
							Add category
						</Button>
					</div>
					<Button type="submit">Submit</Button>
				</form>
			</Form>
		</>
	);
}
