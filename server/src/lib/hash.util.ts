import bcrypt from "bcrypt";

export const hashPlainText = (password: string) => {
	return bcrypt.hashSync(password, 10);
};

export const compareHash = (plainText: string, hash: string) => {
	return bcrypt.compareSync(plainText, hash);
};
