import Model from "./model.js";

const testmodel = new Model().data;

window.onload = function () {
  // write relevant code.

  loadQuestions(testmodel.questions, "All Questions");
};

function loadQuestions(questionArray, tableTitle) {
  var mainDiv = document.getElementById("main");
  while (mainDiv.firstChild) {
    main.removeChild(main.firstChild);
  }

  const numElements = questionArray.length;
  questionArray.sort(function (a, b) {
    return dateSort(a, b);
  });

  var questionTable = document.createElement("table");
  var headerRow = document.createElement("tr");

  var headerRowCol1 = document.createElement("th");
  if (numElements == 1) {
    headerRowCol1.innerHTML = numElements + " Question";
  } else {
    headerRowCol1.innerHTML = numElements + " Questions";
  }
  headerRowCol1.style.width = "20%";
  headerRow.appendChild(headerRowCol1);

  var headerRowCol2 = document.createElement("th");
  headerRowCol2.innerHTML = tableTitle;
  headerRowCol2.style.width = "60%";
  headerRow.appendChild(headerRowCol2);

  var headerRowCol3 = document.createElement("th");
  var headerRowCol3Button = document.createElement("button");
  headerRowCol3Button.innerHTML = "Ask A Question";
  headerRowCol3Button.addEventListener("click", openQuestionForm);
  headerRowCol3.style.width = "20%";
  headerRowCol3.appendChild(headerRowCol3Button);
  headerRow.appendChild(headerRowCol3);
  questionTable.appendChild(headerRow);

  if (numElements != 0) {
    for (let i = 0; i < numElements; i++) {
      var newRow = document.createElement("tr");

      var newData = document.createElement("td");
      newData.classList.add("leftColumn");

      if (questionArray[i].views == 1) {
        newData.innerHTML = questionArray[i].views + " View<br>";
      } else {
        newData.innerHTML = questionArray[i].views + " Views<br>";
      }
      if (questionArray[i].answers.length == 1) {
        newData.innerHTML += questionArray[i].answers.length + " Answer";
      } else {
        newData.innerHTML += questionArray[i].answers.length + " Answers";
      }
      newRow.appendChild(newData);

      var newData = document.createElement("td");
      newData.classList.add("centerColumn");
      var newLink = document.createElement("a");

      newLink.classList.add("titleLink");
      newLink.innerHTML = questionArray[i].title;
      newLink.setAttribute("href", "#");

      newLink.addEventListener("click", function () {
        showThisQuestion(questionArray[i].qid, 1);
      });
      newData.appendChild(newLink);

      var newDiv = document.createElement("div");

      newDiv = getTags(questionArray, i);

      newData.appendChild(newDiv);
      newRow.appendChild(newData);

      var newData = document.createElement("td");
      newData.classList.add("rightColumn");

      /*add color for these if possible*/
      newData.innerHTML =
        "Asked By " +
        questionArray[i].askedBy +
        "<br>On " +
        questionArray[i].askedOn +
        "<br>At " +
        questionArray[i].askedAt;
      newRow.appendChild(newData);

      questionTable.appendChild(newRow);
    }
  } else {
    var newRow = document.createElement("tr");

    var newData = document.createElement("td");
    newData.classList.add("leftColumn");
    newData.innerHTML = "";
    newRow.appendChild(newData);

    var newData = document.createElement("td");
    newData.innerHTML = "No Questions Found";
    newRow.appendChild(newData);

    var newData = document.createElement("td");
    newData.classList.add("rightColumn");
    newData.innerHTML = "";
    newRow.appendChild(newData);

    questionTable.appendChild(newRow);
  }

  questionTable.setAttribute("id", "questions");
  document.getElementById("main").appendChild(questionTable);
}

