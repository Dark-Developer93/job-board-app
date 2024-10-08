import { MenuIcon } from "lucide-react";

import JobFilterSidebar from "@/components/job/JobFilterSidebar";
import JobResults from "@/components/job/JobResults";
import { JobFilterValues } from "@/lib/validation";
import H1 from "@/components/ui/H1";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

interface PageProps {
  searchParams: {
    q?: string;
    type?: string;
    location?: string;
    remote?: string;
    categories?: string;
  };
}

export default async function Home({
  searchParams: { q, type, location, remote, categories },
}: PageProps) {
  const filterValues: JobFilterValues = {
    q,
    type,
    location,
    remote: remote === "true",
    categories,
  };

  return (
    <main className="m-auto my-10 max-w-5xl space-y-10 px-3">
      <div className="space-y-5 text-center">
        <H1>Developer jobs</H1>
        <p className="text-muted-foreground">Find your dream job.</p>
      </div>
      <section className="flex flex-col gap-4 md:flex-row">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" className="mb-4 md:hidden">
              <MenuIcon className="mr-2 h-4 w-4" />
              Filters
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px] p-4 sm:w-[400px]">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold">Filters</h2>
            </div>
            <JobFilterSidebar defaultValues={filterValues} />
          </SheetContent>
        </Sheet>
        <div className="hidden md:block">
          <JobFilterSidebar defaultValues={filterValues} />
        </div>
        <JobResults filterValues={filterValues} />
      </section>
    </main>
  );
}
