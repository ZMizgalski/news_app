import { Response } from "express"


export const PrismaClientHandler = async (
	res?: Response,
	fn?: () => void
) => {
	try {
		await fn?.();
	} catch (error) {
		res?.status(400);
		res?.json({ error });
		res?.end();
		return;
	}
}
