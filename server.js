const express = require("express");
const path = require("path");

const app = express();
// a dynamic port
const PORT = process.env.PORT || 3000;

const fs = require("fs");
fs.readFile("db.json", function (err, data) {
  // Check for errors
  if (err) throw err;

  // Converting to JSON
  const db = JSON.parse(data);

  console.log(db); // Print note
});
// / STEP 1: Reading JSON file
const db = require("../db/db.json");
console.log(db);

// Defining new user
let dataBase = {
  title: "New Test Title",
  text: "New Test text",
};

// STEP 2: Adding new data to db object
db.push(dataBase);

// STEP 3: Writing to a file
fs.writeFile("db.json", JSON.stringify(db), (err) => {
  // Checking for errors
  if (err) throw err;

  console.log("Done writing note"); // Success
});

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

// ROUTES
app.get("/", (req, res) => {
  // res.sendFile(path.join(__dirname, "index.html"));
  // res.send("The server is live");
  // res.sendFile(path.join(__dirname, "/public/index.html"));
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});

// ROUTER
// The below points our server to a series of "route" files.
// These routes give our server a "map" of how to respond when users visit or request data from various URLs.

require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