function dateSort(objA, objB) {
  var aYear = Number(objA.askedOn.substring(8));
  var aMonth = monthToNumber(objA.askedOn.substring(0, 3));
  var aDay = Number(objA.askedOn.substring(4, 6));
  var aHour = Number(objA.askedAt.substring(0, 2));
  var aMinute = Number(objA.askedAt.substring(3));
  var bYear = Number(objB.askedOn.substring(8));
  var bMonth = monthToNumber(objB.askedOn.substring(0, 3));
  var bDay = Number(objB.askedOn.substring(4, 6));
  var bHour = Number(objB.askedAt.substring(0, 2));
  var bMinute = Number(objB.askedAt.substring(3));
  if (aYear > bYear) {
    return -1;
  }
  if (aYear < bYear) {
    return 1;
  }
  if (aMonth > bMonth) {
    return -1;
  }
  if (aMonth < bMonth) {
    return 1;
  }
  if (aDay > bDay) {
    return -1;
  }
  if (aDay < bDay) {
    return 1;
  }
  if (aHour > bHour) {
    return -1;
  }
  if (aHour < bHour) {
    return 1;
  }
  if (aMinute > bMinute) {
    return -1;
  }
  if (aMinute > bMinute) {
    return 1;
  }
  return 0;
}

function getTags(questionArray, i) {
  var tagList = questionArray[i].tagIds;
  var tagArray = testmodel.tags;

  var tagsDiv = document.createElement("div");

  var counter = 0;
  for (let j = 0; j < Math.ceil(tagList.length / 4); j++) {
    var oneRowTags = document.createElement("div");
    oneRowTags.classList.add("questionsTag");

    while (counter < tagList.length) {
      for (let k = 0; k < tagArray.length; k++) {
        if (tagList[counter] == tagArray[k].tid) {
          var newDiv = document.createElement("div");
          newDiv.innerHTML = tagArray[k].name;
          oneRowTags.appendChild(newDiv);
          break;
        }
      }
      if (counter % 4 == 3) {
        counter++;
        break;
      }
      counter++;
    }

    tagsDiv.appendChild(oneRowTags);
  }
  return tagsDiv;
}

function loadTags() {
  var mainDiv = document.getElementById("main");
  while (mainDiv.firstChild) {
    main.removeChild(main.firstChild);
  }

  const numTags = testmodel.tags.length;

  var tagTable = document.createElement("table");
  var headerRow = document.createElement("tr");

  var headerRowCol1 = document.createElement("th");
  headerRowCol1.innerHTML = numTags + " Tags";
  headerRow.appendChild(headerRowCol1);

  var headerRowCol2 = document.createElement("th");
  headerRowCol2.innerHTML = "All Tags";
  headerRow.appendChild(headerRowCol2);

  var headerRowCol3 = document.createElement("th");
  var headerRowCol3Button = document.createElement("button");
  headerRowCol3Button.innerHTML = "Ask A Question";
  headerRowCol3Button.addEventListener("click", openQuestionForm);
  headerRowCol3.appendChild(headerRowCol3Button);
  headerRow.appendChild(headerRowCol3);
  tagTable.appendChild(headerRow);

  let i = 0;
  while (i < numTags) {
    var newRow = document.createElement("tr");

    for (let j = 0; j < 3; j++) {
      if (i < numTags) {
        var newData = document.createElement("td");
        var newLink = document.createElement("a");
        newLink.innerHTML = testmodel.tags[i].name;
        newLink.setAttribute("href", "#");
        newLink.setAttribute("id", testmodel.tags[i].name);
        newLink.addEventListener("click", function () {
          filterThisTag(this.id);
        });
        newData.appendChild(newLink);

        var newDiv = document.createElement("div");
        newDiv.innerHTML =
          getNumQuestionsFromTagName(testmodel.tags[i].name) + " Questions";
        newData.appendChild(newDiv);
        newRow.appendChild(newData);
        i += 1;
      }
    }

    tagTable.appendChild(newRow);
  }

  tagTable.setAttribute("id", "tags");
  document.getElementById("main").appendChild(tagTable);
}

