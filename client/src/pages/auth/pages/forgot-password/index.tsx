import { Button } from "@components/ui/button";
import { Form } from "@components/ui/form";
import { FormError } from "@components/ui/form-error";
import { FormSuccess } from "@components/ui/form-success";
import { zodResolver } from "@hookform/resolvers/zod";
import { forgotPassword } from "@pages/auth/auth.service";
import { useMutation } from "@tanstack/react-query";
import { AtSignIcon } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { FormInputField } from "../../components/inputField";

const schema = z.object({
	email: z.string().email(),
});

type IForgotPasswordForm = z.infer<typeof schema>;

type Response = {
	message: string;
};

const ForgotPasswordPage: React.FC = () => {
	const form = useForm<IForgotPasswordForm>({
		resolver: zodResolver(schema),
		defaultValues: {
			email: "",
		},
	});

	const { mutate, isPending, isSuccess, isError, data, error } = useMutation<
		Response,
		Response,
		string
	>({
		mutationFn: forgotPassword,
	});

	const onSubmit = ({ email }: IForgotPasswordForm) => {
		mutate(email);
	};

	return (
		<div className="max-w-md mx-auto my-10 bg-white p-8 rounded-xl shadow shadow-slate-300">
			<h1 className="text-4xl font-medium">Reset password</h1>
			<p className="text-slate-500">Fill up the form to reset the password</p>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="my-10">
					<div className="flex flex-col space-y-5">
						<FormInputField
							icon={AtSignIcon}
							form={form}
							disabled={isPending}
							name="email"
							label="Email"
							placeholder="Email"
							type="email"
						/>

						{isError && <FormError message={error.message} />}
						{isSuccess && <FormSuccess message={data.message} />}

						<div className="flex">
							<Button disabled={isPending} type="submit" className="w-full">
								Reset password
							</Button>
						</div>
					</div>
				</form>
			</Form>
		</div>
	);
};

export default ForgotPasswordPage;
