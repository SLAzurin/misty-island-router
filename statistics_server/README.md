# Misty island statistics
This applet will log everyone who loads the webpage.
This enables me to see app utilization.

This app is deployed with fly.io for free backend service.
Hosted in Singapore data centers.

```
fly launch
# Set env GIN_MODE = "release"
fly deploy
# make sure you create postgres and set your secrets
```

View stats:
```sql
-- Get all unique visitors, the amount of times they went to my website, and when was the last time they connected
SELECT id, COUNT(id), TIMEZONE('America/New_York', MAX(dt)) AS last_visit FROM visits GROUP BY id;
-- Get number of unique visitors.
SELECT COUNT(DISTINCT(id)) FROM visits;
```