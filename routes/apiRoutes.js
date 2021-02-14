// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on note taker, the title and note area etc.

const titleData = require("..db/db.json");
const noteData = require("../db/db.json");

// ROUTING

module.exports = (app) => {
  // API GET Requests
  // Below code handles when users "visit" a page.

  app.get("/api/title", (req, res) => res.json(titleData));

  app.get("/api/notes", (req, res) => res.json(noteData));

  // API POST Requests
  // Below code handles when a user submits a form and thus submits data to the server.
  // In each of the below cases, when a user submits form data (a JSON object)

  app.post("/api/title", (req, res) => {
    // title the code here. Our "server" will respond to requests and let users know if they have a table or not.
    // It will do this by sending out the value "true" make a title
    // req.body is available since we're using the body parsing middleware
    if (titleData.length < 20) {
      titleData.push(req.body);
      res.json(true);
    } else {
      titleData.push(req.body);
      res.json(false);
    }
  });
  app.post("/api/notes", (req, res) => {
    // Note the code here. Our "server" will respond to requests and let users know if they have a table or not.
    // It will do this by sending out the value "true" make a note
    // req.body is available since we're using the body parsing middleware
    if (noteData.length < 20) {
      noteData.push(req.body);
      res.json(true);
    } else {
      noteData.push(req.body);
      res.json(false);
    }
  });

  // I added this below code so you could clear out the table while working with the functionality.
  // Don"t worry about it!

  app.post("/api/clear", (req, res) => {
    // Empty out the arrays of data
    titleData.length = 0;
    noteData.length = 0;

    res.json({ ok: true });
  });
};
