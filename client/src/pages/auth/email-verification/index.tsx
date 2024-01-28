import { useEffect, useState } from "react";

import { CardWrapper } from "@/components/auth/card-wrapper/card-wrapper";
import { FormError } from "@/components/ui/form-error";
import { FormSuccess } from "@/components/ui/form-success";
import { verifyEmail } from "@/services/auth.service";
import { LoaderIcon } from "lucide-react";
import { useSearchParams } from "react-router-dom";

const EmailVerificationPage = () => {
	const [error, setError] = useState<string | undefined>();
	const [success, setSuccess] = useState<string | undefined>();
	const [params] = useSearchParams();
	const token = params.get("token");
	
	useEffect(() => {
		if (!token) {
			setError("Missing token!");
			return;
		}

		verifyEmail(token).then((data) => {
			const { success, message } = data;

			if (success) {
				setSuccess(message);
			} else {
				setError(message);
			}
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

export default EmailVerificationPage;
