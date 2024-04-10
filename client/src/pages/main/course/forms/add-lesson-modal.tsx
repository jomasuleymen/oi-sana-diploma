import { Input } from "@components/ui/input";
import { Modal } from "@components/ui/modal";
import { UploadDropZone } from "@components/upload-dropzone";
import React from "react";
import { z } from "zod";
import { LessonSchema } from "../course.schema";
import { Button } from "@components/ui/button";
import { FormError } from "@components/ui/form-error";

type IForm = z.infer<typeof LessonSchema>;

type Props = {
	onSubmit: (data: IForm) => void;
	isOpen: boolean;
	setIsOpen: (value: boolean) => void;
};

const AddLessonModal: React.FC<Props> = ({ onSubmit, isOpen, setIsOpen }) => {
	const [lesson, setLesson] = React.useState<IForm>({
		title: "",
		video: "",
	});
	const [error, setError] = React.useState<string | null>(null);

	const handleSubmit = () => {
		if (!lesson.title) {
			setError("Title is required");
			return;
		}
		if (!lesson.video) {
			setError("Video is required");
			return;
		}
		onSubmit(lesson);
		setIsOpen(false);
	};

	return (
		<Modal
			title="Add lesson"
			description="Add a new lesson to the course"
			isOpen={isOpen}
			onClose={() => setIsOpen(false)}
		>
			<div className="space-y-4">
				<Input
					placeholder="Title"
					onChange={(event) => {
						setLesson((prev) => ({ ...prev, title: event.target.value }));
					}}
				/>
				<UploadDropZone
					maxFiles={1}
					required={true}
					acceptedFileTypes={["video/*"]}
					onChange={(file) => {
						if (file) {
							setLesson((prev) => ({ ...prev, video: file }));
						}
					}}
				/>

				{error && <FormError message={error} />}
				<Button onClick={handleSubmit}>Add lesson</Button>
			</div>
		</Modal>
	);
};

export default AddLessonModal;
