CREATE TABLE IF NOT EXISTS "characters" (
	"id" uuid PRIMARY KEY NOT NULL,
	"username" varchar,
	"ign" varchar NOT NULL,
	"level" integer NOT NULL,
	"class_name" varchar,
	"image" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "classes" (
	"class_name" varchar PRIMARY KEY NOT NULL,
	"region" varchar
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "regions" (
	"region" varchar PRIMARY KEY NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"class_name" varchar PRIMARY KEY NOT NULL,
	"region" varchar,
	"pw_hash" varchar NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "characters" ADD CONSTRAINT "characters_username_users_class_name_fk" FOREIGN KEY ("username") REFERENCES "public"."users"("class_name") ON DELETE no action ON UPDATE no action;
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
 ALTER TABLE "classes" ADD CONSTRAINT "classes_region_regions_region_fk" FOREIGN KEY ("region") REFERENCES "public"."regions"("region") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "users" ADD CONSTRAINT "users_region_regions_region_fk" FOREIGN KEY ("region") REFERENCES "public"."regions"("region") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
