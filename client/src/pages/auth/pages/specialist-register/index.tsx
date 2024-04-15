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
import { SubmitHandler, useForm } from "react-hook-form";
import * as z from "zod";

import { FormError, FormErrorProps } from "@components/ui/form-error";
import { FormSuccess } from "@components/ui/form-success";
import { UploadDropZone } from "@components/upload-dropzone";
import { SpecialistRegisterSchema } from "@pages/auth/auth.schema";
import { useMutation } from "@tanstack/react-query";
import { AtSign, Lock, Phone, User } from "lucide-react";
import { registerSpecialist } from "../../auth.service";
import { CardWrapper } from "../../components/card-wrapper/card-wrapper";
import { FormInputField } from "../../components/inputField";

type FormType = z.infer<typeof SpecialistRegisterSchema>;
type Response = {
	message: string;
};
const SpecialistRegisterPage: React.FC = () => {
	const { mutate, isPending, isSuccess, isError, data, error } = useMutation<
		Response,
		FormErrorProps,
		FormType
	>({ mutationFn: registerSpecialist });

	const form = useForm<FormType>({
		resolver: zodResolver(SpecialistRegisterSchema),
		defaultValues: {
			username: "",
			email: "",
			password: "",
			confirmPassword: "",
			resume: "",
			phone: "",
		},
	});

	const onSubmit: SubmitHandler<FormType> = (data: any) => mutate(data);

	return (
		<CardWrapper
			className="max-w-xl mx-auto mt-14"
			headerProps={{
				title: "Are you specialist?",
			}}
		>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="px-2 grid grid-cols-1 gap-4 min-w-72 max-w-72 overflow-hidden lg:grid-cols-2 lg:min-w-[450px]"
				>
					<FormInputField
						icon={User}
						form={form}
						disabled={isPending}
						name="firstname"
						label="Firstname"
						placeholder="Firstname"
					/>

					<FormInputField
						icon={User}
						form={form}
						disabled={isPending}
						name="lastname"
						label="Lastname"
						placeholder="Lastname"
					/>

					<FormInputField
						icon={User}
						form={form}
						disabled={isPending}
						name="username"
						label="Username"
						placeholder="Username"
					/>

					<FormInputField
						icon={Phone}
						form={form}
						disabled={isPending}
						name="phone"
						label="Phone"
						placeholder="Phone number"
					/>

					<FormInputField
						icon={AtSign}
						form={form}
						disabled={isPending}
						name="email"
						label="Email"
						placeholder="Email"
						className="col-span-full"
					/>

					<FormInputField
						icon={Lock}
						form={form}
						disabled={isPending}
						name="password"
						type="password"
						label="Password"
						placeholder="Password"
						// className="col-span-full"
					/>

					<FormInputField
						icon={Lock}
						form={form}
						disabled={isPending}
						name="confirmPassword"
						type="password"
						label="Confirm password"
						placeholder="Confirm password"
						// className="col-span-full"
					/>

					<FormField
						control={form.control}
						name="resume"
						render={({ field }) => (
							<FormItem className="w-full col-span-full">
								<FormLabel>Resume</FormLabel>
								<FormControl>
									<UploadDropZone
										acceptedFileTypes={["application/pdf"]}
										onChange={field.onChange}
										value={field.value}
									/>
								</FormControl>
								<FormMessage className="mx-2 my-1 mb-0 text-xs" />
							</FormItem>
						)}
					/>

					<div className="col-span-full space-y-2">
						{isSuccess && <FormSuccess message={data.message} />}
						{isError && (
							<FormError
								message={error.message}
								validationErrors={error?.validationErrors}
							/>
						)}
						<Button type="submit" disabled={isPending} className="w-full lg:w-28">
							Sign up
						</Button>
					</div>
				</form>
			</Form>
		</CardWrapper>
	);
};

export default SpecialistRegisterPage;
