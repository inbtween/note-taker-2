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
