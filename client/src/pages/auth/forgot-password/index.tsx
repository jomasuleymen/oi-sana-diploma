import { FormInputField } from "@/components/auth/inputField";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { FormError } from "@/components/ui/form-error";
import { FormSuccess } from "@/components/ui/form-success";
import { forgotPassword } from "@/services/auth.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { AtSignIcon } from "lucide-react";
import React, { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
	email: z.string().email(),
});

type IForgotPasswordForm = z.infer<typeof schema>;

const ForgotPasswordPage: React.FC = () => {
	const form = useForm<IForgotPasswordForm>({
		resolver: zodResolver(schema),
		defaultValues: {
			email: "",
		},
	});

	const [error, setError] = useState<string | undefined>("");
	const [success, setSuccess] = useState<string | undefined>("");
	const [isPending, startTransition] = useTransition();

	const onSubmit = (credentials: IForgotPasswordForm) => {
		setError("");
		setSuccess("");

		startTransition(() => {
			forgotPassword(credentials.email)
				.then((response) => {
					const { success, message } = response;

					if (success) {
						setSuccess(message);
					} else {
						setError(message);
					}
				})
				.catch((err) => {
					setError("Something went wrong");
				});
		});
	};

	return (
		<div className="max-w-lg mx-auto my-10 bg-white p-8 rounded-xl shadow shadow-slate-300">
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

						<FormError message={error} />
						<FormSuccess message={success} />
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
