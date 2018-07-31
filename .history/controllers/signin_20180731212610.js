const handleSignin = (req, res, db, bcrypt) => {
  //   if (
  //     req.body.email === database.users[0].email &&
  //     req.body.password === database.users[0].password
  //   )
  //     // res.json("success")
  //     res.json(database.users[0]);
  //   else res.status(400).json("error login in");
  db.select("email", "hash")
    .from("login")
    .where("email", "=", req.body.email)
    .then(data => {
      const isValid = bcrypt.compareSync(req.body.password, data[0].hash);
      if (isValid) {
        return db
          .select("*")
          .from("users")
          .where("email", "=", req.body.email)
          .then(user => {
            res.json(user[0]);
          })
          .catch(err => res.status(400).json("unable yo get user"));
      } else {
        res.status(400).json("wrong credenials");
      }
    })
    .catch(err => res.status(400).json("wrong credentials"));
};

module.exports = {};
