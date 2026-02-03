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
    question: "What makes a sentence a statement in logic?",
    options: [
      "It gives an order",
      "It asks a question",
      "It has a truth value",
      "It expresses emotion"
    ],
    correct: "It has a truth value",
  },
  {
    id: "1",
    question: "Which type of sentence always has a truth value?",
    options: [
      "Imperative",
      "Interrogative",
      "Exclamatory",
      "Declarative"
    ],
    correct: "Declarative",
  },
  {
    id: "2",
    question: "Which of the following is NOT a statement?",
    options: [
      "Inflation is rising",
      "Close the door",
      "The sun is a star",
      "Jamaica is an island"
    ],
    correct: "Close the door",
  },
  {
    id: "3",
    question: "What is the truth value of a statement?",
    options: [
      "Opinion or belief",
      "True or false",
      "Right or wrong",
      "Good or bad"
    ],
    correct: "True or false",
  },
  {
    id: "4",
    question: "Why are questions not statements?",
    options: [
      "They are informal",
      "They lack grammar",
      "They lack truth value",
      "They lack meaning"
    ],
    correct: "They lack truth value",
  },
  {
    id: "5",
    question: "What does the Law of Excluded Middle state?",
    options: [
      "Statements are uncertain",
      "Statements are opinions",
      "A statement is either true or false",
      "A statement can be both true and false"
    ],
    correct: "A statement is either true or false",
  },
  {
    id: "6",
    question: "Which is an essential part of every argument?",
    options: [
      "A question",
      "A command",
      "A conclusion",
      "An emotion"
    ],
    correct: "A conclusion",
  },
  {
    id: "7",
    question: "What is an argument primarily intended to do?",
    options: [
      "Explain an event",
      "Describe emotions",
      "Persuade using reasons",
      "Give instructions"
    ],
    correct: "Persuade using reasons",
  },
  {
    id: "8",
    question: "What is an assertion?",
    options: [
      "A question with reasons",
      "A conclusion without reasons",
      "A command with evidence",
      "A false argument"
    ],
    correct: "A conclusion without reasons",
  },
  {
    id: "9",
    question: "Which element turns an assertion into an argument?",
    options: [
      "Emotion",
      "Evidence or reasons",
      "A question mark",
      "Authority"
    ],
    correct: "Evidence or reasons",
  },
  {
    id: "10",
    question: "What type of reasoning moves from general to specific?",
    options: [
      "Inductive",
      "Analogical",
      "Deductive",
      "Emotional"
    ],
    correct: "Deductive",
  },
  {
    id: "11",
    question: "Deductive arguments are best described as:",
    options: [
      "Probably true",
      "Emotionally persuasive",
      "Logically certain",
      "Opinion-based"
    ],
    correct: "Logically certain",
  },
  {
    id: "12",
    question: "What type of reasoning moves from observations to general rules?",
    options: [
      "Deductive",
      "Inductive",
      "Circular",
      "Conditional"
    ],
    correct: "Inductive",
  },
  {
    id: "13",
    question: "Why are most economic arguments inductive?",
    options: [
      "Economics lacks data",
      "Human behavior varies",
      "Logic does not apply",
      "Arguments must persuade"
    ],
    correct: "Human behavior varies",
  },
  {
    id: "14",
    question: "What does validity refer to?",
    options: [
      "Truth of premises",
      "Logical structure",
      "Emotional appeal",
      "Economic relevance"
    ],
    correct: "Logical structure",
  },
  {
    id: "15",
    question: "Can an argument be valid with false premises?",
    options: [
      "No, never",
      "Only in economics",
      "Yes",
      "Only if conclusion is true"
    ],
    correct: "Yes",
  },
  {
    id: "16",
    question: "What makes an argument sound?",
    options: [
      "Persuasive language",
      "True conclusion only",
      "Valid structure and true premises",
      "Many premises"
    ],
    correct: "Valid structure and true premises",
  },
  {
    id: "17",
    question: "Which guarantees a true conclusion?",
    options: [
      "Valid argument",
      "Inductive argument",
      "Sound argument",
      "Strong opinion"
    ],
    correct: "Sound argument",
  },
  {
    id: "18",
    question: "Why is 'Increase taxes!' not a statement?",
    options: [
      "It is unclear",
      "It lacks evidence",
      "It is a command",
      "It is controversial"
    ],
    correct: "It is a command",
  },
  {
    id: "19",
    question: "What is a key feature of explanations?",
    options: [
      "They persuade",
      "They argue",
      "They clarify why something happened",
      "They prove conclusions"
    ],
    correct: "They clarify why something happened",
  },
  {
    id: "20",
    question: "Which is an example of a fallacy?",
    options: [
      "Valid reasoning",
      "Sound reasoning",
      "Assuming causation from coincidence",
      "Using evidence"
    ],
    correct: "Assuming causation from coincidence",
  },
  {
    id: "21",
    question: "What is wrong with 'If P then Q; Q; therefore P'?",
    options: [
      "It is inductive",
      "It affirms the consequent",
      "It denies evidence",
      "It is sound"
    ],
    correct: "It affirms the consequent",
  },
  {
    id: "22",
    question: "Which applies only to arguments, not statements?",
    options: [
      "Truth",
      "Falsity",
      "Validity",
      "Meaning"
    ],
    correct: "Validity",
  },
  {
    id: "23",
    question: "What is the minimum number of premises an argument can have?",
    options: [
      "Zero",
      "One",
      "Two",
      "Three"
    ],
    correct: "One",
  },
  {
    id: "24",
    question: "Which best describes inductive conclusions?",
    options: [
      "Guaranteed",
      "Impossible",
      "Probable",
      "Meaningless"
    ],
    correct: "Probable",
  },
  {
    id: "25",
    question: "Why is logic important in economics?",
    options: [
      "It removes scarcity",
      "It avoids emotions",
      "It improves decision-making",
      "It increases income"
    ],
    correct: "It improves decision-making",
  },
  {
    id: "26",
    question: "Which sentence is a statement?",
    options: [
      "Will prices rise?",
      "Lower interest rates!",
      "Inflation increased by 5%",
      "Why taxes?"
    ],
    correct: "Inflation increased by 5%",
  },
  {
    id: "27",
    question: "What must every premise be?",
    options: [
      "An opinion",
      "A command",
      "A statement",
      "A question"
    ],
    correct: "A statement",
  },
  {
    id: "28",
    question: "Which best defines soundness?",
    options: [
      "Emotional appeal",
      "Logical certainty only",
      "Validity plus true premises",
      "Popular agreement"
    ],
    correct: "Validity plus true premises",
  },
  {
    id: "29",
    question: "Which reasoning is most common in real-world economics?",
    options: [
      "Deductive",
      "Mathematical only",
      "Inductive",
      "Circular"
    ],
    correct: "Inductive",
  }

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
