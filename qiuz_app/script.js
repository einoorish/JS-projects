const quizData = [
  {
    question: "George Orwell wrote this book, which is often considered a statement on government oversight.",
    a:"The Old Man and the Sea",
    b:"1984",
    c:"Catcher and the Rye",
    correct:"b"
  },
  {
    question: 'Which famous book is sub-titled "The Modern Prometheus"?',
    a:"Frankenstein",
    b:"Dracula",
    c:"The Legend of Sleepy Hollow",
    correct:"a"
  },
  {
    question: 'Who wrote the novel "Fear And Loathing In Las Vegas"?',
    a:"Hunter S. Thompson",
    b:"F. Scott Fitzgerald",
    c:"Henry Miller",
    correct:"a"
  },
  {
    question: "Under what pseudonym did Stephen King publish five novels between 1977 and 1984?",
    a:"J. D. Robb",
    b:"Mark Twain",
    c:"Richard Bachman",
    correct:"c"
  },
  {
    question: "What is the name of the three headed dog in Harry Potter and the Sorcerers Stone?",
    a:"Spike",
    b:"Fluffy",
    c:"Poofy",
    correct:"b"
  }
];

let score = 0;
let currentQuestion = 0;

const quiz = document.querySelector(".quiz-container");
const question = document.getElementById("question");
const answers = document.getElementsByName("answer");
const a_text = document.getElementById("a_text");
const b_text = document.getElementById("b_text");
const c_text = document.getElementById("c_text");
const submit = document.getElementById("submit");

loadQuiz();

function loadQuiz(){
  const currentData = quizData[currentQuestion];
  question.innerHTML = currentData.question;
  a_text.innerHTML = currentData.a;
  b_text.innerHTML = currentData.b;
  c_text.innerHTML = currentData.c;
}

function getSelectedAnswer(){
  let selection = undefined;
  answers.forEach((answer) => {
    if(answer.checked)
      selection = answer.id;
  });
  return selection;
}

function deselectAnswers(){
  answers.forEach((answer) => {
    answer.checked = false;
  });
}

submit.addEventListener("click", ()=>{
  const answer = getSelectedAnswer();
  if (answer) {
    if (answer === quizData[currentQuestion].correct) {
      score++;
    }
    currentQuestion++;
    if(currentQuestion < quizData.length){
      loadQuiz();
    } else{
      quiz.innerHTML = "<h2>Your score is "+score+"/"+quizData.length+"</h2><button onclick='location.reload()'>Restart</button>";
    }
  }
  deselectAnswers();
})
