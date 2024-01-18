create extension "uuid-ossp";
CREATE TABLE IF NOT EXISTS visits (
  id uuid not null,
  dt timestamp with time zone not null default now()
);
create index if not exists visits_index on visits(id);

-- query for stats
-- SELECT id, COUNT(id) as connects, TIMEZONE('America/New_York', MAX(dt)) AS last_visit FROM visits group by id having count(id) > 2 order by connects desc, last_visit  desc;