import { z } from "zod";

export const logSchema = z.object({
  date: z.string().transform((val) => new Date(val)),
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  deviceModel: z
    .string()
    .min(2, { message: "Device Model must be at least 2 characters." }),
  imei: z.string().optional(),
  faultDescription: z.string().optional(),
  repairDescription: z.string().optional(),
  fixingPrice: z.number().min(0, { message: "Price must be non-negative." }),
  expense: z.number().min(0, { message: "Expense must be non-negative." }).optional(),
  fixNumber: z.number().optional(),
  comments: z.string().optional(),
});

export type LogSchemaType = z.infer<typeof logSchema>;