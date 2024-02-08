import { Button } from "@components/ui/button";
import { Form } from "@components/ui/form";
import { FormError, FormErrorProps } from "@components/ui/form-error";
import { FormSuccess } from "@components/ui/form-success";
import { RegisterSchema } from "@pages/main/auth/auth.schema";
import { registerUser } from "@pages/main/auth/auth.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { SubmitHandler, useForm } from "react-hook-form";
import { FaAt, FaLock, FaUser } from "react-icons/fa6";
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
				withLogo: true,
			}}
		>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="px-2 grid grid-cols-1 gap-4 min-w-72 max-w-72 overflow-hidden lg:grid-cols-2 lg:min-w-[450px]"
				>
					<FormInputField
						icon={FaUser}
						form={form}
						disabled={isPending}
						name="username"
						label="Username"
						placeholder="Username"
					/>
					<FormInputField
						icon={FaAt}
						form={form}
						disabled={isPending}
						name="email"
						label="Email"
						placeholder="Email"
					/>

					<FormInputField
						icon={FaLock}
						form={form}
						disabled={isPending}
						name="password"
						type="password"
						label="Password"
						placeholder="Password"
					/>

					<FormInputField
						icon={FaLock}
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
						<Button type="submit" disabled={isPending} className="w-full lg:w-28">
							Sign up
						</Button>
					</div>
				</form>
			</Form>
		</CardWrapper>
	);
}
