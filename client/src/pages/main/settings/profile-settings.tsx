import { Textarea } from "@components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";

import { Button } from "@components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@components/ui/form";
import { UploadDropZone } from "@components/upload-dropzone";
import { useAuthStore } from "@store/auth.store";
import { toast } from "sonner";
import { SpecialistProfileSchema } from "../user/user.schema";
import { UpdateProfileType } from "../user/user.service";

const ProfileSettings: React.FC = () => {
	const [user, updateProfile] = useAuthStore((state) => [state.user, state.updateProfile]);

	const form = useForm<UpdateProfileType>({
		resolver: zodResolver(SpecialistProfileSchema),
		defaultValues: {
			profileImage: "",
			about: "",
		},
	});

	function onSubmit(data: UpdateProfileType) {
		updateProfile(data);
		toast("You submitted the following values");
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
				<FormField
					control={form.control}
					name="profileImage"
					render={({ field }) => (
						<FormItem className="w-full">
							<FormControl>
								<UploadDropZone
									avatar
									acceptedFileTypes={["image/*"]}
									allowImagePreview
									onChange={field.onChange}
									value={field.value}
								/>
							</FormControl>
							<FormMessage className="mx-2 my-1 mb-0 text-xs" />
						</FormItem>
					)}
				/>
				{user?.isSpecialist && (
					<FormField
						control={form.control}
						name="about"
						render={({ field }) => (
							<FormItem className="w-full">
								<FormLabel className="font-semibold">About yourself</FormLabel>
								<FormControl>
									<Textarea
										placeholder="A few words about yourself"
										rows={4}
										className="resize-none flex-1 font-semibold bg-[#F5F5F5]"
										onChange={field.onChange}
										value={field.value}
									/>
								</FormControl>
								<FormMessage className="mx-2 my-1 mb-0 text-xs" />
							</FormItem>
						)}
					/>
				)}
				<Button type="submit">Update profile</Button>
			</form>
		</Form>
	);
};

export default ProfileSettings;
