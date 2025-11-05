import { PrismaClient } from '@prisma/client';
// import { PrismaClient } from '../generated/prisma';
// const prisma = new PrismaClient();
let prisma
try {
  prisma = new PrismaClient()
  console.log('Prisma Client initialized')
} catch (error) {
  console.error('Failed to initialize Prisma Client:', error)
}

export const productService = {
  async getAll() {
    return prisma.product.findMany();
  },
  async create(data) {
    return prisma.product.create({ data });
  },
  async update(id, data) {
    return prisma.product.update({
      where: { id },
      data,
    });
  },
  async delete(id) {
    return prisma.product.delete({ where: { id } });
  },
};
