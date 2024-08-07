import { pgTable, varchar, uuid, integer, bigint } from "drizzle-orm/pg-core";

export const Regions = pgTable("regions", {
  region: varchar("region").primaryKey().notNull(),
});

export const Classes = pgTable("classes", {
  class_name: varchar("class_name").primaryKey().notNull(),
  region: varchar("region")
    .references(() => Regions.region)
    .notNull(),
});

export const Users = pgTable("users", {
  username: varchar("class_name").primaryKey().notNull(),
  region: varchar("region")
    .references(() => Regions.region)
    .notNull(),
  pw_hash: varchar("pw_hash").notNull(),
});

export const Characters = pgTable("characters", {
  id: uuid("id").primaryKey().notNull(),
  username: varchar("username")
    .references(() => Users.username)
    .notNull(),
  ign: varchar("ign").notNull(),
  level: integer("level").notNull(),
  class_name: varchar("class_name")
    .references(() => Classes.class_name)
    .notNull(),
  image: uuid("image").notNull(),
});

export const BossesInfo = pgTable("bosses_info", {
  bosses_position: integer("bosses_position").primaryKey().notNull(),
  bosses_image: varchar("bosses_image").notNull(),
  dashboard_position: integer("dashboard_position").notNull(),
  dashboard_image: varchar("dashboard_image").notNull(),
  meso: bigint("meso", { mode: "number" }).notNull(),
});
