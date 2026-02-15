const questions=[
    {
        question:'Who is present CM of TG?',
        answers:[
            {optn:'KCR',correct:false},
            {optn:'Revanth Reddy',correct:true},
            {optn:'CBN',correct:false},
            {optn:'YSR',correct:false},
        ]
    },
    {
        question:'Who is present PM of India?',
        answers:[
            {optn:'KCR',correct:false},
            {optn:'RR',correct:false},
            {optn:'Modi',correct:true},
            {optn:'YSR',correct:false},
        ]
    },
    {
        question:'In which year RGUKT was Established?',
        answers:[
            {optn:2000,correct:false},
            {optn:2007,correct:false},
            {optn:2008,correct:true},
            {optn:2009,correct:false},
        ]
    },
]

//accessing elements
const question=document.getElementById('question')
const answerBtns=document.getElementById('answer-buttons')
const nextBtn=document.getElementById('nextBtn')
const playAgainBtn=document.getElementById('playAgain')

let currentQuestionIndex=0;
let score=0;

//startQuiz function used to restart quiz(fresh start)
function startQuiz(){
    playAgainBtn.style.display='none'
    currentQuestionIndex=0;
    score=0;
    showQuestion()
}

//used to show question
function showQuestion(){
    //reset/clear options of previous questions
    resetOptns()

    const currentQuestionObject=questions[currentQuestionIndex]//question object
    const currentQuestion=currentQuestionObject.question
    let questionNumber=currentQuestionIndex+1
    //showing question
    question.innerHTML=questionNumber+'.'+currentQuestion

    //rendering options of currentQuestion
    currentQuestionObject.answers.forEach(function(obj){
        let btn=document.createElement('button')//optn btn
        btn.innerHTML=obj.optn
        btn.classList.add('optnBtn')
        answerBtns.appendChild(btn)
        if(obj.correct){
            btn.dataset.correct=obj.correct//stores correct btn/optn
        }
        btn.addEventListener('click',selectBtn)

    })

}

//to access  selected btn and know whether it is  correct or incorrect
function selectBtn(e){
    let selectedBtn=e.target//accesing selected btn
    let isCorrect =(selectedBtn.dataset.correct==='true')//checks selected btn is correct or incorrect
    if(isCorrect){
        selectedBtn.classList.add('correct')
        score++;
    }else{
        selectedBtn.classList.add('incorrect')
    }
    Array.from(answerBtns.children).forEach(btn=>{
        if(btn.dataset.correct==='true'){
            btn.classList.add('correct')
        }
        btn.disabled='true'//we have no choice to click another option
    })
    nextBtn.style.display='block'
}

nextBtn.addEventListener('click',()=>{
    currentQuestionIndex++;
    if(currentQuestionIndex<questions.length){
        showQuestion()
    }else{
        showScore()
    }
})


function resetOptns(){
    nextBtn.style.display='none';
    while(answerBtns.firstChild){
        answerBtns.removeChild(answerBtns.firstChild)
    }
}

//show score

function showScore(){   
    question.innerHTML=`your score is ${score} out of ${questions.length}`
    resetOptns()
    playAgainBtn.style.display='block'
}

//to play playAgain
playAgainBtn.addEventListener('click',()=>{
    startQuiz()
})

startQuiz()
