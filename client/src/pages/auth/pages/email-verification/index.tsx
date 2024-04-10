import { useEffect, useState } from "react";

import { FormError } from "@components/ui/form-error";
import { FormSuccess } from "@components/ui/form-success";
import { verifyEmail } from "@pages/auth/auth.service";
import { useMutation } from "@tanstack/react-query";
import { LoaderIcon } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import { CardWrapper } from "../../components/card-wrapper/card-wrapper";

type Response = {
	message: string;
};

const EmailVerificationPage = () => {
	const [searchParams] = useSearchParams();
	const [clientError, setClientError] = useState<string | undefined>();

	const { mutate, isPending, isSuccess, isError, data, error } = useMutation<
		Response,
		Response,
		string
	>({
		mutationFn: verifyEmail,
		onMutate: () => {
			setClientError("");
		},
	});

	useEffect(() => {
		const token = searchParams.get("token");

		if (!token) {
			return setClientError("Missing token!");
		}

		mutate(token);
	}, [searchParams, mutate]);

	return (
		<CardWrapper
			headerProps={{
				title: "Confirming your verification",
			}}
		>
			<div className="flex flex-col items-center justify-center w-full gap-4">
				{isPending ? (
					<LoaderIcon className="animate-spin" />
				) : (
					<>
						{isSuccess && <FormSuccess message={data.message} />}
						{isError && <FormError message={error.message} />}
						{clientError && <FormError message={clientError} />}
					</>
				)}
			</div>
		</CardWrapper>
	);
};

export default EmailVerificationPage;
