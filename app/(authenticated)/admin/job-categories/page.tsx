import prisma from "@/lib/prisma";
import JobCategoryTable from "@/components/job-category/JobCategoryTable";
import CreateJobCategoryModal from "@/components/job-category/CreateJobCategoryModal";

export default async function JobCategoriesPage() {
  const categories = await prisma.category.findMany({
    orderBy: { name: "asc" },
  });

  return (
    <div className="container mx-auto p-6 sm:p-10">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Job Categories</h1>
        <CreateJobCategoryModal />
      </div>
      <JobCategoryTable categories={categories} />
    </div>
  );
}
