(function() {
  const questionsList = [{
    question: 'new String("This is a string") instanceof String; What is the result ?',
    answer: [
      {label:'a', option:'true', value:"true"},
      {label:'b', option:'false', value:"false"},
      {label:'c', option:'TypeError', value:"TypeError"},
    ],
    correctAnswer:'true',
  },{
    question: 'NaN === NaN',
    answer: [
      {label:'a', option:'true', value:"true"},
      {label:'b', option:'false', value:"false"},
      {label:'c', option:'TypeError' ,value:"TypeError"},
    ],
    correctAnswer:'false',
  },{
    question: `Does setting margin-top and margin-bottom have an affect on an inline element?`,
    answer: [
      {label:'a', option:'Yes', value:'Yes'},
      {label:'b', option:'No', value:'No'},
    ],
    correctAnswer:'No',
  },{
    question:'The pseudo class :checked will select inputs with type radio or checkbox, but not &#60;option&#62; elements.',
    answer: [
      {label:'a', option:'true', value:'true'},
      {label:'b', option:'false', value:'false'},
    ],
    correctAnswer:'false',
  },
  {
    question: '10 > 9 > 8 === true;',
    answer: [
      {label:'a', option:'true', value:"true"},
      {label:'b', option:'false', value:"false"},
    ],
    correctAnswer:'false',
  },
]

  function renderQuestion(questionNumber) {
    let optionsElement = document.getElementsByClassName("option")
    let progressHeading = document.getElementById("progress")
    let progressBar = document.querySelector(".progress-bar")

    nextButton.classList="is-visible"
    submitButton.classList="is-hidden"

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
      let listItem = document.createElement("li")
      question.push(`<h4>${questionsList[questionNumber].question}</h4>
        <h6>QUESTION ${questionNumber+1} OF ${questionsList.length}</h6>`)
      questionsList[questionNumber].answer.forEach((item,index) => {
        answer.push(`<label class="option"><div class="input-radio">
        <span>${item.label}</span><input value=${item.value} name=${questionNumber} type="radio"/></div>
        <div class="option-item">${item.option}</div></label>`)
      })
      questionsElement.innerHTML = ""
      questionsElement.appendChild(listItem)
      listItem.innerHTML = `${[...question,...answer].join('')}`
      setTimeout( () => {
        listItem.classList = "animate"
      }, 30)
    }
    else {
      questionsElement.innerHTML= `<div class="submit-text"><h2>Do you really want to submit ?</h2></div>`
      nextButton.classList="is-hidden"
      submitButton.classList="is-visible"
    }
  }

  //render next question
  function showNextQuestion() {
    formResult.push(document.querySelector('#questions li input[type="radio"]:checked'))
    counter += 1
    renderQuestion(counter)
  }

  //render Previous question
  function showPreviousQuestion() {
    formResult.pop()
    counter -= 1
    renderQuestion(counter)
  }

  function showResult(e) {
    e.preventDefault()
    let formElement = document.querySelector("form")
    formElement.innerHTML = ""
    let score = 0
    console.log(formResult)
    formResult.forEach((item,index) => {
      score += (item && item.value === questionsList[index].correctAnswer) ? 1 : 0
    })
    formElement.innerHTML = `<div class="result"><h2>You scored ${score} marks!!!!</h2></div>`
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
  let formResult = []
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
