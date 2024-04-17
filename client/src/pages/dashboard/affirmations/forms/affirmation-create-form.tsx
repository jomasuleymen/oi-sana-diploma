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

import { useEffect } from "react";
import { toast } from "sonner";

import Container from "@components/ui/container";
import { FormErrorProps } from "@components/ui/form-error";
import { UploadDropZone } from "@components/upload-dropzone";
import {
	affirmationSchema,
	createAffirmation,
	CreateAffirmationType,
} from "@pages/main/home/services/affirmation.service";
import { useMutation } from "@tanstack/react-query";
import "react-quill/dist/quill.snow.css";

type IForm = z.infer<typeof affirmationSchema>;

export function AffirmationCreateForm() {
	const { mutate, isSuccess, isError, error } = useMutation<
		any,
		FormErrorProps,
		CreateAffirmationType
	>({ mutationFn: createAffirmation });

	const form = useForm<IForm>({
		resolver: zodResolver(affirmationSchema),
		defaultValues: {
			image: "",
		},
	});

	const onSubmit = async (article: IForm) => {
		mutate(article);
	};

	useEffect(() => {
		if (isSuccess) {
			toast.success("Affirmation added successfully");
			form.reset();
		} else if (isError) {
			toast.error(error?.message);
		}
	}, [isSuccess, isError]);

	return (
		<Container>
			<Container transparent className="text-center text-xl font-semibold mb-4">
				New affirmation
			</Container>
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

					<Button type="submit">Submit</Button>
				</form>
			</Form>
		</Container>
	);
}
