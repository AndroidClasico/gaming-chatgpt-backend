const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

const uri =
  "mongodb+srv://AndroidClasico:ClasicoAndroidS@cluster0.rt4njr6.mongodb.net/?retryWrites=true&w=majority";

async function connect() {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("DB successfully connected!");
  } catch (error) {
    console.error(error);
  }
}

connect();

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
});

const User = mongoose.model("User", userSchema);

const user = new User({
  username: "reyndrop",
  password: "12345",
});

user.save((error) => {
  if (error) throw error;
  console.log("New user has been saved to the database.");
});

app.get("/", (req, res) => {
  res.send("I used chatGPT to build this app :)");
});

app.post("/register", (req, res) => {
  const { username, password } = req.body;
  const user = new User({
    username,
    password,
  });
  user.save((error) => {
    if (error) {
      res.status(500).json({ error: "Error while saving to db" });
    } else {
      res.status(201).json({ message: "User saved to DB!!!!" });
    }
  });
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
