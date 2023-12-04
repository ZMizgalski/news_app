import bcrypt from 'bcrypt';


export const PasswordWorker = {
	comparePasswords: (password: string, hash: string) => bcrypt.compare(password, hash),
	hashPassword: (password: string) => bcrypt.hash(password, 6)
};
