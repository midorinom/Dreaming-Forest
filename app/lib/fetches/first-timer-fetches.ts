import { sql } from "@vercel/postgres";
import { unstable_noStore as noStore } from "next/cache";
import { MaplestoryClass } from "@/app/lib/definitions/first-timer-definitions";

export async function fetchClasses(region: string) {
  noStore();

  try {
    const data = await sql<MaplestoryClass>`
        SELECT class_name
        FROM classes
        WHERE region = ${region} OR region = 'Both'
        ORDER BY class_name ASC
      `;

    const classes = data.rows;
    return classes;
  } catch (err) {
    console.error("Database Error:", err);
    throw new Error("Failed to fetch all classes.");
  }
}
