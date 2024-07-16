import { drizzle } from "drizzle-orm/vercel-postgres";
import { migrate } from "drizzle-orm/vercel-postgres/migrator";
import { loadEnvConfig } from "@next/env";
import { sql } from "@vercel/postgres";
import * as schema from "@/drizzle/schema";
import { Regions, Classes, BossesInfo } from "@/drizzle/schema";
import { regions } from "./seed-data/regions";
import { classes } from "./seed-data/classes";
import { bossesInfo } from "./seed-data/bosses_info";

const projectDir = process.cwd();
loadEnvConfig(projectDir);
const db = drizzle(sql, { schema });

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

async function seedBossesInfo() {
  try {
    const insertedBossesInfo = await db
      .insert(BossesInfo)
      .values(bossesInfo)
      .onConflictDoNothing();
    console.log(`Successfully seeded bosses_info`);

    return {
      bossesInfo: insertedBossesInfo,
    };
  } catch (error) {
    console.error("Error seeding bosses_info:", error);
    throw error;
  }
}

// Main Function
export async function seedDatabase() {
  try {
    await migrate(db, { migrationsFolder: "drizzle" });
    await seedRegions();
    await seedClasses();
    await seedBossesInfo();
  } catch (error) {
    console.error(
      "An error occurred while attempting to seed the database:",
      error,
    );
    throw error;
  }
}

seedDatabase();
