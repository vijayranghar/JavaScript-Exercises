
const questionsList = [{
  question: '3*2=',
  answer: [
    {label:'a',option:'6'},
    {label:'b',option:'3'},
    {label:'c',option:'8'},
    {label:'d',option:'2'},
  ],
  correctAnswer: '6',
},{
  question: '1+1=',
  answer: [
    {label:'a',option:'2'},
    {label:'b',option:'3'},
    {label:'c',option:'1'},
    {label:'d',option:'11'},
  ],
  correctAnswer: '2',
},{
  question: '5-4=',
  answer: [
    {label:'a',option:'5'},
    {label:'b',option:'4'},
    {label:'c',option:'1'},
    {label:'d',option:'2'},
  ],
  correctAnswer: '1',
},]

// render first question
function renderInitialQuestion () {
  startTestButton.classList.toggle('is-hidden')
  nextButton.classList.toggle('is-visible')
  renderQuestion(counter)
}


function renderQuestion(questionNumber) {
  //progress
  console.log(questionNumber)
  progress = ((questionNumber+1)/questionsList.length) * 100
  console.log(progress)

  let answer=[]
  let question=[]
  question.push(`<h4>${questionsList[questionNumber].question}</h4>`)
  questionsList[questionNumber].answer.forEach((item,index) => {
    answer.push(`<label>${item.label}</label>&nbsp;
    <input value=${item.option} name=${questionNumber} type="radio"/>&nbsp;
    <strong>${item.option}</strong>&nbsp;&nbsp;`)
  })
  questionsElement.innerHTML = `<li>${[...question,...answer].join('')}</li>`
}

//render next question
function showNextQuestion() {
  if(counter < questionsList.length-1) {
    counter += 1
  }
  else {
    nextButton.className+="is-hidden"
    submitButton.classList.toggle('is-visible')
    questionsElement.innerHTML='<li>finished</li>'
    return
  }
  renderQuestion(counter)
}

function showResult(e) {
  e.preventDefault()
  let score = 0
  let answers = document.querySelectorAll('#questions li input[type="radio"]:checked')
  answers.forEach((item,index) => {
    score += (item.value === questionsList[index].correctAnswer) ? 1 : 0
  })
}


let counter = 0
let progress = 0
let submitButton = document.getElementById("submitButton")
let startTestButton = document.getElementById("startTestButton")
let nextButton = document.getElementById("nextButton")
let questionsElement = document.getElementById("questions")
let progressBar =  document.getElementById("progress")

startTestButton.addEventListener('click', renderInitialQuestion)
submitButton.addEventListener('click', showResult)
nextButton.addEventListener('click', showNextQuestion)
