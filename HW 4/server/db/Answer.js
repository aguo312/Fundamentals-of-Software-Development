// Answer-related queries
exports.allAnswers = function (conn, callback) {
  const allAnswersQuery = "SELECT * FROM answer";
  conn.query(allAnswersQuery, function (error, results, fields) {
    callback(error, results);
  });
};

exports.oneQuestionAnswersById = function (conn, callback, qid) {
  const oneQuestionAnswersById = `select aid, text, ans_by, ans_date_time from answer
    left outer join qa
    on qa.ansId = answer.aid
    where qstnId = ?
    order by ans_date_time desc`;
  conn.query(oneQuestionAnswersById, [qid], function (error, results, fields) {
    callback(error, results);
  });
};

exports.insertAnswer = function (conn, callback, newAnswer) {
  const insertAnswerQuery = `insert into answer set ?`;
  let a = {
    text: newAnswer.text,
    ans_by: newAnswer.ans_by,
  };
  conn.query(insertAnswerQuery, a, function (error, results, fields) {
    callback(error, results);
  });
};
