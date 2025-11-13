import { z } from "zod";

// Define schemas for each model and action
export const validationRegistry = {
  business: {
    create: z.object({
      data: z.object({
        name: z.string({error:"Name field is required"}).min(2,"Atleast Name should 2 letters"),
        businessType: z.string({error:"Business Type field is required"}),
        address: z.string({error:"Address field is required"}),
        phone: z.string({error:"Mobile number is required"}).regex(/^[0-9]{10}$/, { error: "Mobile number should be 10 digits" }),
        email: z.email({error:"Email field is required"}),
        gstNumber: z.string({error:"GST Number field is required"}),
        logo: z.string({error:"Logo is required"}),
        currency: z.string({error:"Currency field is required"}),
        taxEnabled: z.boolean().optional(),
      }),
    }),

    findMany: z
      .object({
        where: z.record(z.any()).optional(),
        take: z.number().int().positive().optional(),
        skip: z.number().int().nonnegative().optional(),
        orderBy: z.record(z.any()).optional(),
        include: z.record(z.any()).optional(),
      })
      .optional(), // Make entire schema optional

    findFirst: z
      .object({
        where: z.record(z.any()).optional(),
      })
      .optional(),
    update: z.object({
      where: z.object({
        id: z.string({error:"ID field is required"}),
      }),
      data: z.object({
        name: z.string({error:"Name field is required"}).min(2,"Atleast Name should 2 letters"),
        businessType: z.string({error:"Business Type field is required"}),
        address: z.string({error:"Address field is required"}),
        phone: z.string().length(10,'Mobile number should be 10 digits'),
        email: z.email({error:"Email field is required"}),
        gstNumber: z.string({error:"GST Number field is required"}),
        logo: z.string({error:"Logo is required"}),
        currency: z.string({error:"Currency field is required"}),
      }),
    }),
    findMany: z.object({
      where: z.record(z.any()).optional(),
      take: z.number().int().positive().optional(),
      skip: z.number().int().nonnegative().optional(),
    }),
    delete: z.object({
      where: z.object({
        id: z.string({error:"ID field is required"}),
      }),
    }),
  },
};

console.log('Validation registry loaded:', Object.keys(validationRegistry))
