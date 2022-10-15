// Run this script to launch the server.
// The server should run on localhost port 8000.
// This is where you should start writing server-side code for this application.

const express = require("express");
const app = express();
const port = 8000;
const cors = require("cors");

var async = require("async");
var mysql = require("mysql");
var Answer = require("./db/Answer");
var Question = require("./db/Question");
var Tag = require("./db/Tag");
let userArgs = process.argv.slice(2);

if (userArgs.length == 0) {
  console.log("Missing arguments");
  console.log(
    "Correct Usage: node server.js -u <mysqlusername> -p <mysqlpassword>"
  );
  return;
}

if (userArgs.length < 4) {
  console.log("Bad arguments");
  console.log(
    "Correct Usage: node server.js -u <mysqlusername> -p <mysqlpassword>"
  );
  return;
}

if (userArgs[0] != "-u") {
  console.log("Username missing");
  return;
}

if (userArgs[2] != "-p") {
  console.log("Password missing");
  return;
}

// if (userArgs[4] != "-a") {
//   console.log("Arguments missing");
//   return;
// }

user = userArgs[1];
pass = userArgs[3];
// req = userArgs[5];

var connection = mysql.createConnection({
  host: "localhost",
  user: user,
  password: pass,
  database: "fake_so",
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});

connection.Promise = global.Promise;

process.on("SIGINT", () => {
  if (connection) {
    connection.end(function (err) {
      if (err) {
        console.log(err);
      }
      console.log("Server closed. Database instance disconnected");
    });
  }
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/questions", (req, res) => {
  async.parallel(
    [
      function (callback) {
        Question.allQuestions(connection, callback);
      },
    ],
    function (error, results) {
      if (error) throw error;
      res.send(results[0]);
    }
  );
});

app.get("/tags", (req, res) => {
  async.parallel(
    [
      function (callback) {
        Tag.allTags(connection, callback);
      },
    ],
    function (error, results) {
      if (error) throw error;
      res.send(results[0]);
    }
  );
});

app.get("/answers", (req, res) => {
  async.parallel(
    [
      function (callback) {
        Answer.allAnswers(connection, callback);
      },
    ],
    function (error, results) {
      if (error) throw error;
      res.send(results[0]);
    }
  );
});

app.get("/alldata", (req, res) => {
  async.parallel(
    [
      function (callback) {
        Question.allQuestions(connection, callback);
      },
      function (callback) {
        Answer.allAnswers(connection, callback);
      },
      function (callback) {
        Tag.allTags(connection, callback);
      },
      function (callback) {
        Question.allTagNames(connection, callback);
      },
    ],
    function (error, results) {
      if (error) throw error;
      res.send(results);
    }
  );
});

app.get("/onequestiontagnames/:qid", (req, res) => {
  let qid = req.params.qid;
  async.parallel(
    [
      function (callback) {
        Tag.oneQuestionTagNamesById(connection, callback, qid);
      },
    ],
    function (error, results) {
      if (error) throw error;
      res.send(results);
    }
  );
});

app.put("/questionclick/:qid", (req, res) => {
  let qid = req.params.qid;
  async.parallel(
    [
      function (callback) {
        Question.oneQuestionViewUpdate(connection, callback, qid);
      },
    ],
    function (error, results) {
      if (error) throw error;
      res.send(qid);
    }
  );
});

app.get("/onequestiondata/:qid", (req, res) => {
  let qid = req.params.qid;
  async.parallel(
    [
      function (callback) {
        Question.oneQuestionById(connection, callback, qid);
      },
      function (callback) {
        Answer.oneQuestionAnswersById(connection, callback, qid);
      },
    ],
    function (error, results) {
      if (error) throw error;
      res.send(results);
    }
  );
});

app.post("/newtag", (req, res) => {
  const newTagNames = req.body;
  if (newTagNames.length > 0) {
    async.parallel(
      [
        function (callback) {
          Tag.insertTag(connection, callback, newTagNames);
        },
      ],
      function (error, results) {
        if (error) throw error;
      }
    );
  }
  res.send("done");
});

app.post("/newquestion", (req, res) => {
  const newQuestion = req.body;
  async.parallel(
    [
      function (callback) {
        Question.insertQuestion(connection, callback, newQuestion);
      },
    ],
    function (error, results) {
      if (error) throw error;
      res.send(results[0]);
    }
  );
});

app.post("/newqt", (req, res) => {
  const qid = req.body[0];
  const tids = req.body.slice(1);
  async.parallel(
    [
      function (callback) {
        Question.insertQT(connection, callback, qid, tids);
      },
    ],
    function (error, results) {
      if (error) throw error;
      res.send("done");
    }
  );
});

app.post("/newanswer", (req, res) => {
  const newAnswer = req.body;
  async.parallel(
    [
      function (callback) {
        Answer.insertAnswer(connection, callback, newAnswer);
      },
    ],
    function (error, results) {
      if (error) throw error;
      res.send(results[0]);
    }
  );
});

app.post("/newqa", (req, res) => {
  async.parallel(
    [
      function (callback) {
        Question.insertQA(connection, callback, req.body);
      },
    ],
    function (error, results) {
      if (error) throw error;
      res.send("done");
    }
  );
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
