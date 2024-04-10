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
import { useFieldArray, useForm } from "react-hook-form";
import * as z from "zod";

import { Input } from "@components/ui/input";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import Container from "@components/ui/container";
import { FormErrorProps } from "@components/ui/form-error";
import { UploadDropZone } from "@components/upload-dropzone";
import { useMutation } from "@tanstack/react-query";
import { XIcon } from "lucide-react";
import "react-quill/dist/quill.snow.css";
import { CourseSchema } from "../course.schema";
import { CreateCourseType, createCourse } from "../course.service";
import AddLessonModal from "./add-lesson-modal";

type IForm = z.infer<typeof CourseSchema>;

export function CreateCourseForm() {
	const { mutate, isPending, isSuccess, isError, error } = useMutation<
		any,
		FormErrorProps,
		CreateCourseType
	>({ mutationFn: createCourse });
	const [isLessonOpen, setIsLessonOpen] = useState(false);

	const form = useForm<IForm>({
		resolver: zodResolver(CourseSchema),
		defaultValues: {
			title: "",
			description: "",
			price: "",
			coverImage: "",
			lessons: [],
		},
	});

	const {
		fields: lessonFields,
		append,
		remove,
	} = useFieldArray({
		control: form.control,
		name: "lessons",
	});

	const onSubmit = async (course: IForm) => {
		mutate(course);
	};

	useEffect(() => {
		if (isSuccess) {
			toast.success("Course created successfully");
			form.reset();
		} else if (isError) {
			toast.error(error?.message);
		}
	}, [isSuccess, isError]);

	return (
		<Container transparent>
			{isLessonOpen && (
				<AddLessonModal
					isOpen={isLessonOpen}
					setIsOpen={setIsLessonOpen}
					onSubmit={(data) => {
						append(data);
					}}
				/>
			)}
			<Container transparent className="text-center text-lg font-semibold mb-4">
				Add new course
			</Container>
			<Container>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
									<FormLabel>Course title</FormLabel>
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
							name="description"
							render={({ field }) => (
								<FormItem className="w-full">
									<FormLabel>Course description</FormLabel>
									<FormControl>
										<Input
											type="text"
											disabled={isPending}
											placeholder="Description"
											{...field}
										/>
									</FormControl>
									<FormMessage className="mx-2 my-1 mb-0 text-xs" />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="price"
							render={({ field }) => (
								<FormItem className="w-full">
									<FormLabel>Course price (KZT)</FormLabel>
									<FormControl>
										<Input
											type="number"
											disabled={isPending}
											placeholder="Price"
											{...field}
										/>
									</FormControl>
									<FormMessage className="mx-2 my-1 mb-0 text-xs" />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="lessons"
							render={({ field }) => (
								<FormItem className="w-full space-y-2">
									<FormLabel>Course videos</FormLabel>
									<div className="space-y-1">
										{lessonFields.map((lesson, index) => (
											<div key={lesson.id} className="flex items-center">
												<Input
													type="text"
													placeholder="Lesson title"
													{...form.register(`lessons.${index}.title`)}
													name={`lessons[${index}].title`}
													className="mr-2 w-xl"
												/>
												<Button
													type="button"
													variant="outline-2"
													className="bg-red-500 px-3"
													onClick={() => remove(index)}
												>
													<XIcon size={16} color="white" />
												</Button>
											</div>
										))}
									</div>
									<Button type="button" onClick={() => setIsLessonOpen(true)}>
										Add lesson
									</Button>
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
