import { SetMetadata, UseGuards, applyDecorators } from "@nestjs/common";
import { ROLE } from "src/user/user-enums";
import { AuthenticateGuard } from "../guards/auth.guard";
import { RolesGuard } from "../guards/roles.guard";

export const UseAuthorized = (...roles: ROLE[]): MethodDecorator => {
	if (!roles || !roles.length) {
		return applyDecorators(UseGuards(AuthenticateGuard));
	}

	/**
	 * same as:
	 * return function (...args) {
	 * 	  SetMetadata("roles", roles)(...args);
	 * 	  UseGuards(AuthGuard, RolesGuard)(...args);
	 * };
	 */

	return applyDecorators(
		SetMetadata("roles", roles),
		UseGuards(AuthenticateGuard, RolesGuard),
	);
};
