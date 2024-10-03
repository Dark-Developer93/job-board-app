import { cache } from "react";
import prisma from "@/lib/prisma";
import { JobFilterValues } from "@/lib/validation";
import { Prisma } from "@prisma/client";
import JobListItem from "./jobListItem";

interface JobResultsProps {
  filterValues: JobFilterValues;
}

const fetchJobs = cache(async (filterValues: JobFilterValues) => {
  const { q, type, location, remote, categories } = filterValues;

  const searchString = q
    ?.split(" ")
    .filter((word) => word.length > 0)
    .join(" & ");

  const searchFilter: Prisma.JobWhereInput = searchString
    ? {
        OR: [
          { title: { search: searchString } },
          { companyName: { search: searchString } },
          { type: { search: searchString } },
          { locationType: { search: searchString } },
          { location: { search: searchString } },
          {
            categories: {
              some: { category: { name: { search: searchString } } },
            },
          },
        ],
      }
    : {};

  const where: Prisma.JobWhereInput = {
    AND: [
      searchFilter,
      type ? { type } : {},
      location ? { location } : {},
      remote ? { locationType: "Remote" } : {},
      categories
        ? {
            categories: {
              some: {
                category: {
                  name: categories,
                },
              },
            },
          }
        : {},
      { approved: true },
    ],
  };

  return prisma.job.findMany({
    where,
    include: {
      categories: {
        include: {
          category: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
});

export default async function JobResults({ filterValues }: JobResultsProps) {
  const jobs = await fetchJobs(filterValues);

  return (
    <div className="grow space-y-4">
      {jobs.map((job) => (
        <JobListItem
          job={{
            ...job,
            categories: job.categories.map(({ category }) => category),
          }}
          key={job.id}
        />
      ))}
      {jobs.length === 0 && (
        <p className="m-auto text-center">
          No jobs found. Try adjusting your search filters.
        </p>
      )}
    </div>
  );
}
