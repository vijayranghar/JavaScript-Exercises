
const questionsList = [{
  question: '1 Orem ipsum dolor sit amet, consectetur adipisicing elit ?',
  answer: [
    {label:'a',option:'Dolor sit amet, consectetur adipisicing elit ?'},
    {label:'b',option:'Dolor sit amet, consectetur adipisicing elit ?'},
    {label:'c',option:'Dolor sit amet, consectetur adipisicing elit ?'},
    {label:'d',option:'Dolor sit amet, consectetur adipisicing elit ? '},
  ],
  correctAnswer: '6',
},{
  question: '2 Orem ipsum dolor sit amet, consectetur adipisicing elit ?',
  answer: [
    {label:'a',option:'Dolor sit amet, consectetur adipisicing elit ?'},
    {label:'b',option:'Dolor sit amet, consectetur adipisicing elit ?'},
    {label:'c',option:'Dolor sit amet, consectetur adipisicing elit ?'},
    {label:'d',option:'Dolor sit amet, consectetur adipisicing elit ?'},
  ],
  correctAnswer: '2',
},{
  question: '3 Orem ipsum dolor sit amet, consectetur adipisicing elit ?',
  answer: [
    {label:'a',option:'Dolor sit amet, consectetur adipisicing elit ?'},
    {label:'b',option:'Dolor sit amet, consectetur adipisicing elit ?'},
    {label:'c',option:'Dolor sit amet, consectetur adipisicing elit ?'},
    {label:'d',option:'Dolor sit amet, consectetur adipisicing elit ?'},
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
  let optionsElement= document.getElementsByClassName("option")
  console.log(optionsElement)
  //progress
  console.log(questionNumber)
  progress = ((questionNumber+1)/questionsList.length) * 100
  console.log(progress)

  let answer=[]
  let question=[]
  question.push(`<h4>${questionsList[questionNumber].question}</h4>
    <h6>QUESTION 0 OF 2</h6>`)
  questionsList[questionNumber].answer.forEach((item,index) => {
    answer.push(`<div class="option"><div class="label">
    ${item.label}<input value=${item.option} name=${questionNumber} type="radio"/></div>
    <div class="option-item">${item.option}</div></div>`)
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
  console.log(answers)
}


let counter = 0
let progress = 0
let submitButton = document.getElementById("submitButton")
let startTestButton = document.getElementById("startTestButton")
let nextButton = document.getElementById("nextButton")
let questionsElement = document.getElementById("questions")
let progressBar =  document.getElementById("progress")



//startTestButton.addEventListener('click', renderInitialQuestion)
window.onLoad = renderInitialQuestion()
submitButton.addEventListener('click', showResult)
nextButton.addEventListener('click', showNextQuestion)
