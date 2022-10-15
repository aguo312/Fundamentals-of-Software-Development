// Run this script to launch the server.
// The server should run on localhost port 8000.
// This is where you should start writing server-side code for this application.
const express = require("express");
const app = express();
const port = 8000;
const cors = require("cors");
const Answer = require("./models/answers");
const Question = require("./models/questions");
const Tag = require("./models/tags");

let mongoose = require("mongoose");
let mongoDB = "mongodb://127.0.0.1:27017/fake_so";
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.once("open", () => {
  console.log("Database connected:" + mongoDB);
});
db.on("error", (err) => {
  console.error("Connection error:", err);
});
process.on("SIGINT", () => {
  if (db) {
    db.close()
      .then((result) =>
        console.log("Server closed. Database instance disconnected")
      )
      .catch((err) => console.log(err));
  }
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/alldata", async (req, res) => {
  const answerData = await Answer.find({}).sort({ ans_date_time: -1 });
  const questionData = await Question.find({}).sort({ ask_date_time: -1 });
  const tagData = await Tag.find({});
  const allData = [];
  allData.push(questionData);
  allData.push(answerData);
  allData.push(tagData);
  res.send(allData);
});

app.put("/questionclick", async (req, res) => {
  let clickedQuestion = req.body;
  await Question.findByIdAndUpdate(
    { _id: clickedQuestion._id },
    { $inc: { views: 1 } }
  );
  res.send(clickedQuestion._id);
});

app.get("/dataandquestion/:id", async (req, res) => {
  const answerData = await Answer.find({}).sort({ ans_date_time: -1 });
  const questionData = await Question.find({}).sort({ ask_date_time: -1 });
  const tagData = await Tag.find({});
  let qid = req.params.id;
  let qidQuestion = await Question.find({ _id: qid });
  const allData = [];
  allData.push(questionData);
  allData.push(answerData);
  allData.push(tagData);
  allData.push(qidQuestion[0]);
  res.send(allData);
});

app.get("/answer/:id", async (req, res) => {
  let aid = req.params.id;
  let aidAnswer = await Answer.find({ _id: aid });
  res.send(aidAnswer);
});

app.post("/newtag", async (req, res) => {
  let newTags = req.body;
  newTags.forEach((t) => {
    let tagTemp = { name: t };
    let tg = new Tag(tagTemp);
    tg.save();
  });
  res.send("done");
});

app.get("/tags", async (req, res) => {
  const tagData = await Tag.find({});
  res.send(tagData);
});

app.post("/newquestion", async (req, res) => {
  const newQuestion = req.body;
  let qstn = new Question(newQuestion);
  qstn.save();
  res.send("done");
});

app.post("/newanswer", async (req, res) => {
  const newAnswer = req.body;
  let ans = new Answer(newAnswer);
  ans.save();
  res.send(ans);
});

app.put("/addanswertoquestion", async (req, res) => {
  const newAnswer = req.body;
  await Question.findByIdAndUpdate(
    { _id: newAnswer[1] },
    { $addToSet: { answers: newAnswer[0]._id } }
  );
  res.send("done");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
