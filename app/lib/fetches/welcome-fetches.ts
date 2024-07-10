import { drizzle } from "drizzle-orm/vercel-postgres";
import { eq, or, asc } from "drizzle-orm";
import { sql } from "@vercel/postgres";
import { Classes } from "@/drizzle/schema";
import { unstable_noStore as noStore } from "next/cache";

export async function fetchClasses(region: string) {
  const db = drizzle(sql);
  noStore();

  try {
    const fetchedClasses = await db
      .select()
      .from(Classes)
      .where(or(eq(Classes.region, region), eq(Classes.region, "Both")))
      .orderBy(asc(Classes.class_name));

    return fetchedClasses;
  } catch (err) {
    console.error("Database Error:", err);
    throw new Error("Failed to fetch all classes.");
  }
}
