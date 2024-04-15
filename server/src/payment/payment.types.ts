export interface PaymentPayload {
	amount: number;
	merchantId: string;
	callbackUrl?: string;
	demo?: boolean;
	description?: string;
	failUrl?: string;
	orderId?: string;
	returnUrl?: string;
	successUrl?: string;
	customerData?: {
		email?: string;
		phone?: string;
	};
	metadata?: object;
}

export type KassaRedirect = {
	id: string;
	url: string;
};
