const { db } = require("@vercel/postgres");

async function seedCharacters(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    const createTable = await client.sql`
    CREATE TABLE IF NOT EXISTS characters (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID NOT NULL,
    ign VARCHAR(12) NOT NULL,
    level INT NOT NULL,
    class_name VARCHAR(255) NOT NULL,
    image UUID NULL);
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
  await seedCharacters(client);
  await client.end();
}

main().catch((err) => {
  console.error(
    "An error occurred while attempting to seed the database:",
    err
  );
});
