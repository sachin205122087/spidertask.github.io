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
	question: "zero is a__________ number?",
	choice1: "odd number",
	choice2: "even number",
	choice3: "whole number",
	choice4: "None of these",
	answer: 3,
    },
    {
	question: "A Sextillion has_________zeros?",
	choice1: "15 zeros",
	choice2: "18 zeros",
	choice3: "21 zeros",
	choice4: "24 zeros",
	answer: 3,
    },
    {
	question: "A Quadrillion has _________ zeros?",
	choice1: "15 zeros",
	choice2: "18 zeros",
	choice3: "21 zeros",
	choice4: "23 zeros",
	answer: 1,
    },
    {
	question: "Who is known as the Father of Geometry?",
	choice1: "Kepler",
	choice2: "Euclid",
	choice3: "Pythagoras",
	choice4: "Newton",
	answer: 2,
    },
    {
	question: "What is 2+2÷2×2-2?",
	choice1: "0",
	choice2: "-2",
	choice3: "2",
	choice4: "1",
	answer: 3,
    },
    {
	question: "If a > b and b > a. Then ?",
	choice1: "a=b",
	choice2: "Cannot be evaluated",
	choice3: "a!=b",
	choice4: "None",
	answer: 2,
    },
    {
	question: "18 men can eat 20 kg of rice in 3 days. How long will 6 men take to eat 40 kg of rice?",
	choice1: "19",
	choice2: "18",
	choice3: "32",
	choice4: "20",
	answer: 2,
    },
    {
	question: "If 25 men can eat 150 kg of wheat in 30 days then 45 men can eat 450 kg of wheat in how many days?",
	choice1: "13 days",
	choice2: "50 days",
	choice3: "15 days",
	choice4: "18 days",
	answer: 2,
    },
    {
	question: " In a fort there is sufficient food for 600 men for a month. If 400 more men arrive the fort then how long the food is sufficient for now?",
	choice1: "20 days",
	choice2: "18 days",
	choice3: "28 days",
	choice4: "36 days",
	answer: 2,
    },
    {
	question: " In a fort the food was sufficient for two months. After half a month",
	choice1: "1.5 months",
	choice2: "40 days",
	choice3: "2 months",
	choice4: "50 days",
	answer: 4,
    },
    {
	question: "5kg food is consumed by 50 chickens in 2 days. 60 chickens will consume how much food in 6 days",
	choice1: "2 kg",
	choice2: "6 kg",
	choice3: "15 kg",
	choice4: "18 kg",
	answer: 4,
    },
    {
	question: "15 cattle can graze a field in 20 days 20 cattle can graze 3 such field in how many days?",
	choice1: "30",
	choice2: "45",
	choice3: "60",
	choice4: "50",
	answer: 2,
    },
    {
	question: "A family of 12 people had enough provision for 15 days. But 3 guests came for 2 days. How long the provisions will last for?",
	choice1: "8",
	choice2: "15",
	choice3: "12",
	choice4: "12.5",
	answer: 4,
    },
    {
	question: "A garrison has provision for 30 days for certain men. If 2/3 of them do not attend the mess then the food will last for?",
	choice1: "50 days",
	choice2: "90 days",
	choice3: "65 days",
	choice4: "55 days",
	answer: 2,
    },
    {
	question: "25 men can consume 250kg of wheat in 20 days. 20 men cang consume how much wheat in 25 days?",
	choice1: "300",
	choice2: "200",
	choice3: "250",
	choice4: "350",
	answer: 3,
    },
    {
	question: "18 cattle graze a field in 12 days. 6 cattle can graze 3 of such fields in x days. What is x?",
	choice1: "90",
	choice2: "72",
	choice3: "36",
	choice4: "108",
	answer: 4,
    },
    {
	question: "If 12 members family spend Rs. 850 in 10 days. Then a family of 8 people will spend Rs. 340 in how many days.",
	choice1: "8",
	choice2: "7",
	choice3: "6",
	choice4: "5",
	answer: 3,
    },
    {
	question: "A shopkeeper marks his goods 20% above cost price, but allows 30% discount for cash payment. His net loss is ?",
	choice1: "8%",
	choice2: "10%",
	choice3: "16%",
	choice4: "18%",
	answer: 3,
    },
    {
	question: "If the true discount on s sum due 2 years hence at 14% per annum be Rs. 168, the sum due is:________?",
	choice1: "Rs. 768",
	choice2: "Rs. 968",
	choice3: "Rs. 798",
	choice4: "Rs. 7667",
	answer: 1,
    },
    {
	question: "The present worth of Rs. 1404 due in two equal half-yearly installments at 8% per annul simple interest is:",
	choice1: "RS 1325",
	choice2: "RS 1300",
	choice3: "RS 1350",
	choice4: "RS 1500",
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