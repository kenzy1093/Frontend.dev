//references
let timeleft= document.querySelector(".time-left")
let quizcontainer=document.getElementById("container")
let nextbtn=document.getElementById("next-button")
let countofquestions=document.querySelector(".number-of-0questions")
let displaycontainer= document.getElementById("display-container")
let scorecontainer= document.querySelector(".score-container")
let restart= document.getElementById("restart")
let userscore=document.getElementById("user-score")
let startscreen=document.querySelector(".start-screen")
let startbutton=document.getElementById("start-button")
let questioncount
let scorecount = 0
let count = 11
let countdown

//question and array

const quizarray = [
    {
        id: "0",
        question:"what language you speak",
        options:["english","mandarin","spanish","french"],
        correct: "english",
    },
    {
        id: "1",
        question:"where do you live",
        options:["america","china","jamaica","england"],
        correct: "jamaica",
    },
    {
        id: "2",
        question:"who is the king of reggae",
        options:["michael jackson","jay Z","beenie man","bob marley"],
        correct: "bob marley",
    },
];

//restart quiz
restart.addEventListener("click",(=>{
    initial();
    displaycontainer.classList.remove("hide");
    scorecontainer.classList.add("hide");
}));

//next button

nextbtn.addEventListener(
    "click",
    (displaynext =(=>{
    //increment questioncount
    questioncount += 1;
    //if last question
    if (questioncount == quizarray.length){
        //hide question container and display score
        displaycontainer.classList.add("hide");
        scorecontainer.classList.remove("hide");
        //user score
        userscore.innerHTML = 
        "Your score is " + scorecount + "out of" + questioncount;
    }
    else{
        //display question count
        countofquestions.innerHTML =
        questioncount + 1 + "of" + quizarray.length + "question";
        //display quiz
        quizdisplay(questioncount);
        count = 11;
        clearInterval(countdown);
        timerdisplay();
    }

})));

//timer
const timerdisplay = () => {
    countdown = setInterval( () =>{
        count --;
        timeleft.innerHTML = `${count}s`;
        if (count ==0) {
            clearInterval(countdown);
            displaynext();
        }
    },1000);
};

//display quiz
const quizdisplay = (questioncount) =>{
    let quizcards = document.querySelectorAll(".container-mid");
    //hide other cards
    quizcards.forEach((card) =>{
        card.classList.add("hide");
    });
    //display current question card
    quizcards[questioncount].classList.remove("hide");
};

//quiz creation

