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
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});

// ROUTES
app.get("/api/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "db/db.json"));
});

app.post("/api/notes", function (req, res) {
  // reads the json file

  let currentNotes = fs.readFileSync(
    path.join(__dirname, "db/db.json"),
    "utf8"
  );
  let parseNotes;
  try {
    parseNotes = [].concat(JSON.parse(currentNotes));
  } catch {
    parseNotes = [];
  }
  // Set new notes id
  let newNotes = req.body;
  let updatedNotes = [...parseNotes, newNotes];

  fs.writeFileSync(
    path.join(__dirname, "db/db.json"),
    JSON.stringify(updatedNotes),
    "utf8",
    function (err) {
      // error handling
      if (err) throw err;
    }
  );
  fs.readFileSync(path.join(__dirname, "db/db.json"), "utf8")
    .then((notes) => res.JSON(notes))
    .catch((error) => res.status(500).JSON(error));
});

// specific ids to delete, package npm i uuid
// filter, the notes is an arr
app.delete("/api/notes", function (req, res) {
  //  reads the json file
  fs.readFileSync(
    path.join(__dirname, "db/db.json"),
    "utf8",
    function (err, data) {
      if (err) {
        console.log(err);
      }
      // parse the data to get an array of objects
      let saveNotes = JSON.parse(notes);
      // Set new notes id
      //   let newNotes = req.body;
      // add the new note to the array of note objects
      //   saveNotes.push(newNotes); // req.body - user input
      // make it string(stringify)so you can write it to the file
      notes = notes.filter(function (note) {
        return note != req.body;
      });
      let notes = JSON.stringify(notes);
      // writes the new note to file
      fs.writeFileSync(
        path.join(__dirname, "db/db.json"),
        notes,
        "utf8",
        function (err) {
          // error handling
          if (err) throw err;
        }
      );
      res.json(newNotes);
    }
  );
  // parse the data to get an array of the objects
  //   notes = JSON.parse(notes);
  // delete the old note from the array on note objects
  notes = notes.filter(function (note) {
    return note != req.body;
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
});
app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));
