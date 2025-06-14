import { isDev } from "@builder.io/qwik";

export async function getDB(env: { DB: D1Database }) {
  if (!isDev && env.DB) {
    const { PrismaD1 } = await import('@prisma/adapter-d1');
    const { PrismaClient } = await import('@prisma/client');
    const adapter = new PrismaD1(env.DB);
    return new PrismaClient({ adapter });
  } else {
    const { PrismaClient } = await import('@prisma/client');
    return new PrismaClient();
  }
}