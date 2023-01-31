const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const movesText = document.querySelector('#moves');
const scoreText = document.querySelector('#score');
const lifeText = document.querySelector('#life');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let moves = 1
let score = 0
let life =3
let questionCounter = 0
let availableQuestions = []

let questions = [
    {
	question: "If NOIDA is written as OPJEB, then what will be the code for DELHI?",
	choice1: "EFMAK",
	choice2: "EFAMK",
	choice3: "EFMIJ",
	choice4: "EFMIK",
	answer: 3,
    },
    {
	question: "If AIRLINE is written as ENILRIA7, then RAILWAY will be written as",
	choice1: "YAWLIAR7",
	choice2: "YAWLIAR8",
	choice3: "YAWILAR7",
	choice4: "YAWILAR8",
	answer: 1,
    },
    {
	question: " If CAT is coded as PATC, JOY is coded as POYJ; similarly the word WING will be coded as",
	choice1: "PIGNW",
	choice2: "PINGW",
	choice3: "PGNIW",
	choice4: "PIWGN",
	answer: 2,
    },
    {
	question: "Which number should come next in the series 1, 2, 3, 10, ___",
	choice1: "79",
	choice2: "99",
	choice3: "89",
	choice4: "98",
	answer: 2,
    },
    {
	question: "Which number is wrong in the series 2, 6, 15, 31, 56, 93?",
	choice1: "6",
	choice2: "31",
	choice3: "56",
	choice4: "93",
	answer: 4,
    },
    {
	question: "The number comes next in the series 12, 36, 109, 329, ... -",
	choice1: "900",
	choice2: "990",
	choice3: "890",
	choice4: "None of the above",
	answer: 2,
    },
    {
	question: " Suppose a series is 6, 11, 21, 36, 56, ? the number comes at the place of question mark in the given series is -",
	choice1: "94",
	choice2: "21",
	choice3: "52",
	choice4: "81",
	answer: 4,
    },
    {
	question: "Suppose a series is 1, 9, 25, 49, ?, 121, the number comes at the place of question mark in the given series is -",
	choice1: "91",
	choice2: "21",
	choice3: "52",
	choice4: "81",
	answer: 4,
    },
    {
	question: "The number comes after the series 8, 28, 116, 584, ...... -",
	choice1: "3506",
	choice2: "3507",
	choice3: "3508",
	choice4: "3509",
	answer: 3,
    },
    {
	question: "What will be the next number in the series 13, 17, 19, 23, 29, .......?",
	choice1: "31",
	choice2: "33",
	choice3: "35",
	choice4: "37",
	answer: 1,
    },
    {
	question: "What will be the missing number in the series 196, 169, 144, __, 100, 81?",
	choice1: "121",
	choice2: "120",
	choice3: "119",
	choice4: "118",
	answer: 1,
    },
    {
	question: "If PINK is coded as 1691411, then RED will be coded as -",
	choice1: "1963",
	choice2: "1854",
	choice3: "1853",
	choice4: "1945",
	answer: 2,
    },
    {
	question: "Which of the following is the odd one from the given alternatives?",
	choice1: "Driving",
	choice2: "Diving",
	choice3: "Swimming",
	choice4: "Sailing",
	answer: 1,
    },
    {
	question: "Which of the following is the odd number from the given alternatives?",
	choice1: "1090",
	choice2: "962",
	choice3: "626",
	choice4: "841",
	answer: 4,
    },
    {
	question: "Hypsiphobia: Height :: Hylophobia: ?",
	choice1: "Forests",
	choice2: "Animals",
	choice3: "Water",
	choice4: "All of the above",
	answer: 1,
    },
    {
	question: "The day before yesterday was Saturday. What will be the day after tomorrow?",
	choice1: "Thursday",
	choice2: "Friday",
	choice3: "Wednesday",
	choice4: "Monday",
	answer: 3,
    },
    {
	question: "A book always has -",
	choice1: "Pages",
	choice2: "Story",
	choice3: "Binding",
	choice4: "Content",
	answer: 1,
    },
    {
	question: "Drama : Stage :: Tennis : ?",
	choice1: "Net",
	choice2: "Court",
	choice3: "Tournament",
	choice4: "Racket",
	answer: 2,
    },
    {
	question: "If the word 'LION' is coded as LMGJ. How is 'MILK' written in that code?",
	choice1: "JKFL",
	choice2: "KLIM",
	choice3: "KILM",
	choice4: "IJGK",
	answer: 4,
    },
    {
	question: "Which of the following is different from others?",
	choice1: "Barber",
	choice2: "Blacksmith",
	choice3: "Tailor",
	choice4: "Carpenter",
	answer: 1,
    },
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 20



//Modal

// Get the modal


// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];


// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}






startGame = () => {
    questionCounter = 0
    moves = 1
    score = 0
    life = 3
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)
	localStorage.setItem('mostRecentMoves', moves)
        return window.location.assign('end.html')
    }

    questionCounter++
    progressText.innerText = `Level ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`
    
    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }
	if(classToApply === 'incorrect'){
	    decrementLife(1)
	}

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
		let fg = Math.floor(Math.random() * 100) + 1;
		if(fg >= 50){
			incrementMoves(1)
			getNewQuestion();
		}
                else{
			incrementMoves(1)
			modal.style.display = "block";
			incrementMoves(1)
			getNewQuestion();
		}
        }, 1000)
    })
})



incrementScore = num => {
    score +=num
    scoreText.innerText = score
}
decrementLife = num =>{
    life -=num
    lifeText.innerText = life
    if(life==0){
	localStorage.setItem('mostRecentScore', score)
	localStorage.setItem('mostRecentMoves', moves)
        return window.location.assign('end.html')
    }
}

incrementMoves = num => {
    moves +=num
    movesText.innerText = moves
}
startGame()