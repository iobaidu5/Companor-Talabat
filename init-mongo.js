db.createUser({
  user: "mongoadmin",
  pwd: "c0mpan0r123",
  roles: [{ role: "readWrite", db: "companor" }],
});
