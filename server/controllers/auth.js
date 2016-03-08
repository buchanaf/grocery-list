
export function currentUser(req, res, next) {
  res.json({ user: req.user });
}