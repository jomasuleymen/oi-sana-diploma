import { FormInputField } from "@/components/auth/inputField";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { FormError } from "@/components/ui/form-error";
import { FormSuccess } from "@/components/ui/form-success";
import { ResetPasswordSchema } from "@/schemas/auth.schema";
import { resetPassword } from "@/services/auth.service";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaLock } from "react-icons/fa6";
import { useSearchParams } from "react-router-dom";
import { z } from "zod";

type IForm = z.infer<typeof ResetPasswordSchema>;

const ResetPasswordPage: React.FC = () => {
	const [searchParams] = useSearchParams();

	const form = useForm<IForm>({
		resolver: zodResolver(ResetPasswordSchema),
		defaultValues: {
			password: "",
			confirmPassword: "",
		},
	});
	const [error, setError] = useState<string | undefined>("");
	const [success, setSuccess] = useState<string | undefined>("");
	const [isPending, setIsPending] = useState<boolean>(false);

	const onSubmit = (credentials: IForm) => {
		setError("");
		setSuccess("");

		const token = searchParams.get("token");

		if (!token) {
			return setError("Token not provided");
		}

		setIsPending(true);
		resetPassword(credentials, token)
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
			})
			.finally(() => {
				setIsPending(false);
			});
	};

	return (
		<div className="max-w-lg mx-auto my-10 bg-white p-8 rounded-xl shadow shadow-slate-300">
			<h1 className="text-4xl font-medium">Change password</h1>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="my-10">
					<div className="flex flex-col space-y-5">
						<FormInputField
							icon={FaLock}
							form={form}
							disabled={isPending}
							name="password"
							type="password"
							label="New password"
							placeholder="New password"
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

export default ResetPasswordPage;
