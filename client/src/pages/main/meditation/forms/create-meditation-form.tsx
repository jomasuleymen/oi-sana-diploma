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

import Container from "@components/ui/container";
import { FormErrorProps } from "@components/ui/form-error";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@components/ui/select";
import { UploadDropZone } from "@components/upload-dropzone";
import {
	CreateMeditationType,
	MeditationCategory,
	createMeditation,
	fetchCategories,
} from "@pages/main/meditation/meditation.service";
import { useMutation, useQuery } from "@tanstack/react-query";
import "react-quill/dist/quill.snow.css";
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
			categoryId: "",
			audio: [],
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
			<Container className="px-5 max-w-5xl">
				<Container transparent className="text-center text-xl font-semibold mb-4">
					New meditation
				</Container>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-3">
						<div className="flex gap-2">
							<FormField
								control={form.control}
								name="categoryId"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Category</FormLabel>
										<div className="flex gap-2">
											<FormControl>
												<Select
													onValueChange={field.onChange}
													value={field.value}
													disabled={categoryLoading}
												>
													<SelectTrigger className="w-[180px]">
														<SelectValue
															placeholder={
																categoryLoading
																	? "...Loading"
																	: field.value
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
											<Button
												type="button"
												onClick={() => setAddCategory(true)}
											>
												Add category
											</Button>
										</div>

										<FormMessage className="mx-2 my-1 mb-0 text-xs" />
									</FormItem>
								)}
							/>
						</div>
						<FormField
							control={form.control}
							name="audio"
							render={({ field }) => (
								<FormItem className="w-full">
									<FormLabel>Meditation audio</FormLabel>
									<FormControl>
										<UploadDropZone
											allowMultiple
											maxFiles={true}
											acceptedFileTypes={["audio/*"]}
											onChange={field.onChange}
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
		</>
	);
}
