SELECT badges.badge_id
FROM users
JOIN given_badges ON given_badges.user_id = users.user_id
JOIN badges ON given_badges.badge_id = badges.badge_id
WHERE users.user_id = 'JEBAĆ'