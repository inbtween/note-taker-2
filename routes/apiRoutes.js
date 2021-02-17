module.exports = (app) => {
  // API GET Requests
  // Below code handles when users "visit" a page.

  app.get("/api/title", (req, res) => res.json(titleData.title));

  app.get("/api/notes", (req, res) => res.json(noteData.text));

  app.post("/api/title", (req, res) => {
    if (titleData.length < 200) {
      titleData.push(req.body);
      res.json(true);
    } else {
      titleData.push(req.body);
      res.json(false);
    }
  });
  app.post("/api/notes", (req, res) => {
    if (noteData.length < 20) {
      noteData.push(req.body);
      res.json(true);
    } else {
      noteData.push(req.body);
      res.json(false);
    }
  });

  app.post("/api/clear", (req, res) => {
    titleData.length = 0;
    noteData.length = 0;

    res.json({ ok: true });
  });
};
