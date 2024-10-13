import Link from "next/link";

import prisma from "@/lib/prisma";
import {
  Search,
  Briefcase,
  Users,
  Building2,
  CheckCircle,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import JobListItem from "@/components/job/jobListItem";
import { filterJobs } from "../actions/jobActions";

export default async function HomePage() {
  const featuredJobs = await prisma.job.findMany({
    where: { approved: true },
    include: {
      categories: {
        include: {
          category: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
    take: 4,
  });

  return (
    <div className="min-h-screen bg-background">
      <main>
        <section className="bg-gradient-to-b from-primary to-primary-foreground py-20 text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h1 className="mb-4 text-4xl font-bold">
              Find Your Next Remote or Flexible Job
            </h1>
            <p className="mb-8 text-xl">
              Search thousands of hand-screened jobs with legitimate companies
            </p>
            <form action={filterJobs} className="mx-auto flex max-w-2xl">
              <Input
                type="text"
                name="q"
                placeholder="Job title, keywords, or company"
                className="mr-2 flex-grow text-foreground"
              />
              <Button type="submit" variant="secondary">
                <Search className="mr-2" />
                Search Jobs
              </Button>
            </form>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="mb-8 text-center text-3xl font-semibold">
              Featured Job Categories
            </h2>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {/* maybe bring those from the database */}
              {["Full-time", "Internship"].map((category) => (
                <Link
                  href={`/jobs?type=${category}`}
                  key={category}
                  target="_blank"
                  className="rounded-lg bg-secondary p-6 text-center transition-colors hover:bg-secondary/80"
                >
                  <h3 className="mb-2 text-lg font-semibold">{category}</h3>
                  <p className="text-sm text-muted-foreground">
                    Find {category.toLowerCase()} opportunities
                  </p>
                </Link>
              ))}
              <Link
                href="/jobs?remote=true"
                target="_blank"
                className="rounded-lg bg-secondary p-6 text-center transition-colors hover:bg-secondary/80"
              >
                <h3 className="mb-2 text-lg font-semibold">Remote jobs</h3>
                <p className="text-sm text-muted-foreground">
                  Find remote jobs
                </p>
              </Link>
              <Link
                href="/jobs"
                target="_blank"
                className="rounded-lg bg-secondary p-6 text-center transition-colors hover:bg-secondary/80"
              >
                <h3 className="mb-2 text-lg font-semibold">View All</h3>
                <p className="text-sm text-muted-foreground">View All jobs</p>
              </Link>
            </div>
          </div>
        </section>

        <section className="bg-muted py-16">
          <div className="container mx-auto px-4">
            <h2 className="mb-8 text-center text-3xl font-semibold">
              How It Works
            </h2>
            <div className="grid gap-8 md:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <CheckCircle className="mr-2" />
                    Create Your Profile
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    Sign up and create your job seeker profile. Highlight your
                    skills and preferences.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Search className="mr-2" />
                    Search and Apply
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    Browse through our curated job listings and apply to
                    positions that match your criteria.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Star className="mr-2" />
                    Land Your Dream Job
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    Interview with top companies and secure your ideal remote or
                    flexible position.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* TODO: bring those from the database */}
        {featuredJobs.length > 0 && (
          <section className="py-16">
            <div className="container mx-auto px-4">
              <h2 className="mb-8 text-center text-3xl font-semibold">
                Featured Jobs
              </h2>
              <div className="grid gap-6 md:grid-cols-2">
                {featuredJobs.map((job) => (
                  <JobListItem
                    key={job.id}
                    job={{
                      ...job,
                      categories: job.categories.map(
                        ({ category }) => category,
                      ),
                    }}
                  />
                ))}
              </div>
              <div className="mt-8 text-center">
                <Button variant="outline" asChild>
                  <Link href="/jobs" target="_blank">
                    View All Jobs
                  </Link>
                </Button>
              </div>
            </div>
          </section>
        )}

        <section className="bg-muted py-16">
          <div className="container mx-auto px-4">
            <h2 className="mb-8 text-center text-3xl font-semibold">
              Why Choose JobBoard?
            </h2>
            <div className="grid gap-8 text-center md:grid-cols-3">
              <div className="flex flex-col items-center">
                <Briefcase size={48} className="mb-4 text-primary" />
                <h3 className="mb-2 text-xl font-semibold">100% Remote Jobs</h3>
                <p className="text-muted-foreground">
                  Find jobs that you can do from anywhere in the world
                </p>
              </div>
              <div className="flex flex-col items-center">
                <Users size={48} className="mb-4 text-primary" />
                <h3 className="mb-2 text-xl font-semibold">
                  Verified Employers
                </h3>
                <p className="text-muted-foreground">
                  All jobs are hand-screened for legitimacy
                </p>
              </div>
              <div className="flex flex-col items-center">
                <Building2 size={48} className="mb-4 text-primary" />
                <h3 className="mb-2 text-xl font-semibold">Top Companies</h3>
                <p className="text-muted-foreground">
                  Find opportunities with industry-leading companies
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="mb-8 text-center text-3xl font-semibold">
              What Our Users Say
            </h2>
            <div className="grid gap-8 md:grid-cols-3">
              {[
                {
                  id: 1,
                  name: "Sarah M.",
                  role: "UX Designer",
                  quote:
                    "JobBoard helped me find my dream remote job in just two weeks!",
                },
                {
                  id: 2,
                  name: "John D.",
                  role: "Software Engineer",
                  quote:
                    "The quality of job listings on JobBoard is unmatched. I highly recommend it.",
                },
                {
                  id: 3,
                  name: "Emily R.",
                  role: "Content Writer",
                  quote:
                    "Thanks to JobBoard, I now have the work-life balance I've always wanted.",
                },
              ].map((testimonial) => (
                <Card key={testimonial.id}>
                  <CardHeader>
                    <CardTitle>{testimonial.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.role}
                    </p>
                  </CardHeader>
                  <CardContent>
                    <p className="italic">&ldquo;{testimonial.quote}&rdquo;</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-primary py-16 text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h2 className="mb-4 text-3xl font-semibold">
              Ready to Find Your Perfect Job?
            </h2>
            <p className="mb-8 text-xl">
              Join thousands of professionals who&apos;ve found their dream
              remote and flexible jobs.
            </p>
            <Button variant="secondary" size="lg" asChild>
              <Link href="/auth/signup">Get Started Today</Link>
            </Button>
          </div>
        </section>
      </main>
    </div>
  );
}
