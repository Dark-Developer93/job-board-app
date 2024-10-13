import { z } from "zod";
import { jobTypes, locationTypes } from "./job-types";

const requiredString = z.string().min(1, "Required");
const numericRequiredString = requiredString.regex(/^\d+$/, "Must be a number");

const companyLogoSchema = z
  .custom<File | undefined>()
  .refine(
    (file) => !file || (file instanceof File && file.type.startsWith("image/")),
    "Must be an image file",
  )
  .refine((file) => {
    return !file || file.size < 1024 * 1024 * 2;
  }, "File must be less than 2MB");

const applicationSchema = z
  .object({
    applicationEmail: z.string().max(100).email().optional().or(z.literal("")),
    applicationUrl: z.string().max(100).url().optional().or(z.literal("")),
  })
  .refine((data) => data.applicationEmail || data.applicationUrl, {
    message: "Email or url is required",
    path: ["applicationEmail"],
  });

const locationSchema = z
  .object({
    locationType: requiredString.refine(
      (value) => locationTypes.includes(value),
      "Invalid location type",
    ),
    location: z.string().max(100).optional(),
  })
  .refine(
    (data) =>
      !data.locationType || data.locationType === "Remote" || data.location,
    {
      message: "Location is required for on-site jobs",
      path: ["location"],
    },
  );

const categoriesSchema = z
  .array(z.string())
  .min(1, "At least one category is required");

// Schema for creating a new job
export const createJobSchema = z
  .object({
    title: requiredString.max(100),
    type: requiredString.refine(
      (value) => jobTypes.includes(value),
      "Invalid job type",
    ),
    companyName: requiredString.max(100),
    companyLogo: companyLogoSchema,
    description: z.string().max(5000).optional(),
    salary: numericRequiredString.max(
      9,
      "Number can't be longer than 9 digits",
    ),
  })
  .and(applicationSchema)
  .and(locationSchema)
  .and(categoriesSchema);

export type CreateJobValues = z.infer<typeof createJobSchema>;

// Schema for creating a new job category
export const createJobCategorySchema = z.object({
  name: z
    .string()
    .min(1, "Category name is required")
    .max(50, "Category name must be 50 characters or less")
    .refine(
      (name) => /^[a-zA-Z0-9 -]+$/.test(name),
      "Category name can only contain letters, numbers, spaces, and hyphens",
    ),
});

// Schema for updating an existing job category
export const updateJobCategorySchema = createJobCategorySchema.extend({
  id: z.string().cuid("Invalid category ID"),
});

// Schema for deleting a job category
export const deleteJobCategorySchema = z.object({
  id: z.string().cuid("Invalid category ID"),
});

export type CreateJobCategoryValues = z.infer<typeof createJobCategorySchema>;
export type UpdateJobCategoryValues = z.infer<typeof updateJobCategorySchema>;
export type DeleteJobCategoryValues = z.infer<typeof deleteJobCategorySchema>;

// Schema for filtering jobs
export const jobFilterSchema = z.object({
  q: z.string().optional(),
  type: z.string().optional(),
  location: z.string().optional(),
  remote: z.coerce.boolean().optional(),
  categories: z.string().optional(), // Add this line
});
export type JobFilterValues = z.infer<typeof jobFilterSchema>;
