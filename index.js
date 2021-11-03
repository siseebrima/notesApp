const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static("build"));

let notes = [
  {
    id: 1,
    content: "HTML is easy",
    date: "2019-05-30T17:30:31.098Z",
    important: true,
  },
  {
    id: 2,
    content: "Browser can execute only Javascript",
    date: "2019-05-30T18:39:34.091Z",
    important: false,
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    date: "2019-05-30T19:20:14.298Z",
    important: true,
  },
];

app.get("/api/notes", (req, res) => {
  res.json(notes);
});

app.get("/api/notes/:id", (req, res) => {
  const id = Number(req.params.id);
  const note = notes.find((n) => n.id === id);
  if (note) {
    res.json(note);
  } else {
    res.status(404).send("the resource you are looking for is not available");
  }
});

app.delete("/api/notes/:id", (req, res) => {
  const id = Number(req.params.id);
  const note = notes.find((n) => n.id === id);

  if (note) {
    notes = notes.filter((n) => n.id !== id);
    res.status(204).send("the note has been deleted");
  } else {
    res.status(404).send("The note you are trying to delete is not available");
  }
});

app.post("/api/notes", (req, res) => {
  const maxId = notes.length > 0 ? Math.max(...notes.map((n) => n.id)) : 0;

  const body = req.body;
  if (body.content) {
    const note = {
      content: body.content,
      important: body.important || false,
      date: new Date(),
      id: maxId + 1,
    };

    notes = notes.concat(note);
    res.json(note);
  } else {
    return res.status(400).json({
      error: "content missing",
    });
  }
});
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server started on ${PORT}`);
});
