// import { PrismaClient as PrismaClient } from "@prisma/client";
// import { PrismaClient as PrismaClientEdge } from "@prisma/client/edge";
// import { PrismaD1 } from "@prisma/adapter-d1";
import { isDev } from "@builder.io/qwik";

export async function getDB(env: { DB: D1Database }) {
  if (!isDev && env.DB) {
    const { PrismaD1 } = await import('@prisma/adapter-d1');
    const { PrismaClient } = await import('@prisma/client/edge');
    const adapter = new PrismaD1(env.DB);
    return new PrismaClient({ adapter });
  } else {
    const { PrismaClient } = await import('@prisma/client');
    return new PrismaClient();
  }
}