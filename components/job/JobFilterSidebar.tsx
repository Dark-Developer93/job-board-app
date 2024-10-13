import { Suspense } from "react";

import prisma from "@/lib/prisma";
import { JobFilterValues } from "@/lib/validation";
import { clearFilters, filterJobs } from "@/app/actions/jobActions";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { jobTypes } from "@/lib/job-types";
import ClientSideReset from "./ClientSideReset";
import FormSubmitButton from "../form-submit-button/FormSubmitButton";
import JobFilterSidebarSkeleton from "./JobFilterSidebarSkeleton";

interface JobFilterSidebarProps {
  defaultValues: JobFilterValues;
}

async function getFilterOptions() {
  const distinctLocations = (await prisma.job
    .findMany({
      where: { approved: true },
      select: { location: true },
      distinct: ["location"],
    })
    .then((locations) =>
      locations.map(({ location }) => location).filter(Boolean),
    )) as string[];

  const distinctCategories = (await prisma.category
    .findMany({
      select: { name: true },
    })
    .then((categories) => categories.map(({ name }) => name))) as string[];

  return { distinctLocations, distinctCategories };
}

const JobFilterSidebarContent = async ({
  defaultValues,
}: JobFilterSidebarProps) => {
  const { distinctLocations, distinctCategories } = await getFilterOptions();

  return (
    <aside className="sticky top-0 h-fit rounded-lg border bg-background p-4 md:w-[260px]">
      <form action={filterJobs} key={JSON.stringify(defaultValues)}>
        <div className="space-y-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="q">Search</Label>
            <Input
              id="q"
              name="q"
              placeholder="Title, company, etc."
              defaultValue={defaultValues.q}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="type">Type</Label>
            <Select name="type" defaultValue={defaultValues.type || ""}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="All types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All types</SelectItem>
                {jobTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="location">Location</Label>
            <Select name="location" defaultValue={defaultValues.location || ""}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="All locations" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All locations</SelectItem>
                {distinctLocations.map((location) => (
                  <SelectItem key={location} value={location}>
                    {location}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="categories">Categories</Label>
            <Select
              name="categories"
              defaultValue={defaultValues.categories || ""}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="All categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All categories</SelectItem>
                {distinctCategories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-2">
            <input
              id="remote"
              name="remote"
              type="checkbox"
              className="scale-125 accent-black"
              defaultChecked={defaultValues.remote}
            />
            <Label htmlFor="remote">Remote jobs</Label>
          </div>
          <FormSubmitButton className="w-full">Filter jobs</FormSubmitButton>
        </div>
      </form>
      <form action={clearFilters}>
        <FormSubmitButton variant="outline" className="mt-2 w-full">
          Clear All Filters
        </FormSubmitButton>
      </form>
      <ClientSideReset />
    </aside>
  );
};

const JobFilterSidebar = (props: JobFilterSidebarProps) => {
  return (
    <Suspense fallback={<JobFilterSidebarSkeleton />}>
      <JobFilterSidebarContent {...props} />
    </Suspense>
  );
};

export default JobFilterSidebar;
