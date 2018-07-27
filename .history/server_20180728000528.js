const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt-nodejs");
const app = express();
const hash = bcrypt.hashSync("bacon");
const cors = require("cors");
const knex = require("knex");
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

app.post("/signin", (req, res) => {
  if (
    req.body.email === database.users[0].email &&
    req.body.password === database.users[0].password
  )
    // res.json("success")
    res.json(database.users[0]);
  else res.status(400).json("error login in");
});

app.post("/register", (req, res) => {
  const { email, name, password } = req.body;
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

  db("users")
    .insert({
      email: email,
      name: name,
      joined: new Date()
    })
    // .then(
    // .select("*")
    // .from("users")
    // .where("email", email)
    .then(user => {
      console.log(user[0]);
      // res.json(user[0]);
    });

  //   const query = db("users").where("email", email);
  //   console.log(query);
  //   res.json(query[0]);
  //   console.log(email)

  db.select("*")
    .from("users")
    .where("email", email)
    .then(user => {
      //   console.log(user);
      res.json(user[0]);
    });

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
});

app.get("/test/:email", (req, res) => {
  console.log("hello", req.params);
  db.select("*")
    .from("users")
    .where("email", req.params.email)
    .then(user => {
      //   console.log(user);
      res.json(user[0]);
    });
});

app.get("/profile/:id", (req, res) => {
  const { id } = req.params;
  let found = false;
  //   database.users.forEach(user => {
  //     if (user.id === id) {
  //       found = true;
  //       return res.json(user);
  //     }
  //   });
  db.select("*")
    .from("users")
    .where("id", id)
    .then(user => console.log(user));
  if (!found) res.status(404).json("no such user");
});

app.put("/image", (req, res) => {
  const { id } = req.body;
  let found = false;
  database.users.forEach(user => {
    if (user.id === id) {
      found = true;
      user.entries++;
      return res.json(user.entries);
    }
  });
  if (!found) res.status(404).json("no such user");
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

app.listen(process.env.SERVER_PORT, () => {
  console.log(
    `Server is running on port ${process.env.SERVER_PORT}\nlocalhost:${
      process.env.SERVER_PORT
    }`
  );
});
