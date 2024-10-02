"use server";

import { redirect } from "next/navigation";
import { jobFilterSchema } from "@/lib/validation";

export async function filterJobs(formData: FormData) {
  const values = Object.fromEntries(formData.entries());

  const { q, type, location, remote, categories } =
    jobFilterSchema.parse(values);

  const searchParams = new URLSearchParams({
    ...(q && { q: q.trim() }),
    ...(type && type !== "all" && { type }),
    ...(location && location !== "all" && { location }),
    ...(remote && { remote: "true" }),
    ...(categories && categories !== "all" && { categories }),
  });

  redirect(`/?${searchParams.toString()}`);
}

export async function clearFilters() {
  "use server";

  redirect("/");
}
