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
  "value" decimal NOT NULL,
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

INSERT INTO projects(name) VALUES ('wallet'), ('purse'), ('briefcase');
INSERT INTO projects(name) VALUES ('billfold'), ('coin_purse'), ('belt');

INSERT INTO measurements(name, value, unit) VALUES ('pocket', 12.5, 'mm'), ('length', 22.5, 'mm'), ('height', 15.0, 'mm');
INSERT INTO measurements(name, value, unit) VALUES ('interior', 12.5, 'mm'), ('length', 22.5, 'mm'), ('height', 15.0, 'mm');

-- INSERT INTO measurements(name, value, unit) VALUES ('width', 12.5, 'mm'), ('length', 22.5, 'mm'), ('height', 15.0, 'mm');
-- INSERT INTO measurements(name, value, unit) VALUES ('left_side', 12.5, 'mm'), ('length', 22.5, 'mm'), ('height', 15.0, 'mm');
-- INSERT INTO measurements(name, value, unit) VALUES ('right_side', 12.5, 'mm'), ('length', 22.5, 'mm'), ('height', 15.0, 'mm');
-- INSERT INTO measurements(name, value, unit) VALUES ('pocket_right', 12.5, 'mm'), ('length', 22.5, 'mm'), ('height', 15.0, 'mm');
-- INSERT INTO measurements(name, value, unit) VALUES ('pocket', 12.5, 'mm'), ('length', 22.5, 'mm'), ('height', 15.0, 'mm');

-- INSERT INTO measurement_detail VALUES (5,9);