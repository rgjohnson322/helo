SELECT p.title, p.post_id, p.img, p.content, p.user_id
FROM posts p
INNER JOIN users u
ON u.user_id = p.user_id;