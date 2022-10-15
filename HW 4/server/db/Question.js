// Question-related Queries
exports.allQuestions = function (conn, callback) {
  const allQuestionsQuery = `select
  t1.qid, 
  t1.title, 
  t1.text, 
  t1.asked_by, 
  t1.ask_date_time, 
  t1.views, 
  t1.answers, 
  t2.tags 
  from (select 
    question.qid, 
    question.title, 
    question.text, 
    question.asked_by, 
    question.ask_date_time, 
    question.views, 
    count(qa.qstnId) as answers 
    from question left outer join qa 
    on question.qid = qa.qstnId 
    group by question.qid) as t1
    left outer join (select 
        question.qid, 
        count(qt.qstnId) as tags 
        from question left outer join qt 
        on question.qid = qt.qstnId 
        group by question.qid) as t2
    on t1.qid = t2.qid
    order by t1.ask_date_time desc`;
  conn.query(allQuestionsQuery, function (error, results, fields) {
    callback(error, results);
  });
};

exports.oneQuestionViewUpdate = function (conn, callback, qid) {
  const oneQuestionViewUpdateQuery = `update question
  set views = views + 1
  where qid = ?`;
  conn.query(
    oneQuestionViewUpdateQuery,
    [qid],
    function (error, results, fields) {
      callback(error, results);
    }
  );
};

exports.oneQuestionById = function (conn, callback, qid) {
  const oneQuestionByIdQuery = `select * from question where qid = ?`;
  conn.query(oneQuestionByIdQuery, [qid], function (error, results, fields) {
    callback(error, results);
  });
};

exports.insertQuestion = function (conn, callback, newQuestion) {
  const insertQuestionQuery = `insert into question set ?`;
  let q = {
    title: newQuestion.title,
    text: newQuestion.text,
  };
  if (newQuestion.asked_by) {
    q.asked_by = newQuestion.asked_by;
  }
  conn.query(insertQuestionQuery, q, function (error, results, fields) {
    callback(error, results);
  });
};

exports.insertQT = function (conn, callback, qid, tids) {
  let insertQTQuery = `insert into qt (qstnId, tagId) values `;
  tids.forEach((tid, index) => {
    if (index === tids.length - 1) {
      insertQTQuery += `("` + qid + `", "` + tid + `")`;
    } else {
      insertQTQuery += `("` + qid + `", "` + tid + `"),`;
    }
  });
  conn.query(insertQTQuery, function (error, results, fields) {
    callback(error, results);
  });
};

exports.insertQA = function (conn, callback, qa) {
  let insertQAQuery = `insert into qa (qstnId, ansId) values ("${qa[0]}", "${qa[1]}")`;
  conn.query(insertQAQuery, function (error, results, fields) {
    callback(error, results);
  });
};

exports.allTagNames = function (conn, callback) {
  let allTagNamesQuery = `select 
  qid, 
  name 
  from question 
  left outer join qt on qid = qstnId 
  left outer join tag on tagId = tid`;
  conn.query(allTagNamesQuery, function (error, results, fields) {
    callback(error, results);
  });
};
