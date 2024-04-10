import { Button } from "@components/ui/button";
import Container from "@components/ui/container";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@components/ui/form";
import { FormErrorProps } from "@components/ui/form-error";
import { Input } from "@components/ui/input";
import { UploadDropZone } from "@components/upload-dropzone";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { methodologySchema } from "../methodology.schema";
import { CreateMethodologyType, createMethodology } from "../methodology.service";

type IForm = z.infer<typeof methodologySchema>;

const NewMethodologyForm: React.FC = () => {
	const { mutate, isPending, isSuccess, isError, error } = useMutation<
		any,
		FormErrorProps,
		CreateMethodologyType
	>({ mutationFn: createMethodology });

	const form = useForm<IForm>({
		resolver: zodResolver(methodologySchema),
		defaultValues: {
			title: "",
			behaviour: "",
			actions: [],
			image: "",
		},
	});

	const { fields, append, remove } = useFieldArray({
		control: form.control,
		name: "actions",
	});

	const onSubmit = async (methodology: IForm) => {
		mutate(methodology);
	};

	useEffect(() => {
		if (isSuccess) {
			toast.success("Methodology created successfully");
			form.reset();
		} else if (isError) {
			toast.error(error?.message);
		}
	}, [isSuccess, isError]);

	return (
		<Container>
			<Container transparent className="text-center text-xl font-semibold mb-4">
				New methodology
			</Container>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
						name="behaviour"
						render={({ field }) => (
							<FormItem className="w-full">
								<FormLabel>Behaviour</FormLabel>
								<FormControl>
									<Input
										type="text"
										disabled={isPending}
										placeholder="Behaviour"
										{...field}
									/>
								</FormControl>
								<FormMessage className="mx-2 my-1 mb-0 text-xs" />
							</FormItem>
						)}
					/>
					<div>
						<div className="mt-10 mb-2">Actions</div>
						<div className="flex flex-col gap-2">
							{fields.map((field, index) => (
								<div className="flex gap-2">
									<FormField
										control={form.control}
										name={`actions.${index}.action`}
										key={field.id}
										render={({ field }) => (
											<FormItem className="w-full">
												<FormControl>
													<Input
														type="text"
														disabled={isPending}
														placeholder={`Action ${index + 1}`}
														{...field}
													/>
												</FormControl>
												<FormMessage className="mx-2 my-1 mb-0 text-xs" />
											</FormItem>
										)}
									/>
									<div>
										<Button
											type="button"
											variant="outline-2"
											className="w-full border-[1px] border-solid border-red-500 text-red-500"
											onClick={() => remove(index)}
										>
											Remove
										</Button>
									</div>
								</div>
							))}
						</div>
					</div>

					<Button
						type="button"
						variant="outline-2"
						className="w-full border-[1px] border-solid border-primary"
						onClick={() => append({ action: "" })}
					>
						Add
					</Button>

					<Button type="submit">Submit</Button>
				</form>
			</Form>
		</Container>
	);
};

export default NewMethodologyForm;
