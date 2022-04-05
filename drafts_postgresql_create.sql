CREATE TABLE public.projects (
  "_id" serial NOT NULL,
  "name" varchar NOT NULL,
  CONSTRAINT "projects_pk" PRIMARY KEY ("_id")
) WITH (
  OIDS=FALSE
);
CREATE TABLE public.measurements (
  "_id" serial NOT NULL,
  "name" varchar NOT NULL,
  "value" serial NOT NULL,
  "unit" varchar NOT NULL,
  CONSTRAINT "measurements_pk" PRIMARY KEY ("_id")
) WITH (
  OIDS=FALSE
);
CREATE TABLE public.measurement_detail (
  "project_id" integer NOT NULL,
  "measurement_id" integer NOT NULL,
  CONSTRAINT "measurement_detial_pk" PRIMARY KEY ("project_id", "measurement_id")
) WITH (
  OIDS=FALSE
);

ALTER TABLE public.measurement_detail ADD CONSTRAINT "measurement_detail_fk0" FOREIGN KEY ("project_id") REFERENCES public.projects("_id");
ALTER TABLE public.measurement_detail  ADD CONSTRAINT "measurement_detail_fk1" FOREIGN KEY ("measurement_id") REFERENCES public.measurements("_id");