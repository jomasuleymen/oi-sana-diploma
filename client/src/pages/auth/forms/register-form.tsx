import { Button } from "@components/ui/button";
import { Form } from "@components/ui/form";
import { FormError, FormErrorProps } from "@components/ui/form-error";
import { FormSuccess } from "@components/ui/form-success";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterSchema } from "@pages/auth/auth.schema";
import { registerUser } from "@pages/auth/auth.service";
import { useMutation } from "@tanstack/react-query";
import { AtSign, Lock, User } from "lucide-react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as z from "zod";
import { CardWrapper } from "../components/card-wrapper/card-wrapper";
import { FormInputField } from "../components/inputField";

type RegisterFormType = z.infer<typeof RegisterSchema>;
type Response = {
	message: string;
};

export function RegisterForm() {
	const { mutate, isPending, isSuccess, isError, data, error } = useMutation<
		Response,
		FormErrorProps,
		RegisterFormType
	>({ mutationFn: registerUser });

	const form = useForm<RegisterFormType>({
		resolver: zodResolver(RegisterSchema),
		defaultValues: {
			username: "",
			email: "",
			password: "",
			confirmPassword: "",
		},
	});

	const onSubmit: SubmitHandler<RegisterFormType> = (data: any) => mutate(data);

	return (
		<CardWrapper
			showSocial
			className="form-box sign-up-box"
			headerProps={{
				title: "Sign up",
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
						icon={AtSign}
						form={form}
						disabled={isPending}
						name="email"
						label="Email"
						placeholder="Email"
					/>

					<FormInputField
						icon={Lock}
						form={form}
						disabled={isPending}
						name="password"
						type="password"
						label="Password"
						placeholder="Password"
					/>

					<FormInputField
						icon={Lock}
						form={form}
						disabled={isPending}
						name="confirmPassword"
						type="password"
						label="Confirm password"
						placeholder="Confirm password"
					/>
					<div className="col-span-1 lg:col-span-2 space-y-2">
						{isSuccess && <FormSuccess message={data.message} />}
						{isError && (
							<FormError
								message={error.message}
								validationErrors={error?.validationErrors}
							/>
						)}
						<Button
							type="submit"
							variant={"default"}
							disabled={isPending}
							className="w-full lg:w-28  text-white"
						>
							Sign up
						</Button>
					</div>
				</form>
			</Form>
		</CardWrapper>
	);
}
