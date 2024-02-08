import { Button } from "@components/ui/button";
import { Form } from "@components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { FaLock, FaUser } from "react-icons/fa6";
import * as z from "zod";

import { FormError } from "@components/ui/form-error";
import { FormSuccess } from "@components/ui/form-success";
import { LoginSchema } from "@pages/main/auth/auth.schema";
import { LoginUserType } from "@pages/main/auth/auth.service";
import { useAuthStore } from "@/store/auth.store";
import { useMutation } from "@tanstack/react-query";
import { useNavigate, useSearchParams } from "react-router-dom";
import { CardWrapper } from "../components/card-wrapper/card-wrapper";
import { FormInputField } from "../components/inputField";

type ILoginForm = z.infer<typeof LoginSchema>;

type Response = {
	message: string;
};

export function LoginForm() {
	const [searchParams] = useSearchParams();
	const navigate = useNavigate();

	const login = useAuthStore((store) => store.login);
	const { mutate, isPending, isSuccess, isError, data, error } = useMutation<
		Response,
		Response,
		LoginUserType
	>({
		mutationFn: login,
		onSuccess: () => {
			const redirectUrl = searchParams.get("callbackUrl") || "/";
			navigate(redirectUrl);
		},
	});

	const form = useForm<ILoginForm>({
		resolver: zodResolver(LoginSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const onSubmit = (credentials: ILoginForm) => {
		mutate(credentials);
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
					<div>
						<FormInputField
							icon={FaLock}
							form={form}
							disabled={isPending}
							name="password"
							label="Password"
							placeholder="Password"
							type="password"
							className="mb-0 pb-0"
						/>
						<div
							onClick={() => navigate("forgot-password")}
							className="text-[0.7rem] text-blue-600 cursor-pointer hover:text-blue-800 p-0 mt-1 text-right"
						>
							<span>Forgot password?</span>
						</div>
					</div>
					{isSuccess && <FormSuccess message={data.message} />}
					{isError && <FormError message={error.message} />}
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
