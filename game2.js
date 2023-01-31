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
	question: "Which province of Afghanistan is the highest opium producer?",
	choice1: "Helmand",
	choice2: "Baghlan",
	choice3: "Jalalabad",
	choice4: "Kunar",
	answer: 1,
    },
    {
	question: "The Euro currency is used by ________ countries.",
	choice1: "16",
	choice2: "18",
	choice3: "19",
	choice4: "20",
	answer: 4,
    },
    {
	question: "Yellow Sea lies between __________.",
	choice1: "America and Canada",
	choice2: "England and France",
	choice3: "China and Korea",
	choice4: "Norway and Sweden",
	answer: 3,
    },
    {
	question: "The smallest Sea of the World is __________.",
	choice1: "Dead Sea",
	choice2: "Red Sea",
	choice3: "Baltic Sea",
	choice4: "Arabian Sea",
	answer: 3,
    },
    {
	question: "What was the nationality of Alfred Nobel?",
	choice1: "American",
	choice2: "British",
	choice3: " German",
	choice4: " Swedish",
	answer: 4,
    },
    {
	question: "SANA is the news agency of _________.",
	choice1: "Saudi Arabia",
	choice2: "UAE",
	choice3: "Syria",
	choice4: "Yemen",
	answer: 3,
    },
    {
	question: "Saba is the news agency of _________.",
	choice1: "Indonesia",
	choice2: "Yemen",
	choice3: "Syria",
	choice4: "Jordan",
	answer: 2,
    },
    {
	question: "The second Largest Continent (by Area) of the World is __________?",
	choice1: "Asia",
	choice2: "Europe",
	choice3: "Africa",
	choice4: "North America",
	answer: 3,
    },
    {
	question: "The biggest Island of the World is _________.",
	choice1: "Iceland",
	choice2: "Greenland",
	choice3: "England",
	choice4: " Sri Lanka",
	answer: 2,
    },
    {
	question: "The headquarter of Transparency International is in _________.",
	choice1: "Amserdam",
	choice2: "Geneva",
	choice3: "London",
	choice4: "Berlin",
	answer: 4,
    },
    {
	question: "The headquarter of Red Cross is in _________?",
	choice1: "New York",
	choice2: "Washington",
	choice3: "Geneva",
	choice4: "The Hague",
	answer: 3,
    },
    {
	question: "The motto of UNO is _________?",
	choice1: "It’s your world!",
	choice2: "Life for All!",
	choice3: "Peace!",
	choice4: "Love and Peace!",
	answer: 1,
    },
    {
	question: "The European Union’s working capital is in _________.",
	choice1: "London",
	choice2: "Lisbon",
	choice3: "Brussels",
	choice4: " Austria",
	answer: 3,
    },
    {
	question: "The currency of Indonesia is _________?",
	choice1: "rupiah",
	choice2: "dinar",
	choice3: "ringgit",
	choice4: " riyal",
	answer: 1,
    },
    {
	question: "Name the only secretary general of UN who resigned from his post?",
	choice1: "Mrs Vijay Lakshmi pandit",
	choice2: "Trygve Lie",
	choice3: "Kofi Annan",
	choice4: "U. Thant",
	answer: 2,
    },
    {
	question: "There are _________ non-permanent members of the security council.",
	choice1: "5",
	choice2: "7",
	choice3: "10",
	choice4: "15",
	answer: 3,
    },
    {
	question: "The deepest part of the Earth is __________ .",
	choice1: "Dead Sea",
	choice2: "Mariana Trench",
	choice3: "South Africa",
	choice4: "South Pole",
	answer: 2,
    },
    {
	question: "The highest part of the Earth is __________ .",
	choice1: "Mount Everest",
	choice2: "K2",
	choice3: "Norway",
	choice4: "North Pole",
	answer: 1,
    },
    {
	question: "The permanent Secretariat of OIC is located in _________.",
	choice1: "Makkah",
	choice2: "Madina",
	choice3: "Jeddah",
	choice4: "Riyadh",
	answer: 3,
    },
    {
	question: "The currency of Israel is _________.",
	choice1: "Euro",
	choice2: "Shekel",
	choice3: "Forint",
	choice4: "Krone",
	answer: 2,
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