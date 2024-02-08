import { ExecutionContext, createParamDecorator } from "@nestjs/common";

const SocketUseSession = createParamDecorator(
	(data: any, ctx: ExecutionContext) => {
		const request = ctx.switchToHttp().getRequest()?.request as any;
		return request.session?.passport?.user;
	},
);

export default SocketUseSession;
