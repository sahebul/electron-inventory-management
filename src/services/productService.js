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


export const businessService={
     async getAll() {
    return prisma.business.findMany();
  },
  async create(data){  
    console.log("hello12w");
  },
//   async create(data) {
//     console.log("create a bussiness")
//     try{
//         return  await prisma.business.create({ data });
//     }catch(error){
// if (error instanceof Prisma.PrismaClientKnownRequestError) {
//       switch (error.code) {
//         case 'P2002':
//           console.error('Unique constraint failed on:', error.meta?.target);
//           throw new Error('Email already exists');
//         case 'P2003':
//           console.error('Foreign key constraint failed');
//           throw new Error('Invalid relation');
//         case 'P2000':
//           throw new Error('Value too long for field');
//         default:
//           throw new Error('Database error occurred');
//       }
//     } else {
//       // Unknown or programming error
//       console.error('Unexpected error:', error);
//       throw error;
//     }
  
//     }
    
//   },
  async update(id, data) {
    return prisma.business.update({
      where: { id },
      data,
    });
  },
  async delete(id) {
    return prisma.business.delete({ where: { id } });
  },
}