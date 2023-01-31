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
        question: "In Operating Systems, which of the following is/are CPU scheduling algorithms?",
        choice1: "Priority",
        choice2: "Round Robin",
        choice3: "Shortest Job First",
        choice4: "All of the mentioned",
        answer: 4,
    },
    {
        question: "To access the services of the operating system, the interface is provided by the ___________",
        choice1: "Library",
        choice2: "System calls",
        choice3: "Assembly instructions",
        choice4: "API",
        answer: 2,
    },
    {
        question: "Cascading termination refers to the termination of all child processes if the parent process terminates ______",
        choice1: "Normally or abnormally",
        choice2: "Abnormally",
        choice3: "Normally",
        choice4: "None of the mentioned",
        answer: 1,
    },
    {
        question: "A connected planar graph having 6 vertices, 7 edges contains ____ regions.",
        choice1: "15",
        choice2: "3",
        choice3: "1",
        choice4: "11",
        answer: 2,
    },
    {
        question: "If a simple graph G, contains n vertices and m edges, the number of edges in the Graph G dash Complement of G is _____",
        choice1: "(n*n-n-2*m)/2",
        choice2: "(n*n+n+2*m)/2",
        choice3: "(n*n-n-2*m)/2",
        choice4: "(n*n-n+2*m)/2",
        answer: 1,
    },
    {
        question: "What is the maximum number of edges in a bipartite graph having 10 vertices?",
        choice1: "24",
        choice2: "21",
        choice3: "25",
        choice4: "16",
        answer: 3,
    },
    {
        question: "A graph with all vertices having equal degree is known as a _______",
        choice1: "Multi Graph",
        choice2: "Regular Graph",
        choice3: "Simple Graph",
        choice4: "Complete Graph",
        answer: 2,
    },
    {
	question: "What is the minimum distance required for single error detection according to Hamming’s analysis in Digital Electronics?",
	choice1: "1",
	choice2: "2",
	choice3: "3",
	choice4: "4",
	answer: 2,
    },
    {
	question: "Which of these error-detecting codes enables to find double errors in Digital Electronic devices?",
	choice1: "Parity method",
	choice2: "Check sum method",
	choice3: "Bit generation method",
	choice4: "Odd-Even method",
	answer: 2,
    },
    {
	question: "In Digital Circuits, which of the following options represent the synchronous control inputs in a T flip flop?",
	choice1: "T",
	choice2: "0",
	choice3: "clock",
	choice4: "1",
	answer: 1,
    },
    {
	question: "What minimum distance is required for a single error correction according to Hamming’s analysis in Digital Electronics?",
	choice1: "1",
	choice2: "2",
	choice3: "3",
	choice4: "4",
	answer: 3,
    },
    {
	question: "Who invented OOP?",
	choice1: "Andrea Ferro",
	choice2: "Adele Goldberg",
	choice3: "Alan Kay",
	choice4: "Dennis Ritchie",
	answer: 3,
    },
 {
	question: "Which was the first purely object oriented programming language developed?",
	choice1: "Kotlin",
	choice2: "SmallTalk",
	choice3: "Java",
	choice4: "C++",
	answer: 2,
    },
    {
	question: "Which feature of OOP is indicated by the following code?",
	choice1: "Encapsulation and Inheritance",
	choice2: "Inheritance and polymorphism",
	choice3: "Polymorphism",
	choice4: "Data Binding",
	answer: 2,
    },
    {
	question: "In multilevel inheritance, which is the most significant feature of OOP used?",
	choice1: "Code efficiency",
	choice2: "Code readability",
	choice3: "Flexibility",
	choice4: "Code reusability",
	answer: 4,
    },
    {
	question: "Which of the following is not true about polymorphism?",
	choice1: "Helps in redefining the same functionality",
	choice2: "Increases overhead of function definition always",
	choice3: "It is feature of OOP",
	choice4: "Ease in readability of program",
	answer: 2,
    },
    {
	question: "The copy constructors can be used to ________",
	choice1: "Copy an object so that it can be passed to another primitive type variable",
	choice2: "Copy an object for type casting",
	choice3: "Copy an object so that it can be passed to a function",
	choice4: "Copy an object so that it can be passed to a class",
	answer: 3,
    },
    {
	question: "Which of the following error can a compiler check?",
	choice1: "Syntax Error",
	choice2: "Logical Error",
	choice3: "Both Logical and Syntax Error",
	choice4: "Compiler cannot check errors",
	answer: 1,
    },
    {
	question: "Which of the following phase of the compiler is Syntax Analysis?",
	choice1: "Second",
	choice2: "Third",
	choice3: "First",
	choice4: "All of the mentioned",
	answer: 1,
    },
    {
	question: "Which of the following is correct regarding an optimizer Compiler?",
	choice1: "Optimize the code",
	choice2: "Is optimized to occupy less space",
	choice3: "Both of the mentioned",
	choice4: "None of the mentioned",
	answer: 4,
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