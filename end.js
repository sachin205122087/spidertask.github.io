const username = document.querySelector('#username')
const saveScoreBtn = document.querySelector('#saveScoreBtn')
const finalScore = document.querySelector('#finalScore')
const finalMoves = document.querySelector('#finalMoves')
const mostRecentScore = localStorage.getItem('mostRecentScore')
const mostRecentMoves = localStorage.getItem('mostRecentMoves')

const highScores = JSON.parse(localStorage.getItem('highScores')) || []

const MAX_HIGH_SCORES = 5
const MAX_HIGH_MOVESS = 5

finalScore.innerText = mostRecentScore
finalMoves.innerText = mostRecentMoves

username.addEventListener('keyup', () => {
    saveScoreBtn.disabled = !username.value
})

saveHighScore = e => {
    e.preventDefault()

    const score = {
        score: mostRecentScore,
        name: username.value
    }

    highScores.push(score)

    highScores.sort((a,b) => {
        return b.score - a.score
    })

    highScores.splice(5)

    localStorage.setItem('highScores', JSON.stringify(highScores))
    window.location.assign('index.html')

    
}