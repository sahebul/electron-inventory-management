import { z } from "zod";
export const aggregateSchema = z.object({
  where: z
    .object({
      name: z.string().min(1),
      email: z.string().email(),
      age: z.number().int().positive().optional(),
    })
    .optional(),
  _avg: z.object({ age: z.boolean().optional() }).optional(),
  _sum: z.object({ age: z.boolean().optional() }).optional(),
  _min: z.object({ age: z.boolean().optional() }).optional(),
  _max: z.object({ age: z.boolean().optional() }).optional(),
});

export const findManySchema = z
  .object({
    where: z.record(z.string(), z.any()).optional(),
    take: z.number().int().positive().optional(),
    skip: z.number().int().nonnegative().optional(),
    orderBy: z.record(z.string(), z.any()).optional(),
    include: z.record(z.string(), z.any()).optional(),
    select: z.record(z.string(), z.any()).optional(),
  })
  .optional();

export const deleteSchema = z.object({
  where: z.object({
    id: z.string({ error: "ID field is required" }),
  }),
});

export const findFirstSchema = z.object({
  //   where: userUpdateSchema.optional(),
  orderBy: z
    .object({
      id: z.enum(["asc", "desc"]).optional(),
      createdAt: z.enum(["asc", "desc"]).optional(),
    })
    .optional(),
});

export const userIdSchema = z.object({
  id: z.string(),
});

export const findUniqueSchema = z.object({
  where: userIdSchema,
});

export const groupBySchema = z.object({
  by: z.array(z.enum(["age", "name", "createdAt"])),
  _count: z.boolean().optional(),
  _avg: z.object({ age: z.boolean().optional() }).optional(),
  _sum: z.object({ age: z.boolean().optional() }).optional(),
});


export const userSchema=z.object({
        name: z
          .string({ error: "Name field is required" })
          .min(2, "Atleast Name should 2 letters"),
        businessId: z.string({ error: "Business Name is required" }),
        password: z.string({ error: "Password field is required" }),
        phone: z
          .string({ error: "Mobile number is required" })
          .regex(/^[0-9]{10}$/, { error: "Mobile number should be 10 digits" }),
        email: z.email({ error: "Email field is required" }),
        role: z.string({ error: "Role field is required" }),
        isActive: z.boolean().optional(),
      });
