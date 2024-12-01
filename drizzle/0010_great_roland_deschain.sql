CREATE TABLE IF NOT EXISTS "tracking" (
	"character_id" uuid PRIMARY KEY NOT NULL,
	"dailies" boolean NOT NULL,
	"weeklies" boolean NOT NULL,
	"bosses" boolean NOT NULL,
	"progression" boolean NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "tracking" ADD CONSTRAINT "tracking_character_id_characters_character_id_fk" FOREIGN KEY ("character_id") REFERENCES "public"."characters"("character_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
