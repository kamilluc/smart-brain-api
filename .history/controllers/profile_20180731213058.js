const handleProfileGet = (req, res, db) => {
  const { id } = req.params;
  //   let found = false;
  //   database.users.forEach(user => {
  //     if (user.id === id) {
  //       found = true;
  //       return res.json(user);
  //     }
  //   });
  db.select("*")
    .from("users")
    .where({ id })
    .then(user => {
      //   if (user) {
      // found = true;
      if (user.length) return res.json(user[0]);
      else res.status(404).json("no such user");
      //   }
      //   if (!found) res.status(404).json("no such user");
    })
    .catch(err => res.status(404).json("error getting user"));
};
module.exports = {
  handleProfileGet: handleProfileGet
};
