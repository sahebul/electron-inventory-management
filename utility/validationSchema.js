import { z } from "zod";
import {
  aggregateSchema,
  deleteSchema,
  findFirstSchema,
  findManySchema,
  findUniqueSchema,
  groupBySchema,
  userSchema,
} from "./commonSchema.js";

// Define schemas for each model and action
export const validationRegistry = {
  business: {
    create: z.object({
      data: z.object({
        name: z
          .string({ error: "Name field is required" })
          .min(2, "Atleast Name should 2 letters"),
        businessType: z.string({ error: "Business Type field is required" }),
        address: z.string({ error: "Address field is required" }),
        phone: z
          .string({ error: "Mobile number is required" })
          .regex(/^[0-9]{10}$/, { error: "Mobile number should be 10 digits" }),
        email: z.email({ error: "Email field is required" }),
        gstNumber: z.string({ error: "GST Number field is required" }),
        logo: z.string({ error: "Logo is required" }),
        currency: z.string({ error: "Currency field is required" }),
        taxEnabled: z.boolean().optional(),
      }),
    }),
    update: z.object({
      where: z.object({
        id: z.string({ error: "ID field is required" }),
      }),
      data: z.object({
        name: z
          .string({ error: "Name field is required" })
          .min(2, "Atleast Name should 2 letters"),
        businessType: z.string({ error: "Business Type field is required" }),
        address: z.string({ error: "Address field is required" }),
        phone: z.string().length(10, "Mobile number should be 10 digits"),
        email: z.email({ error: "Email field is required" }),
        gstNumber: z.string({ error: "GST Number field is required" }),
        logo: z.string({ error: "Logo is required" }),
        currency: z.string({ error: "Currency field is required" }),
      }),
    }),
    findUnique: findUniqueSchema,
    findFirst: findFirstSchema,
    findFirstOrThrow: findFirstSchema,
    findMany: findManySchema,
    delete: deleteSchema,
    groupBy: groupBySchema,
    aggregate: z.object({
      where: z
        .object({
          name: z.string().min(1),
          email: z.email(),
          age: z.number().int().positive().optional(),
        })
        .optional(),
      _avg: z.object({ age: z.boolean().optional() }).optional(),
      _sum: z.object({ age: z.boolean().optional() }).optional(),
      _min: z.object({ age: z.boolean().optional() }).optional(),
      _max: z.object({ age: z.boolean().optional() }).optional(),
    }),
  },


   user: {
    create: z.object({
      data: userSchema,
    }),
    update: z.object({
      where: z.object({
        id: z.string({ error: "ID field is required" }),
      }),
      data: userSchema,
    }),
    findUnique: findUniqueSchema,
    findFirst: findFirstSchema,
    findFirstOrThrow: findFirstSchema,
    findMany: findManySchema,
    delete: deleteSchema,
    groupBy: groupBySchema
  },



};

console.log("Validation registry loaded:", Object.keys(validationRegistry));
