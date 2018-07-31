const clarifai = require("clarifai");

const app = new Clarifai.App({
  apiKey: "b5d2d13f665147d5a45193cc49db60ff"
});

const handleApiCall = (req, res) => {
  app.models
    .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data => {
      res.json(data);
    })
    .catch(err => res.status(400).json("unable to work with API"));
};

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
  handleImage,
  handleApiCall
};
