import { z } from "zod";
import { readDir } from "@tauri-apps/api/fs";

export const stepOneSchema = z.object({
  name: z.string().min(1, { message: "Workspace name is required" }),
  description: z
    .string()
    .max(500, { message: "Description is too long" })
    .optional(),
});

const filePathSchema = z
  .string()
  .min(1, { message: "Path is required" })
  .refine(
    async (path) => {
      try {
        if (path) {
          await readDir(path); // Try reading the directory to check if it exists
        }
        return true;
      } catch {
        return false;
      }
    },
    {
      message: "Invalid path or directory does not exist",
    }
  );

export const stepTwoSchema = z.object({
  location: filePathSchema,
});

export const stepThreeSchema = z.object({
  yearFormat: z.string().min(1, { message: "Year format is required" }),
  monthFormat: z.string().min(1, { message: "Month format is required" }),
  language: z.string().min(1, { message: "Language is required" }),
});

export const stepFourSchema = z.object({
  excludeExtensions: z.string().optional(),
});

export const combinedSchema = z
  .object({
    name: stepOneSchema.shape.name,
    description: stepOneSchema.shape.description,
    location: stepTwoSchema.shape.location,
    yearFormat: stepThreeSchema.shape.yearFormat,
    monthFormat: stepThreeSchema.shape.monthFormat,
    language: stepThreeSchema.shape.language,
    excludeExtensions: stepFourSchema.shape.excludeExtensions,
  })
  .refine((data) => data.name !== "", {
    message: "Workspace name is required",
    path: ["name"],
  });

export type FormData = z.infer<typeof combinedSchema>;
