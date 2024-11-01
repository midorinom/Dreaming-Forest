CREATE TABLE IF NOT EXISTS "bosses" (
	"boss_id" uuid PRIMARY KEY NOT NULL,
	"character_id" uuid NOT NULL,
	"dashboard_position" integer NOT NULL,
	"bosses_position" integer NOT NULL,
	"dashboard_image" varchar NOT NULL,
	"done" date,
	"party_size" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "characters" (
	"character_id" uuid PRIMARY KEY NOT NULL,
	"user_id" uuid NOT NULL,
	"ign" varchar NOT NULL,
	"level" integer NOT NULL,
	"class_name" varchar NOT NULL,
	"image" varchar NOT NULL,
	"position" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "dailies" (
	"daily_id" uuid PRIMARY KEY NOT NULL,
	"character_id" uuid NOT NULL,
	"description" varchar NOT NULL,
	"done" date,
	"position" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tracking" (
	"tracking_id" uuid PRIMARY KEY NOT NULL,
	"character_id" uuid NOT NULL,
	"dailies" boolean NOT NULL,
	"weeklies" boolean NOT NULL,
	"bosses" boolean NOT NULL,
	"progression" boolean NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"user_id" uuid PRIMARY KEY NOT NULL,
	"username" varchar NOT NULL,
	"region" varchar NOT NULL,
	"pw_hash" varchar NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "weeklies" (
	"weekly_id" uuid PRIMARY KEY NOT NULL,
	"character_id" uuid NOT NULL,
	"description" varchar NOT NULL,
	"done" date,
	"reset_date" date NOT NULL,
	"position" integer NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "bosses" ADD CONSTRAINT "bosses_character_id_characters_character_id_fk" FOREIGN KEY ("character_id") REFERENCES "public"."characters"("character_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "characters" ADD CONSTRAINT "characters_user_id_users_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("user_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "characters" ADD CONSTRAINT "characters_class_name_classes_class_name_fk" FOREIGN KEY ("class_name") REFERENCES "public"."classes"("class_name") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "dailies" ADD CONSTRAINT "dailies_character_id_characters_character_id_fk" FOREIGN KEY ("character_id") REFERENCES "public"."characters"("character_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "tracking" ADD CONSTRAINT "tracking_character_id_characters_character_id_fk" FOREIGN KEY ("character_id") REFERENCES "public"."characters"("character_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "users" ADD CONSTRAINT "users_region_regions_region_fk" FOREIGN KEY ("region") REFERENCES "public"."regions"("region") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "weeklies" ADD CONSTRAINT "weeklies_character_id_characters_character_id_fk" FOREIGN KEY ("character_id") REFERENCES "public"."characters"("character_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