function openQuestionsTab() {
  var mainDiv = document.getElementById("main");
  while (mainDiv.firstChild) {
    main.removeChild(main.firstChild);
  }

  var formExist = document.getElementById("questionForm");
  if (formExist) {
    formExist.remove();
  }

  var formExist = document.getElementById("answerForm");
  if (formExist) {
    formExist.remove();
  }
  loadQuestions(testmodel.questions, "All Questions");

  const x = document.getElementById("showQuestionsButton");
  const y = document.getElementById("showTagsButton");
  if (x.classList.contains("notCurrentTab")) {
    x.classList.remove("notCurrentTab");
    x.classList.add("currentTab");
    y.classList.remove("currentTab");
    y.classList.add("notCurrentTab");
  }
}

function openTagsTab() {
  var mainDiv = document.getElementById("main");
  while (mainDiv.firstChild) {
    main.removeChild(main.firstChild);
  }
  var formExist = document.getElementById("questionForm");
  if (formExist) {
    formExist.remove();
  }
  var formExist = document.getElementById("answerForm");
  if (formExist) {
    formExist.remove();
  }

  loadTags();

  const x = document.getElementById("showTagsButton");
  const y = document.getElementById("showQuestionsButton");
  if (x.classList.contains("notCurrentTab")) {
    x.classList.remove("notCurrentTab");
    x.classList.add("currentTab");
    y.classList.remove("currentTab");
    y.classList.add("notCurrentTab");
  }
}

function openQuestionForm() {
  var mainDiv = document.getElementById("main");
  while (mainDiv.firstChild) {
    main.removeChild(main.firstChild);
  }
  const x = document.getElementById("showQuestionsButton");
  const y = document.getElementById("showTagsButton");
  x.classList.remove("currentTab");
  x.classList.add("notCurrentTab");
  y.classList.remove("currentTab");
  y.classList.add("notCurrentTab");
  askQuestion();
}

function askQuestion() {
  var questionForm = document.createElement("form");
  questionForm.setAttribute("id", "questionForm");
  questionForm.setAttribute("onsubmit", "addQuestion()");
  var newLabel = document.createElement("label");
  newLabel.setAttribute("for", "qTitle");
  var newDiv = document.createElement("div");
  newDiv.innerHTML = "Question Title";
  newLabel.appendChild(newDiv);
  newLabel.innerHTML += "Title should not be more than 100 characters.<br>";
  questionForm.appendChild(newLabel);
  var newTextarea = document.createElement("textarea");
  newTextarea.setAttribute("id", "qTitle");
  newTextarea.setAttribute("name", "qTitle");
  questionForm.appendChild(newTextarea);
  questionForm.innerHTML += "<br><br><br>";

  var newLabel = document.createElement("label");
  newLabel.setAttribute("for", "qText");
  var newDiv = document.createElement("div");
  newDiv.innerHTML = "Question Text";
  newLabel.appendChild(newDiv);
  newLabel.innerHTML += "Add Details.<br>";
  questionForm.appendChild(newLabel);

  var newTextarea = document.createElement("textarea");
  newTextarea.setAttribute("id", "qText");
  newTextarea.setAttribute("name", "qText");
  questionForm.appendChild(newTextarea);
  questionForm.innerHTML += "<br><br><br>";

  var newLabel = document.createElement("label");
  newLabel.setAttribute("for", "qTags");
  var newDiv = document.createElement("div");
  newDiv.innerHTML = "Tags";
  newLabel.appendChild(newDiv);
  newLabel.innerHTML += "Add Keywords separated by whitespace.<br>";
  questionForm.appendChild(newLabel);
  var newTextarea = document.createElement("textarea");
  newTextarea.setAttribute("id", "qTags");
  newTextarea.setAttribute("name", "qTags");
  questionForm.appendChild(newTextarea);
  questionForm.innerHTML += "<br><br><br>";

  var newLabel = document.createElement("label");
  newLabel.setAttribute("for", "qUser");
  newLabel.setAttribute("type", "text");
  var newDiv = document.createElement("div");
  newDiv.innerHTML = "Username";
  newLabel.appendChild(newDiv);
  newLabel.innerHTML += "Should not be more than 15 characters.<br>";
  questionForm.appendChild(newLabel);
  var newTextarea = document.createElement("textarea");
  newTextarea.setAttribute("id", "qUser");
  newTextarea.setAttribute("name", "qUser");
  questionForm.appendChild(newTextarea);
  questionForm.innerHTML += "<br><br>";

  var newButton = document.createElement("input");
  newButton.setAttribute("type", "button");
  newButton.value = "Post Question";

  newButton.setAttribute("id", "postQuestionButton");
  newButton.addEventListener("click", addQuestion);
  questionForm.appendChild(newButton);

  document.body.appendChild(questionForm);
}

