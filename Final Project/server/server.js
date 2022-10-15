// Application server
const express = require("express");
const app = express();
const port = 8000;
const cors = require("cors");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const bcrypt = require("bcrypt");
const User = require("./models/users");
const Answer = require("./models/answers");
const Question = require("./models/questions");
const Comment = require("./models/comments");
const Tag = require("./models/tags");

let mongoose = require("mongoose");
let mongoDB = "mongodb://127.0.0.1:27017/fake_so";
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.once("open", () => {
  console.log("Database connected: " + mongoDB);
});
db.on("error", (err) => {
  console.error("Connection error: ", err);
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

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: process.env.SECRET_KEY,
    cookie: {
      expires: 1000 * 60 * 60 * 24,
      httpOnly: true,
      secure: false,
    },
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: mongoDB }),
  })
);

app.get("/", (req, res) => {
  // console.log(req.body);
  // console.log("session");
  // console.log(req.session);
  // console.log("sessionID");
  // console.log(req.sessionID);
  if (req.session.loggedUser) {
    console.log("user: " + req.session.loggedUser);
  }
  res.send("Hello World!");
});

app.post("/guestlogin", (req, res) => {
  //console.log(req.session);
  const guest = {
    username: "guest",
  };
  req.session.loggedUser = guest;
  req.session.guest = true;
  res.send("guestTrue");
});

app.get("/users/:email", async (req, res) => {
  const email = req.params.email;
  let existingUser = await User.findOne({ email });
  res.send(existingUser);
});

app.post("/register", async (req, res) => {
  const username = req.body[0];
  const email = req.body[1];
  const password = req.body[2];
  const hashPass = await bcrypt.hash(password, 10);
  const newUser = new User({
    username: username,
    email: email,
    password: hashPass,
  });
  newUser.save();
  res.send("done");
});

app.post("/login", async (req, res) => {
  const email = req.body[0];
  const password = req.body[1];
  let existingUser = await User.findOne({ email });
  const passwordCheck = await bcrypt.compare(password, existingUser.password);
  if (!passwordCheck) {
    res.send();
  } else {
    req.session.loggedUser = existingUser;
    req.session.guest = false;
    res.send(existingUser);
  }
});

app.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) throw err;
    res.send();
  });
});

app.get("/alldata", async (req, res) => {
  const answerData = await Answer.find({}).sort({ ans_date_time: -1 });
  const questionData = await Question.find({}).sort({ ask_date_time: -1 });
  const tagData = await Tag.find({});
  const commentData = await Comment.find({}).sort({ comment_date_time: -1 });
  let userData;
  if (req.session.loggedUser) {
    userData = await User.findById({ _id: req.session.loggedUser._id });
  }
  const allData = [];
  allData.push(questionData);
  allData.push(answerData);
  allData.push(tagData);
  allData.push(userData);
  allData.push(req.session.guest);
  allData.push(commentData);
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
  const commentData = await Comment.find({}).sort({ comment_date_time: -1 });
  const userData = await User.findById({ _id: req.session.loggedUser._id });
  let qid = req.params.id;
  let qidQuestion = await Question.find({ _id: qid });
  const allData = [];
  allData.push(questionData);
  allData.push(answerData);
  allData.push(tagData);
  allData.push(qidQuestion[0]);
  allData.push(userData);
  allData.push(req.session.guest);
  allData.push(commentData);
  res.send(allData);
});

app.get("/dataandanswer/:id", async (req, res) => {
  const answerData = await Answer.find({}).sort({ ans_date_time: -1 });
  const questionData = await Question.find({}).sort({ ask_date_time: -1 });
  const tagData = await Tag.find({});
  const commentData = await Comment.find({}).sort({ comment_date_time: -1 });
  const userData = await User.findById({ _id: req.session.loggedUser._id });
  let aid = req.params.id;
  let aidAnswer = await Answer.find({ _id: aid });
  const allData = [];
  allData.push(questionData);
  allData.push(answerData);
  allData.push(tagData);
  allData.push(aidAnswer[0]);
  allData.push(userData);
  allData.push(req.session.guest);
  allData.push(commentData);
  res.send(allData);
});

