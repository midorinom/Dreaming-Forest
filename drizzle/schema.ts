import {
  pgTable,
  varchar,
  uuid,
  integer,
  bigint,
  date,
  boolean,
} from "drizzle-orm/pg-core";

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
  user_id: uuid("user_id").primaryKey().notNull(),
  username: varchar("username").notNull(),
  region: varchar("region")
    .references(() => Regions.region)
    .notNull(),
  pw_hash: varchar("pw_hash").notNull(),
});

export const Characters = pgTable("characters", {
  character_id: uuid("character_id").primaryKey().notNull(),
  user_id: uuid("user_id")
    .references(() => Users.user_id)
    .notNull(),
  ign: varchar("ign").notNull(),
  level: integer("level").notNull(),
  class_name: varchar("class_name")
    .references(() => Classes.class_name)
    .notNull(),
  image: varchar("image").notNull(),
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
  daily_id: uuid("daily_id").primaryKey().notNull(),
  character_id: uuid("character_id")
    .references(() => Characters.character_id)
    .notNull(),
  description: varchar("description").notNull(),
  done: date("done"),
  position: integer("position").notNull(),
});

export const Weeklies = pgTable("weeklies", {
  weekly_id: uuid("weekly_id").primaryKey().notNull(),
  character_id: uuid("character_id")
    .references(() => Characters.character_id)
    .notNull(),
  description: varchar("description").notNull(),
  done: date("done"),
  reset_date: date("reset_date").notNull(),
  position: integer("position").notNull(),
});

export const Bosses = pgTable("bosses", {
  boss_id: uuid("boss_id").primaryKey().notNull(),
  character_id: uuid("character_id")
    .references(() => Characters.character_id)
    .notNull(),
  dashboard_position: integer("dashboard_position").notNull(),
  bosses_position: integer("bosses_position").notNull(),
  dashboard_image: varchar("dashboard_image").notNull(),
  done: date("done"),
  party_size: integer("party_size").notNull(),
});

export const Tracking = pgTable("tracking", {
  tracking_id: uuid("tracking_id").primaryKey().notNull(),
  character_id: uuid("character_id")
    .references(() => Characters.character_id)
    .notNull(),
  dailies: boolean("dailies").notNull(),
  weeklies: boolean("weeklies").notNull(),
  bosses: boolean("bosses").notNull(),
  progression: boolean("progression").notNull(),
});
