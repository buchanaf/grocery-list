export function currentUser(req, res) {
  res.json({ user: req.user || null });
}
