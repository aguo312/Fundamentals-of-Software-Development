// Tag related queries
exports.allTags = function (conn, callback) {
  const allTagsQuery = `select 
  tid, 
  name, 
  count(qstnId) as questions 
  from tag left outer join qt
  on qt.tagId = tag.tid
  group by tag.tid`;
  conn.query(allTagsQuery, function (error, results, fields) {
    callback(error, results);
  });
};

exports.oneQuestionTagNamesById = function (conn, callback, qid) {
  const oneQuestionTagNamesByIdQuery = `select 
  tid, 
  name 
  from tag left outer join qt
  on qt.tagId = tag.tid
  where qstnId = ?`;
  conn.query(
    oneQuestionTagNamesByIdQuery,
    [qid],
    function (error, results, fields) {
      callback(error, results);
    }
  );
};

exports.insertTag = function (conn, callback, tagName) {
  let insertTagQuery = `insert into tag (name)
    values `;
  tagName.forEach((name, index) => {
    if (index === tagName.length - 1) {
      insertTagQuery += `("` + name + `")`;
    } else {
      insertTagQuery += `("` + name + `"),`;
    }
  });
  conn.query(insertTagQuery, function (error, results, fields) {
    if (error) {
      return conn.rollback(function (error) {
        throw error;
      });
    }
    callback(error, results);
  });
};
