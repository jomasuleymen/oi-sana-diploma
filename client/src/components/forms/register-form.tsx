import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { FormError } from "@/components/ui/form-error";
import { FormSuccess } from "@/components/ui/form-success";
import { RegisterSchema } from "@/schemas/auth.schema";
import { registerUser } from "@/services/auth.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { FaAt, FaLock, FaUser } from "react-icons/fa6";
import * as z from "zod";
import { CardWrapper } from "../auth/card-wrapper/card-wrapper";
import { FormInputField } from "../auth/inputField";

type RegisterFormType = z.infer<typeof RegisterSchema>;

export function RegisterForm() {
	const [error, setError] = useState<string | undefined>("");
	const [success, setSuccess] = useState<string | undefined>("");
	const [isPending, startTransition] = useTransition();

	const form = useForm<RegisterFormType>({
		resolver: zodResolver(RegisterSchema),
		defaultValues: {
			username: "",
			email: "",
			password: "",
			confirmPassword: "",
		},
	});

	const onSubmit: SubmitHandler<RegisterFormType> = (credentials: any) => {
		setError("");
		setSuccess("");

		startTransition(() => {
			registerUser(credentials).then((data) => {
				const { success, message } = data;
				if (success) {
					setSuccess(message);
				} else {
					setError(message);
				}
			});
		});
	};

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
						<FormError message={error} />
						<FormSuccess message={success} />
						<Button type="submit" disabled={isPending} className="w-full lg:w-28">
							Sign up
						</Button>
					</div>
				</form>
			</Form>
		</CardWrapper>
	);
}
