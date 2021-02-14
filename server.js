const express = require("express");
const path = require("path");

const app = express();
// a dynamic port
const PORT = process.env.PORT || 3000;

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
