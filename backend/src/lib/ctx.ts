import { PrismaClient } from "../../generated/prisma";

export const createAppContext = () => {
	const prisma = new PrismaClient();

	return {
		prisma,
		stop: async () => {
			await prisma.$disconnect();
		},
	};
};

export type AppContext = ReturnType<typeof createAppContext>;
