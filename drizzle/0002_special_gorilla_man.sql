CREATE TABLE IF NOT EXISTS "bosses_info" (
	"bosses_position" integer PRIMARY KEY NOT NULL,
	"bosses_image" varchar NOT NULL,
	"dashboard_position" integer NOT NULL,
	"dashboard_image" varchar NOT NULL,
	"meso" bigint NOT NULL
);
