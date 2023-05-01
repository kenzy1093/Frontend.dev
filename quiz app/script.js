//references
let timeleft= document.querySelector(".time-left")
let quizcontainer=document.getElementById("container")
let nextbtn=document.getElementById("next-button")
let countofquestions=document.querySelector(".number-of-questions")
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
restart.addEventListener("click",() => {
    initial();
    displaycontainer.classList.remove("hide");
    scorecontainer.classList.add("hide");
});

//next button

nextbtn.addEventListener(
    "click",
    (displaynext = () =>{
    //increment questioncount
    questioncount += 1;
    //if last question
    if (questioncount == quizarray.length){
        //hide question container and display score
        displaycontainer.classList.add("hide");
        scorecontainer.classList.remove("hide");
        //user score
        userscore.innerHTML = 
        "Your score is " + scorecount + " out of " + questioncount;
    }
    else{
        //display question count
        countofquestions.innerHTML =
        questioncount + 1 + " of " + quizarray.length + " questions";
        //display quiz
        quizdisplay(questioncount);
        count = 11;
        clearInterval(countdown);
        timerdisplay();
    }

}));

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
function quizcreator(){
    //randomly sort questions
    quizarray.sort(()=> Math.random() - 0.5);
    //generate quiz
    for ( let i of quizarray){
        //randomlysort options
        i.options.sort(()=> Math.random() - 0.5);
        //quiz card creation
        let div = document.createElement("div");
        div.classList.add("container-mid","hide");
        //question number
        countofquestions.innerHTML = 1 + " of " + quizarray.length + " questions";
        //question
        let question_div = document.createElement("p");
        question_div.classList.add("question");
        question_div.innerHTML = i.question;
        div.appendChild(question_div);
        //options
        div.innerHTML +=`
        <button class="option-div" onclick="checker(this)">${i.options[0]}</button>
        <button class="option-div" onclick="checker(this)">${i.options[1]}</button>
        <button class="option-div" onclick="checker(this)">${i.options[2]}</button>
        <button class="option-div" onclick="checker(this)">${i.options[3]}</button>
        `;
        quizcontainer.appendChild(div);
    };
};

//checker function to check if option is correct or not
function checker(useroption){
    let usersolution = useroption.innerText;
    let question = 
    document.getElementsByClassName("container-mid")[questioncount];
    let options = question.querySelectorAll(".option-div");

    //if user clicked answer== correct option stored in object
    if (usersolution === quizarray[questioncount].correct){
        useroption.classList.add("correct");
        scorecount++;
    }
    else{
        useroption.classList.add("incorrect");
        //for marking the correct option
        options.forEach((Element)=> {
            if (Element.innerText == quizarray[questioncount].correct){
                Element.classList.add("correct");
            }
        });
    }

    //clearinterval(stop timer)
    clearInterval(countdown);
    //disable all options
    options.forEach((Element)=> {
        Element.disabled = true;
    });
}

//initial setup
function initial(){
    quizcontainer.innerHTML = "";
    questioncount = 0;
    scorecount = 0;
    count = 11;
    clearInterval(countdown);
    timerdisplay();
    quizcreator();
    quizdisplay(questioncount);
}

//when user click on start
startbutton.addEventListener("click",() => {
    startscreen.classList.add("hide");
    displaycontainer.classList.remove("hide");
    initial();
});

// hide quiz and display start screen
window.onload = () => {
    startscreen.classList.remove("hide");
    displaycontainer.classList.add("hide");
};
