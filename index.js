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
  },]

  // render first question
  function renderInitialQuestion () {
    nextButton.classList.toggle('is-visible')
    renderQuestion(counter)
  }


  function renderQuestion(questionNumber) {
    let optionsElement = document.getElementsByClassName("option")
    let progressHeading = document.getElementById("progress")

    progress = ((questionNumber+1)/questionsList.length) * 100
    progressHeading.innerHTML=`${progress.toFixed()}%`

    let answer=[]
    let question=[]
    question.push(`<h4>${questionsList[questionNumber].question}</h4>
      <h6>QUESTION 0 OF 2</h6>`)
    questionsList[questionNumber].answer.forEach((item,index) => {
      answer.push(`<label class="option"><div class="input-radio">
      <span>${item.label}</span><input value=${item.option} name=${questionNumber} type="radio"/></div>
      <div class="option-item">${item.option}</div></label>`)
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

  function highlightSelected(e) {
    let target = e.target
    switch (target.className) {
      case "option":
        if(target.previousSibling && target.previousSibling.classList.contains("selected"))
          target.previousSibling.classList.remove("selected")
        if(target.nextSibling && target.nextSibling.classList.contains("selected"))
          target.nextSibling.classList.remove("selected")
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
  let questionsElement = document.getElementById("questions")
  let progressBar =  document.getElementById("progress")


  //startTestButton.addEventListener('click', renderInitialQuestion)
  window.onLoad = renderInitialQuestion()
  submitButton.addEventListener('click', showResult)
  nextButton.addEventListener('click', showNextQuestion)
  questionsElement.addEventListener("click", highlightSelected)
})()