function addQuestion() {
  var formTitle = document.getElementById("qTitle").value;
  var formText = document.getElementById("qText").value;
  var formTags = document.getElementById("qTags").value.split(" ");
  formTags = [...new Set(formTags)];
  formTags = formTags.filter(function (a) {
    return a.length > 0;
  });
  var formUser = document.getElementById("qUser").value;

  if (
    formTitle.length == 0 ||
    formTitle.length > 100 ||
    formText.length == 0 ||
    formTags.length == 0 ||
    formUser.length == 0 ||
    formUser.length > 15
  ) {
    var errorMsg = "";
    if (formTitle.length == 0) {
      errorMsg += "Question Title cannot be empty!<br>";
    }
    if (formTitle.length > 100) {
      errorMsg += "Question Title cannot be more than 100 characters!<br>";
    }
    if (formText.length == 0) {
      errorMsg += "Question Text cannot be empty!<br>";
    }
    if (formTags.length == 0) {
      errorMsg += "Tags cannot be empty!<br>";
    }
    if (formUser.length == 0) {
      errorMsg += "Username cannot be empty!<br>";
    }
    if (formUser.length > 15) {
      errorMsg += "Username cannot be more than 15 characters!<br>";
    }
    document.getElementById("main").innerHTML = errorMsg;
  } else {
    var currentDate = new Date();
    var year = currentDate.getFullYear();
    var month = currentDate.getMonth() + 1;
    var day = currentDate.getDate();
    var hour = currentDate.getHours();
    var min = currentDate.getMinutes();

    var newQuestion = {
      qid: "q" + (testmodel.questions.length + 1),
      title: formTitle,
      text: formText,
      tagIds: tagToTagId(formTags),
      askedBy: formUser,
      askedOn: monthToName(month) + " " + numberToTwoDigits(day) + ", " + year,
      askedAt: numberToTwoDigits(hour) + ":" + numberToTwoDigits(min),
      answers: [],
      views: 0,
    };

    testmodel.questions.unshift(newQuestion);
    openQuestionsTab();
  }
}

function monthToName(monthNumber) {
  if (monthNumber == 1) {
    return "Jan";
  }
  if (monthNumber == 2) {
    return "Feb";
  }
  if (monthNumber == 3) {
    return "Mar";
  }
  if (monthNumber == 4) {
    return "Apr";
  }
  if (monthNumber == 5) {
    return "May";
  }
  if (monthNumber == 6) {
    return "Jun";
  }
  if (monthNumber == 7) {
    return "July";
  }
  if (monthNumber == 8) {
    return "Aug";
  }
  if (monthNumber == 9) {
    return "Sep";
  }
  if (monthNumber == 10) {
    return "Oct";
  }
  if (monthNumber == 11) {
    return "Nov";
  }
  return "Dec";
}

function monthToNumber(monthName) {
  if (monthName == "Jan") {
    return 1;
  }
  if (monthName == "Feb") {
    return 2;
  }
  if (monthName == "Mar") {
    return 3;
  }
  if (monthName == "Apr") {
    return 4;
  }
  if (monthName == "May") {
    return 5;
  }
  if (monthName == "Jun") {
    return 6;
  }
  if (monthName == "Jul") {
    return 7;
  }
  if (monthName == "Aug") {
    return 8;
  }
  if (monthName == "Sep") {
    return 9;
  }
  if (monthName == "Oct") {
    return 10;
  }
  if (monthName == "Nov") {
    return 11;
  }
  return 12;
}

function numberToTwoDigits(number) {
  if (number < 10) {
    return "0" + number;
  }
  return number;
}

