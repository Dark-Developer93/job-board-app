/* eslint-disable no-console */
import { PrismaClient } from "@prisma/client";
// eslint-disable-next-line import/extensions
import placeholderData from "./placeholder-data.js";

const prisma = new PrismaClient();

async function main() {
  // Seed categories
  await Promise.all(
    placeholderData.placeholderCategories.map(async (category) => {
      await prisma.category.upsert({
        where: { name: category.name },
        update: {},
        create: { name: category.name },
      });
    }),
  );

  // Seed jobs and create job-category relationships
  await Promise.all(
    placeholderData.placeholderJobs.map(async (job) => {
      const { slug, categories, ...jobData } = job;
      await prisma.job.upsert({
        where: { slug },
        update: jobData,
        create: {
          ...jobData,
          slug,
          categories: {
            create: categories.map((categoryName) => ({
              category: { connect: { name: categoryName } },
            })),
          },
        },
      });
    }),
  );
}

main()
  .then(async () => {
    console.log("Database seeded successfully");
  })
  .catch(async (e) => {
    console.error("Error while seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
