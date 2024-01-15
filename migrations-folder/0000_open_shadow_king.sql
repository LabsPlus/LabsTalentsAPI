CREATE TABLE IF NOT EXISTS "area" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(45) NOT NULL,
	CONSTRAINT "area_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "diretor" (
	"id" serial PRIMARY KEY NOT NULL,
	"quantidade_de_times" integer,
	"id_usuario" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "equipe" (
	"id" serial PRIMARY KEY NOT NULL,
	"nome" varchar(45),
	"quantidade_membros" integer,
	"id_diretor" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "especialidade" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(45) NOT NULL,
	"id_area" integer NOT NULL,
	CONSTRAINT "especialidade_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "meta" (
	"id" serial PRIMARY KEY NOT NULL,
	"nome" varchar(100),
	"objetivo" varchar(200)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "pdi" (
	"id" serial PRIMARY KEY NOT NULL,
	"descricao" varchar(256)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "usuario" (
	"id" serial PRIMARY KEY NOT NULL,
	"nome" varchar(45),
	"email" varchar(100),
	"senha" varchar(45),
	"id_especialidade" integer NOT NULL,
	"id_area" integer NOT NULL,
	"id_pdi" integer NOT NULL,
	CONSTRAINT "usuario_email_unique" UNIQUE("email")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "diretor" ADD CONSTRAINT "diretor_id_usuario_usuario_id_fk" FOREIGN KEY ("id_usuario") REFERENCES "usuario"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "equipe" ADD CONSTRAINT "equipe_id_diretor_diretor_id_fk" FOREIGN KEY ("id_diretor") REFERENCES "diretor"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "especialidade" ADD CONSTRAINT "especialidade_id_area_area_id_fk" FOREIGN KEY ("id_area") REFERENCES "area"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "usuario" ADD CONSTRAINT "usuario_id_especialidade_especialidade_id_fk" FOREIGN KEY ("id_especialidade") REFERENCES "especialidade"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "usuario" ADD CONSTRAINT "usuario_id_area_area_id_fk" FOREIGN KEY ("id_area") REFERENCES "area"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "usuario" ADD CONSTRAINT "usuario_id_pdi_pdi_id_fk" FOREIGN KEY ("id_pdi") REFERENCES "pdi"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
