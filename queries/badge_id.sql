SELECT badges.badge_id + 1 AS new_id 
FROM badges 
ORDER BY badge_id 
DESC LIMIT  1