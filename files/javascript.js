class Question{
    constructor(text,choices,answer){
        this.text=text;
        this.choices=choices;
        this.answer=answer;

    }

    correctAnswer(choice){
        return choice==this.answer;

    }
}

class Quiz {
    constructor(questions, time) {
      this.score = 0;
      this.questions = questions;
      this.questionIndex = 0;
      this.time = time;
      this.timer = null;
      this.remainingTime = time;
    }
  
    startTimer(callback) {
        const that = this;
        this.timer = setInterval(function() {
          that.remainingTime--;
          if (that.remainingTime <= 0) {
            clearInterval(that.timer);
            callback();
          }
        }, 1000);
      }
  
    getQuestionIndex() {
      return this.questions[this.questionIndex];
    }
  
    isEnded() {
      return this.questionIndex === this.questions.length;
    }
  
    
  }

  function Display() {
    if (quiz.isEnded()) {
      showScores();
    } else {
      //show question
      var element = document.getElementById("question");
      element.innerHTML = quiz.getQuestionIndex().text;
  
      //show choices
      var choices = quiz.getQuestionIndex().choices;
      for (let i = 0; i < choices.length; i++) {
        var element = document.getElementById("choice" + i);
        element.innerHTML = choices[i];
        guess("btn" + i, choices[i]);
      }
      showProgress();
    }
    // start timer when quiz is displayed
    if (!quiz.timer) {
      quiz.startTimer(() => {
        showScores();
      });
    }
  }
  function guess(id, guess) {
    var button = document.getElementById(id);
    button.onclick = function() {
      let currentQuestion = quiz.getQuestionIndex();
      if (currentQuestion.correctAnswer(guess)) {
        quiz.score++;
      }
      quiz.questionIndex++;
      Display();
    }
  }
function showProgress(){
    var currentQuestionNumber = quiz.questionIndex+1;
    var element = document.getElementById("progress")
    element.innerHTML= " Question " +currentQuestionNumber + " of " +quiz.questions.length;
}

function showScores() {
    clearInterval(quiz.timer); // stop the timer
    var gameOverHtml = "<h1>Result</h1>";
    gameOverHtml += "<h2 id='score'> Your scores: " + quiz.score + "</h2>" + "<p>Time remaining: " + quiz.remainingTime + " seconds</p>";
    var element = document.getElementById("quiz");
    element.innerHTML = gameOverHtml;
  }

let questions =[
    new Question("Q1: What is the full form of CSS?",["Cascading Style Sheets"," Cartoon Style Sheets","Cascading style Sheep","Cascading Super Sheet"],"Cascading Style Sheets"),
    new Question("Q2: HTML documents are saved in?",["Machine language codes","ASCII text","Special Binary format","None of these"],"ASCII text"),
    new Question("Q3: DOM stands for",["Document Object Model","Data Object Model","Document Oriented Model","Data oriented model"],"Document Object Model"),
    new Question("Q1: When creating a Web document, what format is used to express an image's height and width",["Pixels","Centimeters","Dot per inch","Inches"],"Pixels")

];

var quiz=new Quiz(questions,30);

Display();
