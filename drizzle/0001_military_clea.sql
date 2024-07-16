ALTER TABLE "characters" ALTER COLUMN "username" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "characters" ALTER COLUMN "class_name" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "classes" ALTER COLUMN "region" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "region" SET NOT NULL;