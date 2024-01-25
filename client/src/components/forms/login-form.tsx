import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { FaLock, FaUser } from "react-icons/fa6";
import * as z from "zod";

import { FormError } from "@/components/ui/form-error";
import { FormSuccess } from "@/components/ui/form-success";
import { LoginSchema } from "@/schemas/auth.schema";
import { useState, useTransition } from "react";
import { useParams } from "react-router-dom";
import { CardWrapper } from "../auth/card-wrapper/card-wrapper";
import { FormInputField } from "../auth/inputField";
import { useAuthStore } from "@/store/auth.store";

type ILoginForm = z.infer<typeof LoginSchema>;

export function LoginForm() {
	const searchParams = useParams();

	const [error, setError] = useState<string | undefined>("");
	const [success, setSuccess] = useState<string | undefined>("");
	const [isPending, startTransition] = useTransition();
  const login = useAuthStore(store => store.login);

	const form = useForm<ILoginForm>({
		resolver: zodResolver(LoginSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const onSubmit = (credentials: ILoginForm) => {
		setError("");
		setSuccess("");
		const callbackUrl = searchParams.callbackUrl;

		startTransition(() => {
			login(credentials)
				.then((response) => {
					const { success, message } = response;

					if (success) {
						setSuccess(message);

						const redirectURL = callbackUrl || "/";
						window.location.href = redirectURL;
					}

					if (!success) {
						setError(message);
					}
				})
				.catch((err) => {
					console.log(err);
					setError("Something went wrong");
				});
		});
	};

	return (
		<CardWrapper
			showSocial
			className="form-box sign-in-box"
			headerProps={{
				title: "Sign in",
				withLogo: true,
			}}
		>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="px-2 min-w-72 max-w-72 flex flex-col gap-4"
				>
					<FormInputField
						icon={FaUser}
						form={form}
						disabled={isPending}
						name="email"
						label="Username or Email"
						placeholder="Username or Email"
						type="text"
					/>
					<FormInputField
						icon={FaLock}
						form={form}
						disabled={isPending}
						name="password"
						label="Password"
						placeholder="Password"
						type="password"
					/>
					<FormError message={error} />
					<FormSuccess message={success} />
					<div className="flex">
						<Button disabled={isPending} type="submit" className="w-full">
							Login
						</Button>
					</div>
				</form>
			</Form>
		</CardWrapper>
	);
}
