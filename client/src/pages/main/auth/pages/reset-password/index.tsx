import { FormInputField } from "../../components/inputField";
import { Button } from "@components/ui/button";
import { Form } from "@components/ui/form";
import { FormError } from "@components/ui/form-error";
import { FormSuccess } from "@components/ui/form-success";
import { ResetPasswordSchema } from "@pages/main/auth/auth.schema";
import { ResetPasswordType, resetPassword } from "@pages/main/auth/auth.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaLock } from "react-icons/fa6";
import { useSearchParams } from "react-router-dom";
import { z } from "zod";

type IForm = z.infer<typeof ResetPasswordSchema>;
type Response = {
	message: string;
};

type Variables = {
	payload: ResetPasswordType;
	token: string;
};

const ResetPasswordPage: React.FC = () => {
	const [searchParams] = useSearchParams();
	const [clientError, setClientError] = useState<string | undefined>();

	const form = useForm<IForm>({
		resolver: zodResolver(ResetPasswordSchema),
		defaultValues: {
			password: "",
			confirmPassword: "",
		},
	});

	const { mutate, isPending, isSuccess, isError, data, error } = useMutation<
		Response,
		Response,
		Variables
	>({
		mutationFn: (variables) => resetPassword(variables.payload, variables.token),
		onMutate: () => {
			setClientError("");
		},
	});

	const onSubmit = (payload: IForm) => {
		const token = searchParams.get("token");

		if (!token) {
			return setClientError("Missing token!");
		}

		mutate({ payload, token });
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

						{isSuccess && <FormSuccess message={data.message} />}
						{isError && <FormError message={error.message} />}
						{clientError && <FormError message={clientError} />}
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
