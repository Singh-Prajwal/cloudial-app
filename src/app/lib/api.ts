import prisma from "./prisma";

export async function getCustomers() {
  return await prisma.customer.findMany();
}
