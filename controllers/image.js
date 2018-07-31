const handleImage = (req, res, db) => {
  const { id } = req.body;
  //   let found = false;
  //   database.users.forEach(user => {
  //     if (user.id === id) {
  //       found = true;
  //       user.entries++;
  //       return res.json(user.entries);
  //     }
  //   });
  //   if (!found) res.status(404).json("no such user");
  db("users")
    .where({ id })
    .increment("entries", 1)
    .then(
      // .returning("entries")

      db("users")
        .select("entries")
        .where({ id })
        .then(entries => {
          //   console.log(entries);
          res.json(entries[0]);
        })
      // .catch(err => {
      //   res.status(400).json("unable to get entries");
      // })
    )
    .catch(err => {
      res.status(400).json("unable to get entries");
    });
};

module.exports = {
  handleImage
};
