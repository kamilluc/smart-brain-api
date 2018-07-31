const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt-nodejs");
const app = express();
const hash = bcrypt.hashSync("bacon");
const cors = require("cors");
const knex = require("knex");
const register = require("./controllers/register");
const signin = require("./controllers/signin");
const profile = require("./controllers/profile");
const image = require("./controllers/image");
const test = require("./controllers/test");
const db = knex({
  client: "mysql",
  connection: {
    host: "127.0.0.1",
    user: "root",
    password: "123",
    database: "smart-brain"
  }
});
// db.select("*")
//   .from("users")
//   .then(data => console.log(data[0].name));

const database = {
  users: [
    {
      id: "123",
      name: "John",
      email: "john@gmail.com",
      password: "cookies",
      entries: 0,
      joined: new Date()
    },
    {
      id: "124",
      name: "Sally",
      email: "sally@gmail.com",
      password: "bananas",
      entries: 0,
      joined: new Date()
    }
  ],
  login: [
    {
      id: "987",
      hash: "",
      email: "john@gmail.com"
    }
  ]
};
app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
  res.json(database.users);
});

//skrot mozna tez nie uzywac req,res=>{} pamietaj o update paramtrow z signin.js
app.post("/signin", signin.handleSignin(db, bcrypt));

//dependency injection
app.post("/register", (req, res) => {
  register.handleRegister(req, res, db, bcrypt);
});

//   db("users")
//     .insert({
//       email: email,
//       name: name,
//       joined: new Date()
//     })

// .then(
// .select("*")
// .from("users")
// .where("email", email)

// .then(user => {
//   console.log(user[0]);
//   // res.json(user[0]);
// });

//   const query = db("users").where("email", email);
//   console.log(query);
//   res.json(query[0]);
//   console.log(email)

//   db.select("*")
//     .from("users")
//     .where("email", email)
//     .then(user => {
//       //   console.log(user);
//       res.json(user[0]);
//     });

//   res.redirect("test/" + email);
//   db
//     .select("*")
//     .from("users")
//     .where("email", email)
//     .then(user => {
//       console.log(user);
//       res.json(user[0]);
//     })
// );

//   db.select("*")
//     .from("users")
//     .where("email", email)
//     .then(user => {
//       console.log(user[0]);
//       res.json(user[0]);
//     });
//});

app.get("/test/:email", (req, res) => {
  test.handleTestRoute(req, res, db);
});

app.get("/profile/:id", (req, res) => {
  profile.handleProfileGet(req, res, db);
});

app.put("/image", (req, res) => {
  image.handleImage(req, res, db);
});

app.post("/imageurl", (req, res) => {
  image.handleApiCall(req, res);
});

bcrypt.hash("bacon", null, null, function(err, hash) {
  // Store hash in your password DB.
});

// Load hash from your password DB.
bcrypt.compare("bacon", hash, function(err, res) {
  // res == true
});
bcrypt.compare("veggies", hash, function(err, res) {
  // res = false
});

app.listen(process.env.PORT || 3000, () => {
  console.log(
    `Server is running on port ${process.env.PORT}\nlocalhost:${
      process.env.PORT
    }`
  );
});
