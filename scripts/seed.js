const { db } = require("@vercel/postgres");
const { regions } = require("./seed-data/regions");
const { classes } = require("./seed-data/classes");

async function seedRegions(client) {
  try {
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS regions (
        region VARCHAR(8) PRIMARY KEY
      );
    `;

    console.log(`Created "regions" table`);

    const insertedRegions = await Promise.all(
      regions.map(async (region) => {
        return client.sql`
            INSERT INTO regions (region)
            VALUES (${region.region})
            ON CONFLICT (region) DO NOTHING;
          `;
      })
    );

    console.log(`Seeded ${insertedRegions.length} regions`);

    return {
      createTable,
      regions: insertedRegions,
    };
  } catch (error) {
    console.error("Error seeding regions:", error);
    throw error;
  }
}

async function seedClasses(client) {
  try {
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS classes (
        class_name VARCHAR(32) PRIMARY KEY,
        region VARCHAR(8) REFERENCES regions (region)
      );
    `;

    console.log(`Created "classes" table`);

    const insertedClasses = await Promise.all(
      classes.map(async (individual_class) => {
        return client.sql`
            INSERT INTO classes (class_name, region)
            VALUES (${individual_class.class_name}, ${individual_class.region})
            ON CONFLICT (class_name) DO NOTHING;
          `;
      })
    );

    console.log(`Seeded ${insertedClasses.length} classes`);

    return {
      createTable,
      classes: insertedClasses,
    };
  } catch (error) {
    console.error("Error seeding classes:", error);
    throw error;
  }
}

async function seedUsers(client) {
  try {
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS users (
        username VARCHAR(16) PRIMARY KEY,
        region VARCHAR(8) REFERENCES regions (region),
        pw_hash VARCHAR(16) NOT NULL
      );
    `;

    console.log(`Created "users" table`);

    return {
      createTable,
    };
  } catch (error) {
    console.error("Error seeding users:", error);
    throw error;
  }
}

async function seedCharacters(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS characters (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        username VARCHAR(16) REFERENCES users (username),
        ign VARCHAR(12) NOT NULL,
        level INT NOT NULL,
        class_name VARCHAR(32) REFERENCES classes (class_name),
        image UUID NULL
      );
    `;

    console.log(`Created "characters" table`);

    return {
      createTable,
    };
  } catch (error) {
    console.error("Error seeding characters:", error);
    throw error;
  }
}

async function main() {
  const client = await db.connect();
  await seedRegions(client);
  await seedClasses(client);
  await seedUsers(client);
  await seedCharacters(client);
  await client.end();
}

main().catch((err) => {
  console.error(
    "An error occurred while attempting to seed the database:",
    err
  );
});
