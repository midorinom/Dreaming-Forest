import { drizzle } from "drizzle-orm/vercel-postgres";
import { migrate } from "drizzle-orm/vercel-postgres/migrator";
import { sql } from "@vercel/postgres";
import { Regions, Classes } from "@/drizzle/schema";
import { regions } from "./seed-data/regions";
import { classes } from "./seed-data/classes";

const db = drizzle(sql);

async function seedRegions() {
  try {
    const insertedRegions = await db
      .insert(Regions)
      .values(regions)
      .onConflictDoNothing();
    console.log(`Successfully seeded regions`);

    return {
      regions: insertedRegions,
    };
  } catch (error) {
    console.error("Error seeding regions:", error);
    throw error;
  }
}

async function seedClasses() {
  try {
    const insertedClasses = await db
      .insert(Classes)
      .values(classes)
      .onConflictDoNothing();
    console.log(`Successfully seeded classes`);

    return {
      classes: insertedClasses,
    };
  } catch (error) {
    console.error("Error seeding classes:", error);
    throw error;
  }
}

export async function seedDatabase() {
  try {
    await migrate(db, { migrationsFolder: "drizzle" });
    await seedRegions();
    await seedClasses();
  } catch (error) {
    console.error(
      "An error occurred while attempting to seed the database:",
      error
    );
    throw error;
  }
}
