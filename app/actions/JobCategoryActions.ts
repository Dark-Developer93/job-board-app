"use server";

import prisma from "@/lib/prisma";
import {
  createJobCategorySchema,
  updateJobCategorySchema,
  deleteJobCategorySchema,
} from "@/lib/validation";
import { revalidatePath } from "next/cache";

export async function createJobCategory(formData: FormData) {
  const result = createJobCategorySchema.safeParse(
    Object.fromEntries(formData),
  );

  if (!result.success) {
    return { error: result.error.format() };
  }

  const { name } = result.data;

  try {
    await prisma.category.create({ data: { name } });
    revalidatePath("/admin/job-categories");
    return { success: true };
  } catch (error) {
    return { error: `Failed to create job category: ${error}` };
  }
}

export async function updateJobCategory(formData: FormData) {
  const result = updateJobCategorySchema.safeParse(
    Object.fromEntries(formData),
  );

  if (!result.success) {
    return { error: result.error.format() };
  }

  const { id, name } = result.data;

  try {
    await prisma.category.update({ where: { id }, data: { name } });
    revalidatePath("/admin/job-categories");
    return { success: true };
  } catch (error) {
    return { error: `Failed to update job category: ${error}` };
  }
}

export async function deleteJobCategory(formData: FormData) {
  const result = deleteJobCategorySchema.safeParse(
    Object.fromEntries(formData),
  );

  if (!result.success) {
    return { error: result.error.format() };
  }

  const { id } = result.data;

  try {
    await prisma.category.delete({ where: { id } });
    revalidatePath("/admin/job-categories");
    return { success: true };
  } catch (error) {
    return { error: `Failed to delete job category: ${error}` };
  }
}
