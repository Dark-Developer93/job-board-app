/* eslint-disable no-var */
/* eslint-disable vars-on-top */
import { PrismaClient } from "@prisma/client";
import { neon } from "@neondatabase/serverless";

declare global {
  var prisma: PrismaClient | undefined;
}

const connectionString = process.env.DATABASE_URL;

// eslint-disable-next-line import/no-mutable-exports
let prisma: PrismaClient;

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
}

export default prisma;

// Export the neon function for use in other parts of your application if needed
export const db = neon(connectionString!);