function tagToTagId(tagArray) {
  var newTags = [];
  tagArray.forEach((tagString) => {
    newTags.push(tagString);
  });
  testmodel.tags.forEach((tagObject) => {
    if (newTags.includes(tagObject.name)) {
      newTags = newTags.filter(function (a) {
        return a != tagObject.name;
      });
    }
  });
  newTags.forEach((tag) => {
    var createTag = {
      tid: "t" + (testmodel.tags.length + 1),
      name: tag,
    };
    testmodel.tags.push(createTag);
  });
  var tagIds = [];
  tagArray.forEach((tagName) => {
    testmodel.tags.forEach((tagObject) => {
      if (tagName == tagObject.name) {
        tagIds.push(tagObject.tid);
      }
    });
  });
  return tagIds;
}

function pressedEnter() {
  if (event.keyCode == 13) {
    var formExist = document.getElementById("questionForm");
    if (formExist) {
      formExist.remove();
    }

    var formExist = document.getElementById("answerForm");
    if (formExist) {
      formExist.remove();
    }
    const x = document.getElementById("showQuestionsButton");
    const y = document.getElementById("showTagsButton");
    x.classList.remove("currentTab");
    x.classList.add("notCurrentTab");
    y.classList.remove("currentTab");
    y.classList.add("notCurrentTab");
    var searchArray = document.getElementById("searchBox").value.split(" ");
    var questionsToLoad = [];
    for (let i = 0; i < searchArray.length; i++) {
      var searchTerm = searchArray[i];
      if (
        searchTerm.charAt(0) == "[" &&
        searchTerm.charAt(searchTerm.length - 1) == "]"
      ) {
        var cutSearchTerm = searchTerm.substring(1, searchTerm.length - 1);
        var lowerCutSearchTerm = cutSearchTerm.toLowerCase();
        testmodel.tags.forEach((tagObject) => {
          if (tagObject.name.toLowerCase() == lowerCutSearchTerm) {
            testmodel.questions.forEach((questionsObject) => {
              if (
                questionsObject.tagIds.includes(tagObject.tid) &&
                !questionsToLoad.includes(questionsObject)
              ) {
                questionsToLoad.push(questionsObject);
              }
            });
          }
        });
      } else {
        var lowerSearchTerm = searchTerm.toLowerCase();
        testmodel.questions.forEach((questionsObject) => {
          var splitTitle = questionsObject.title.split(" ");
          var splitText = questionsObject.text.split(" ");
          splitTitle.forEach((wordInTitle) => {
            splitTitle[splitTitle.indexOf(wordInTitle)] =
              wordInTitle.toLowerCase();
          });
          splitText.forEach((wordInText) => {
            splitText[splitText.indexOf(wordInText)] = wordInText.toLowerCase();
          });
          if (
            (splitTitle.includes(lowerSearchTerm) ||
              splitText.includes(lowerSearchTerm)) &&
            !questionsToLoad.includes(questionsObject)
          ) {
            questionsToLoad.push(questionsObject);
          }
        });
      }
    }
    loadQuestions(questionsToLoad, "Search Results");
  }
}

function getNumQuestionsFromTagName(tagName) {
  var tagIdOfTagName = "";
  testmodel.tags.forEach((tagObject) => {
    if (tagObject.name == tagName) {
      tagIdOfTagName = tagObject.tid;
    }
  });

  var numQuestionsWithTagName = 0;
  testmodel.questions.forEach((questionsObject) => {
    if (questionsObject.tagIds.includes(tagIdOfTagName)) {
      numQuestionsWithTagName++;
    }
  });
  return numQuestionsWithTagName;
}

