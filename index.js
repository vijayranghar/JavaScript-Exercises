(function() {
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
  },{
    question: '4 Orem ipsum dolor sit amet, consectetur adipisicing elit ?',
    answer: [
      {label:'a',option:'Dolor sit amet, consectetur adipisicing elit ?'},
      {label:'b',option:'Dolor sit amet, consectetur adipisicing elit ?'},
      {label:'c',option:'Dolor sit amet, consectetur adipisicing elit ?'},
      {label:'d',option:'Dolor sit amet, consectetur adipisicing elit ?'},
    ],
    correctAnswer: '1',
  },
  {
    question: '5 Orem ipsum dolor sit amet, consectetur adipisicing elit ?',
    answer: [
      {label:'a',option:'Dolor sit amet, consectetur adipisicing elit ?'},
      {label:'b',option:'Dolor sit amet, consectetur adipisicing elit ?'},
      {label:'c',option:'Dolor sit amet, consectetur adipisicing elit ?'},
      {label:'d',option:'Dolor sit amet, consectetur adipisicing elit ?'},
    ],
    correctAnswer: '1',
  },
]

  function renderQuestion(questionNumber) {
    let optionsElement = document.getElementsByClassName("option")
    let progressHeading = document.getElementById("progress")
    let progressBar = document.querySelector(".progress-bar")

    nextButton.classList="is-visible"
    submitButton.classList="is-hidden"

    console.log(counter, "inside render que")
    if(questionNumber===0) {
      previousButton.classList+= "is-disable"
    }
    else {
      previousButton.classList.remove("is-disable")
    }
    if(questionNumber < questionsList.length) {
      progress = ((questionNumber+1)/questionsList.length) * 100
      progressHeading.innerHTML=`${progress.toFixed()}%`
      progressBar.style.width=`${progress.toFixed()}%`
      let answer=[]
      let question=[]
      question.push(`<h4>${questionsList[questionNumber].question}</h4>
        <h6>QUESTION ${questionNumber+1} OF ${questionsList.length}</h6>`)
      questionsList[questionNumber].answer.forEach((item,index) => {
        answer.push(`<label class="option"><div class="input-radio">
        <span>${item.label}</span><input value=${item.option} name=${questionNumber} type="radio"/></div>
        <div class="option-item">${item.option}</div></label>`)
      })
      questionsElement.innerHTML = `<li>${[...question,...answer].join('')}</li>`
    }
    else {
      questionsElement.innerHTML= "SUBMIT"
      nextButton.classList="is-hidden"
      submitButton.classList="is-visible"
    }
  }

  //render next question
  function showNextQuestion() {
    counter += 1
    console.log(counter, "inside show next")
    renderQuestion(counter)
  }

  //render Previous question
  function showPreviousQuestion() {
    counter -= 1
    renderQuestion(counter)
  }

  function showResult(e) {
    e.preventDefault()
    let score = 0
    let answers = document.querySelectorAll('#questions li input[type="radio"]:checked')
    answers.forEach((item,index) => {
      score += (item.value === questionsList[index].correctAnswer) ? 1 : 0
    })
    alert("score is = ",score)
  }

  function highlightSelected(e) {
    let target = e.target
    switch (target.className) {
      case "option":
        if(document.querySelectorAll(".option")) {
          document.querySelectorAll(".option").forEach((item) => {
           if(item.classList.contains("selected"))
            item.classList.remove("selected")
        })}
        target.className += " selected"
        break;
      case "option-item":
        if(document.querySelectorAll(".option")) {
          document.querySelectorAll(".option").forEach((item) => {
           if(item.classList.contains("selected"))
            item.classList.remove("selected")
        })}
        target.closest(".option").className += " selected"
        break;
      default:
    }
  }

  let counter = 0
  let progress = 0
  let submitButton = document.getElementById("submitButton")
  let nextButton = document.getElementById("nextButton")
  let previousButton = document.getElementById("previousButton")
  let questionsElement = document.getElementById("questions")


  //startTestButton.addEventListener('click', renderInitialQuestion)
  window.onLoad = renderQuestion(counter)
  submitButton.addEventListener('click', showResult)
  nextButton.addEventListener('click', showNextQuestion)
  previousButton.addEventListener('click', showPreviousQuestion)
  questionsElement.addEventListener("click", highlightSelected)
})()
