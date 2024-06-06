import { pgTable, varchar, uuid, integer } from "drizzle-orm/pg-core";

export const Regions = pgTable("regions", {
  region: varchar("region").primaryKey(),
});

export const Classes = pgTable("classes", {
  class_name: varchar("class_name").primaryKey(),
  region: varchar("region").references(() => Regions.region),
});

export const Users = pgTable("users", {
  username: varchar("class_name").primaryKey(),
  region: varchar("region").references(() => Regions.region),
  pw_hash: varchar("pw_hash").notNull(),
});

export const Characters = pgTable("characters", {
  id: uuid("id").primaryKey(),
  username: varchar("username").references(() => Users.username),
  ign: varchar("ign").notNull(),
  level: integer("level").notNull(),
  class_name: varchar("class_name").references(() => Classes.class_name),
  image: uuid("image").notNull(),
});