function showThisQuestion(questionId, increment) {
  var mainDiv = document.getElementById("main");
  while (mainDiv.firstChild) {
    main.removeChild(main.firstChild);
  }

  var formExist = document.getElementById("questionForm");
  if (formExist) {
    formExist.remove();
  }

  var formExist = document.getElementById("answerForm");
  if (formExist) {
    formExist.remove();
  }

  const x = document.getElementById("showQuestionsButton");
  const y = document.getElementById("showTagsButton");
  x.classList.remove("currentTab");
  x.classList.add("notCurrentTab");
  y.classList.remove("currentTab");
  y.classList.add("notCurrentTab");
  var questionToShow = null;
  testmodel.questions.forEach((questionsObject) => {
    if (questionsObject.qid == questionId) {
      questionToShow = questionsObject;
    }
  });
  questionToShow.views += increment;

  var oneQuestionTable = document.createElement("table");
  var headerRow = document.createElement("tr");

  var headerRowCol1 = document.createElement("th");
  headerRowCol1.style.width = "20%";
  if (questionToShow.answers.length == 1) {
    headerRowCol1.innerHTML = questionToShow.answers.length + " Answer";
  } else {
    headerRowCol1.innerHTML = questionToShow.answers.length + " Answers";
  }
  headerRow.appendChild(headerRowCol1);

  var headerRowCol2 = document.createElement("th");
  headerRowCol2.style.width = "60%";
  headerRowCol2.innerHTML = questionToShow.title;
  headerRow.appendChild(headerRowCol2);

  var headerRowCol3 = document.createElement("th");
  headerRowCol3.style.width = "20%";
  var headerRowCol3Button = document.createElement("button");
  headerRowCol3Button.innerHTML = "Ask A Question";
  headerRowCol3Button.addEventListener("click", openQuestionForm);
  headerRowCol3.appendChild(headerRowCol3Button);
  headerRow.appendChild(headerRowCol3);
  oneQuestionTable.appendChild(headerRow);

  var newRow = document.createElement("tr");
  var newData = document.createElement("td");
  newData.classList.add("leftColumn");
  if (questionToShow.views == 1) {
    newData.innerHTML = questionToShow.views + " View";
  } else {
    newData.innerHTML = questionToShow.views + " Views";
  }
  newRow.appendChild(newData);

  var newData = document.createElement("td");
  newData.classList.add("centerColumn");
  newData.innerHTML = questionToShow.text;
  newRow.appendChild(newData);
  oneQuestionTable.appendChild(newRow);

  var newData = document.createElement("td");
  newData.classList.add("rightColumn");
  newData.innerHTML =
    "Asked By " +
    questionToShow.askedBy +
    "<br>On " +
    questionToShow.askedOn +
    "<br>At " +
    questionToShow.askedAt;
  newRow.appendChild(newData);

  oneQuestionTable.appendChild(newRow);

  var answersToShow = questionToShow.answers;
  answersToShow.forEach((ansId) => {
    testmodel.answers.forEach((answersObject) => {
      if (ansId == answersObject.aid) {
        var newRow = document.createElement("tr");

        var newData = document.createElement("td");
        newData.classList.add("leftColumn");
        newData.innerHTML = answersObject.text;
        newData.setAttribute("colspan", "2");
        newRow.appendChild(newData);

        var newData = document.createElement("td");
        newData.classList.add("rightColumn");
        newData.innerHTML =
          "Ans By " +
          answersObject.ansBy +
          "<br>On " +
          answersObject.ansOn +
          "<br>At " +
          answersObject.ansAt;
        newRow.appendChild(newData);

        oneQuestionTable.appendChild(newRow);
      }
    });
  });

  oneQuestionTable.setAttribute("id", "oneQuestion");
  document.getElementById("main").appendChild(oneQuestionTable);
  var newBreak = document.createElement("br");
  document.getElementById("main").appendChild(newBreak);
  var newButton = document.createElement("button");
  newButton.innerHTML = "Answer Question";
  newButton.setAttribute("id", "oneQuestionButton");
  newButton.addEventListener("click", function () {
    answerQuestion(questionId);
  });
  document.getElementById("main").appendChild(newButton);
}

