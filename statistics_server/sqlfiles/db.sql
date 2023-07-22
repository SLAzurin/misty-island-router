create extension "uuid-ossp";
CREATE TABLE IF NOT EXISTS visits (
  id uuid not null,
  dt timestamp with time zone not null default now()
);
create index if not exists visits_index on visits(id);
