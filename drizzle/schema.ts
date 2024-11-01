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
  user_id: varchar("user_id").primaryKey().notNull(),
  username: varchar("username").notNull(),
  region: varchar("region")
    .references(() => Regions.region)
    .notNull(),
  pw_hash: varchar("pw_hash").notNull(),
});

export const Characters = pgTable("characters", {
  character_id: uuid("character_id").primaryKey().notNull(),
  user_id: varchar("user_id")
    .references(() => Users.user_id)
    .notNull(),
  ign: varchar("ign").notNull(),
  level: integer("level").notNull(),
  class_name: varchar("class_name")
    .references(() => Classes.class_name)
    .notNull(),
  image: uuid("image").notNull(),
  position: integer("position").notNull(),
});

export const BossesInfo = pgTable("bosses_info", {
  bosses_position: integer("bosses_position").primaryKey().notNull(),
  bosses_image: varchar("bosses_image").notNull(),
  dashboard_position: integer("dashboard_position").notNull(),
  dashboard_image: varchar("dashboard_image").notNull(),
  meso: bigint("meso", { mode: "number" }).notNull(),
});

export const Dailies = pgTable("dailies", {
  character_id: uuid("id").primaryKey().notNull(),
  user_id: varchar("user_id")
    .references(() => Users.user_id)
    .notNull(),
  ign: varchar("ign").notNull(),
  level: integer("level").notNull(),
  class_name: varchar("class_name")
    .references(() => Classes.class_name)
    .notNull(),
  image: uuid("image").notNull(),
  position: integer("position").notNull(),
});