function answerQuestion(questionId) {
  var mainDiv = document.getElementById("main");
  while (mainDiv.firstChild) {
    main.removeChild(main.firstChild);
  }

  var answerForm = document.createElement("form");
  answerForm.setAttribute("id", "answerForm");

  var newLabel = document.createElement("label");
  newLabel.setAttribute("for", "aText");
  var newDiv = document.createElement("div");
  newDiv.innerHTML = "Answer Text";
  newLabel.appendChild(newDiv);
  answerForm.appendChild(newLabel);

  var newTextarea = document.createElement("textarea");
  newTextarea.setAttribute("id", "aText");
  newTextarea.setAttribute("name", "aText");
  answerForm.appendChild(newTextarea);
  answerForm.innerHTML += "<br><br><br>";

  var newLabel = document.createElement("label");
  newLabel.setAttribute("for", "aUser");
  var newDiv = document.createElement("div");
  newDiv.innerHTML = "Username";
  newLabel.appendChild(newDiv);
  newLabel.innerHTML += "Should not be more than 15 characters.<br>";
  answerForm.appendChild(newLabel);

  var newTextarea = document.createElement("textarea");
  newTextarea.setAttribute("id", "aUser");
  newTextarea.setAttribute("name", "aUser");
  answerForm.appendChild(newTextarea);
  answerForm.innerHTML += "<br><br>";

  var newButton = document.createElement("input");
  newButton.setAttribute("type", "button");
  newButton.value = "Post Answer";

  newButton.setAttribute("id", "postAnswerButton");
  newButton.addEventListener("click", function () {
    addAnswer(questionId);
  });
  answerForm.appendChild(newButton);

  document.body.appendChild(answerForm);
}

function addAnswer(questionId) {
  var formText = document.getElementById("aText").value;
  var formUser = document.getElementById("aUser").value;

  if (formText.length == 0 || formUser.length == 0 || formUser.length > 15) {
    var errorMsg = "";
    if (formText.length == 0) {
      errorMsg += "Answer Text cannot be empty!<br>";
    }
    if (formUser.length == 0) {
      errorMsg += "Username cannot be empty!<br>";
    }
    if (formUser.length > 15) {
      errorMsg += "Username cannot be more than 15 characters!";
    }
    document.getElementById("main").innerHTML = errorMsg;
  } else {
    var currentDate = new Date();
    var year = currentDate.getFullYear();
    var month = currentDate.getMonth() + 1;
    var day = currentDate.getDate();
    var hour = currentDate.getHours();
    var min = currentDate.getMinutes();
    var newAid = "a" + (testmodel.answers.length + 1);

    var newAnswer = {
      aid: newAid,
      text: formText,
      ansBy: formUser,
      ansOn: monthToName(month) + " " + numberToTwoDigits(day) + ", " + year,
      ansAt: numberToTwoDigits(hour) + ":" + numberToTwoDigits(min),
    };

    testmodel.answers.push(newAnswer);
    testmodel.questions.forEach((questionObject) => {
      if (questionObject.qid == questionId) {
        questionObject.answers.unshift(newAid);
      }
    });

    showThisQuestion(questionId, 0);
  }
}

function filterThisTag(tagName) {
  var mainDiv = document.getElementById("main");
  while (mainDiv.firstChild) {
    main.removeChild(main.firstChild);
  }
  const x = document.getElementById("showQuestionsButton");
  const y = document.getElementById("showTagsButton");
  x.classList.remove("currentTab");
  x.classList.add("notCurrentTab");
  y.classList.remove("currentTab");
  y.classList.add("notCurrentTab");
  var questionsToLoad = [];
  var lowerTagName = tagName.toLowerCase();
  testmodel.tags.forEach((tagObject) => {
    if (tagObject.name.toLowerCase() == lowerTagName) {
      testmodel.questions.forEach((questionsObject) => {
        if (
          questionsObject.tagIds.includes(tagObject.tid) &&
          !questionsToLoad.includes(questionsObject)
        ) {
          questionsToLoad.push(questionsObject);
        }
      });
    }
  });

  loadQuestions(questionsToLoad, "Questions tagged [" + tagName + "]");
}

document
  .getElementById("showQuestionsButton")
  .addEventListener("click", openQuestionsTab);
document
  .getElementById("showTagsButton")
  .addEventListener("click", openTagsTab);
document.getElementById("searchBox").addEventListener("keyup", pressedEnter);
