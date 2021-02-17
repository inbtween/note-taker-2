const express = require("express");
const path = require("path");
const fs = require("fs");

// let titleData = require("./db/db.json");
let notes = require("./db/db.json");

const app = express();
// a dynamic port
const PORT = process.env.PORT || 3001;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

// ROUTES

// ROUTES
app.get("/", (req, res) => {
  // res.sendFile(path.join(__dirname, "index.html"));
  // res.send("The server is live");
  // res.sendFile(path.join(__dirname, "/public/index.html"));
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get("/notes", (req, res) => {
  // res.sendFile(path.join(__dirname, "index.html"));
  // res.send("The server is live");
  // res.sendFile(path.join(__dirname, "/public/index.html"));
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});

// ROUTES
app.get("/api/notes", (req, res) => res.json(notes));
// ROUTER
// The below points our server to a series of "route" files.
// These routes give our server a "map" of how to respond when users visit or request data from various URLs.

app.post("/api/notes", function (req, res) {
  try {
    // reads the json file
    notes = fs.readFileSync("db/db.json", "utf8");
    console.log(notes);
    // parse the data to get an array of objects
    notes = JSON.parse(notes);
    // Set new notes id
    req.body.id = uuid.v4();
    // add the new note to the array of note objects
    notes.push(req.body); // req.body - user input
    // make it string(stringify)so you can write it to the file
    notes = JSON.stringify(notes);
    // writes the new note to file
    fs.writeFile("./db/db.json", notes, "utf8", function (err) {
      // error handling
      if (err) throw err;
      notes = JSON.parse(notes);
      res.json(notes);
    });
  } catch (err) {
    console.error(err);
    throw err;
  }
});

app.delete("/api/notes/:id", function (req, res) {
  try {
    //  reads the json file
    notes = fs.readFileSync("./db/db.json", "utf8");
    // parse the data to get an array of the objects
    notes = JSON.parse(notes);
    // delete the old note from the array on note objects
    notes = notes.filter(function (note) {
      return note.id != req.params.id;
    });
    // make it string(stringify)so you can write it to the file
    notes = JSON.stringify(notes);
    // write the new notes to the file
    fs.writeFile("./db/db.json", notes, "utf8", function (err) {
      // error handling
      if (err) throw err;
      notes = JSON.parse(notes);
      res.json(notes);
    });
    // error handling
  } catch (err) {
    console.log(err);
    throw err;
  }
});

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