app.get("/question/:id", async (req, res) => {
  let qid = req.params.id;
  let qidQuestion = await Question.find({ _id: qid }).populate("tags");
  res.send(qidQuestion);
});

app.get("/answer/:id", async (req, res) => {
  let aid = req.params.id;
  let aidAnswer = await Answer.find({ _id: aid });
  const userData = await User.findById({ _id: req.session.loggedUser._id });
  aidAnswer.push(userData);
  aidAnswer.push(req.session.guest);
  res.send(aidAnswer);
});

app.get("/tag/:id", async (req, res) => {
  let tid = req.params.id;
  let tidTag = await Tag.find({ _id: tid });
  res.send(tidTag);
});

app.post("/newtag", async (req, res) => {
  let newTags = req.body;
  newTags.forEach((tagObject) => {
    let tg = new Tag(tagObject);
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

app.post("/newcomment", async (req, res) => {
  const newComment = req.body;
  let com = new Comment(newComment);
  com.save();
  res.send(com);
});

app.put("/addcommenttoquestion", async (req, res) => {
  const newComment = req.body;
  await Question.findByIdAndUpdate(
    { _id: newComment[1] },
    { $addToSet: { comments: newComment[0]._id } }
  );
  res.send("done");
});

app.put("/addcommenttoanswer", async (req, res) => {
  const newComment = req.body;
  await Answer.findByIdAndUpdate(
    { _id: newComment[1] },
    { $addToSet: { comments: newComment[0]._id } }
  );
  res.send("done");
});

app.get("/comment/:id", async (req, res) => {
  let cid = req.params.id;
  let cidComment = await Comment.find({ _id: cid });
  res.send(cidComment);
});

app.put("/updatequestion", async (req, res) => {
  const updateQuestion = req.body;
  const newQuestion = new Question(updateQuestion[1]);
  await Question.findByIdAndUpdate(
    { _id: updateQuestion[0] },
    {
      title: newQuestion.title,
      summary: newQuestion.summary,
      text: newQuestion.text,
      tags: newQuestion.tags,
    }
  );
  res.send("done");
});

app.put("/deletequestion", async (req, res) => {
  const questionId = req.body;
  const matchQuestion = await Question.find({ _id: { $in: questionId } });
  const commentId = [];
  const answerId = [];
  const tagId = [];
  matchQuestion.forEach((questionObject) => {
    questionObject.comments.forEach((comment) => {
      commentId.push(comment._id);
    });
    questionObject.answers.forEach((answersObject) => {
      answerId.push(answersObject._id);
    });
    questionObject.tags.forEach((tagsObject) => {
      tagId.push(tagsObject._id);
    });
  });
  await Question.deleteMany({ _id: { $in: questionId } });
  res.send([commentId, tagId, answerId]);
});

app.put("/updateanswer", async (req, res) => {
  const updateAnswer = req.body;
  await Answer.findByIdAndUpdate(
    { _id: updateAnswer[0] },
    { $set: { text: updateAnswer[1] } }
  );
  res.send("done");
});

app.put("/deleteanswer", async (req, res) => {
  const answerId = req.body;
  const matchAnswer = await Answer.find({ _id: { $in: answerId } });
  const commentId = [];
  matchAnswer.forEach((answerObject) => {
    answerObject.comments.forEach((comment) => {
      commentId.push(comment._id);
    });
  });
  await Answer.deleteMany({ _id: { $in: answerId } });
  await Question.updateMany(
    { answers: { $in: answerId } },
    { $pull: { answers: { $in: answerId } } }
  );
  res.send(commentId);
});

app.put("/updatetag", async (req, res) => {
  const updateTag = req.body;
  const foundTag = await Tag.find({ name: updateTag[1] });
  if (foundTag.length > 0) {
    res.send("fail");
  } else {
    await Tag.findByIdAndUpdate(
      { _id: updateTag[0] },
      { $set: { name: updateTag[1] } }
    );
    res.send("done");
  }
});

app.put("/deletetag", async (req, res) => {
  const tagId = req.body;
  await Tag.deleteMany({ _id: { $in: tagId } });
  await Question.updateMany(
    { tags: { $in: tagId } },
    { $pull: { tags: { $in: tagId } } }
  );
  res.send("done");
});

app.put("/deleteemptytag", async (req, res) => {
  const tagId = req.body;
  const deleteId = [];
  const foundQuestion = await Question.find({ tags: { $in: tagId } });
  tagId.forEach((id) => {
    let count = 0;
    foundQuestion.forEach((questionObject) => {
      questionObject.tags.forEach((tagObject) => {
        const stringId = tagObject._id.toString();
        if (id === stringId) {
          count++;
        }
      });
    });
    if (count === 0) {
      deleteId.push(tagId);
    }
  });
  await Tag.deleteMany({ _id: { $in: deleteId } });
  res.send("done");
});

app.put("/deletecomment", async (req, res) => {
  const commentId = req.body;
  await Comment.deleteMany({ _id: { $in: commentId } });
  await Question.updateMany(
    { comments: { $in: commentId } },
    { $pull: { comments: { $in: commentId } } }
  );
  res.send("done");
});

app.put("/upvotequestion", async (req, res) => {
  const data = req.body;
  await Question.findByIdAndUpdate(
    { _id: data[0] },
    { $push: { upvotes: data[2] } }
  );
  await User.findByIdAndUpdate({ _id: data[1] }, { $inc: { reputation: 5 } });
  res.send("done");
});

app.put("/downvotequestion", async (req, res) => {
  const data = req.body;
  await Question.findByIdAndUpdate(
    { _id: data[0] },
    { $push: { downvotes: data[2] } }
  );
  await User.findByIdAndUpdate({ _id: data[1] }, { $inc: { reputation: -10 } });
  res.send("done");
});

app.put("/undoupvotequestion", async (req, res) => {
  const data = req.body;
  await Question.findByIdAndUpdate(
    { _id: data[0] },
    { $pull: { upvotes: data[2] } }
  );
  await User.findByIdAndUpdate({ _id: data[1] }, { $inc: { reputation: -5 } });
  res.send("done");
});

app.put("/undodownvotequestion", async (req, res) => {
  const data = req.body;
  await Question.findByIdAndUpdate(
    { _id: data[0] },
    { $pull: { downvotes: data[2] } }
  );
  await User.findByIdAndUpdate({ _id: data[1] }, { $inc: { reputation: 10 } });
  res.send("done");
});

app.put("/upvoteanswer", async (req, res) => {
  const data = req.body;
  await Answer.findByIdAndUpdate(
    { _id: data[0] },
    { $push: { upvotes: data[2] } }
  );
  await User.findByIdAndUpdate({ _id: data[1] }, { $inc: { reputation: 5 } });
  res.send("done");
});

app.put("/downvoteanswer", async (req, res) => {
  const data = req.body;
  await Answer.findByIdAndUpdate(
    { _id: data[0] },
    { $push: { downvotes: data[2] } }
  );
  await User.findByIdAndUpdate({ _id: data[1] }, { $inc: { reputation: -10 } });
  res.send("done");
});

app.put("/undoupvoteanswer", async (req, res) => {
  const data = req.body;
  await Answer.findByIdAndUpdate(
    { _id: data[0] },
    { $pull: { upvotes: data[2] } }
  );
  await User.findByIdAndUpdate({ _id: data[1] }, { $inc: { reputation: -5 } });
  res.send("done");
});

app.put("/undodownvoteanswer", async (req, res) => {
  const data = req.body;
  await Answer.findByIdAndUpdate(
    { _id: data[0] },
    { $pull: { downvotes: data[2] } }
  );
  await User.findByIdAndUpdate({ _id: data[1] }, { $inc: { reputation: 10 } });
  res.send("done");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
