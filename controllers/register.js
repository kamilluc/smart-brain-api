const handleRegister = (req, res, db, bcrypt) => {
  const { email, name, password } = req.body;
  const hash = bcrypt.hashSync(password);
  //FIXME: error when trying register with same email
  // bcrypt.hash(password, null, null, function(err, hash) {
  //     // Store hash in your password DB.
  //     console.log(hash);
  // });
  // database.users.push({
  //     id: '125',
  //     name: name,
  //     email: email,
  //     // password: password,
  //     entries: 0,
  //     joined: new Date()
  // })
  //   let id_from_db = -1;
  //   db("users")
  //     .returning("['id','name','email','entries','joined']")
  //     .insert({
  //       email: email,
  //       name: name,
  //       joined: new Date()
  //     })
  //     .then(user => {
  //       id_from_db = user[0];
  //       //   console.log(user);
  //       //   res.json(user[0]);
  //     })
  //     .catch(err => res.status(400).json("unable to register"))
  //     .then(
  //       db
  //         .select("*")
  //         .from("users")
  //         .where("id", id_from_db)
  //         .then(user => {
  //           console.log(user);
  //           res.json(user);
  //         })
  //     );
  db.transaction(trx => {
    trx
      .insert({
        hash: hash,
        email: email
      })
      .into("login")
      .then(() => {
        db("users")
          .insert({
            email: email,
            name: name,
            joined: new Date()
          })

          .then(user => {
            console.log(user[0]);
            // res.json(user[0]);
          });

        db.select("*")
          .from("users")
          .where("email", email)
          .then(user => {
            //   console.log(user);
            res.json(user[0]);
          });
      })
      .then(trx.commit)
      .catch(trx.rollback);
  });
};

module.exports = {
  handleRegister: handleRegister
};
