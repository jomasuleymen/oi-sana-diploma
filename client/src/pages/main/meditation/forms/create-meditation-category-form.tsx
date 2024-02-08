import React, { useEffect } from "react";

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@components/ui/form";
import { MeditationCategorySchema } from "@pages/main/meditation/meditation.schema";
import {
	CreateMeditationCategoryType,
	createMeditationCategory,
} from "@pages/main/meditation/meditation.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "@components/ui/button";
import { FormErrorProps } from "@components/ui/form-error";
import { Input } from "@components/ui/input";
import { Modal } from "@components/ui/modal";
import { UploadDropZone } from "@components/upload-dropzone";

type Props = {
	isOpen: boolean;
	setIsOpen: (value: boolean) => void;
};

type IForm = z.infer<typeof MeditationCategorySchema>;

const CreateMeditationCategory: React.FC<Props> = ({ isOpen, setIsOpen }) => {
	const queryClient = useQueryClient();
	const { mutate, isPending, isSuccess, isError, error } = useMutation<
		any,
		FormErrorProps,
		CreateMeditationCategoryType
	>({ mutationFn: createMeditationCategory });

	const form = useForm<IForm>({
		resolver: zodResolver(MeditationCategorySchema),
		defaultValues: {
			name: "",
			image: "",
		},
	});

	const onSubmit = async (article: IForm) => {
		mutate(article);
	};

	useEffect(() => {
		if (isSuccess) {
			toast.success("Category created successfully");
			form.reset();
			queryClient.invalidateQueries({ queryKey: ["meditation-categories"] });
			setIsOpen(false);
		} else if (isError) {
			toast.error(error?.message);
		}
	}, [isSuccess, isError]);

	return (
		<Modal
			title="Add meditation category"
			description="Add a new category for meditation"
			isOpen={isOpen}
			onClose={() => setIsOpen(false)}
		>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="">
					<FormField
						control={form.control}
						name="image"
						render={({ field }) => (
							<FormItem className="w-full">
								<FormLabel>Video</FormLabel>
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
						name="name"
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
					<Button type="submit">Submit</Button>
				</form>
			</Form>
		</Modal>
	);
};

export default CreateMeditationCategory;
