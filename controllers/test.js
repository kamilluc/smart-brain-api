const handleTestRoute = (req, res, db) => {
  console.log("hello", req.params);
  db.select("*")
    .from("users")
    .where("email", req.params.email)
    .then(user => {
      //   console.log(user);
      res.json(user[0]);
    });
};

module.exports = { handleTestRoute };
