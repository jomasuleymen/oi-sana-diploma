import { useEffect, useState } from "react";

import { CardWrapper } from "@/components/auth/card-wrapper/card-wrapper";
import { FormError } from "@/components/ui/form-error";
import { FormSuccess } from "@/components/ui/form-success";
import { LoaderIcon } from "lucide-react";
import { useParams, useSearchParams } from "react-router-dom";
import { verifyEmail } from "@/services/auth.service";

const NewVerificationPage = () => {
	const [error, setError] = useState<string | undefined>();
	const [success, setSuccess] = useState<string | undefined>();
	const params = useParams();
	const token = params.token;

	useEffect(() => {
		if (!token) {
			setError("Missing token!");
			return;
		}

		verifyEmail(token)
			.then((data) => {
				if (data.success) {
					setSuccess(data.success);
				} else if (data.error) {
					setError(data.error);
				}
			})
			.catch(() => {
				setError("Something went wrong!");
			});
	}, [token]);

	return (
		<CardWrapper
			headerProps={{
				title: "Confirming your verification",
			}}
		>
			<div className="flex flex-col items-center justify-center w-full gap-4">
				{!success && !error ? (
					<LoaderIcon className="animate-spin" />
				) : success ? (
					<FormSuccess message={success} />
				) : (
					<FormError message={error} />
				)}
			</div>
		</CardWrapper>
	);
};

export default NewVerificationPage;
