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
  },
   {
    id: "30",
    question: "What is the main purpose of an argument?",
    options: [
      "To describe events",
      "To explain causes",
      "To provide reasons for a conclusion",
      "To ask questions"
    ],
    correct: "To provide reasons for a conclusion",
  },
  {
    id: "31",
    question: "What are the two main parts of an argument?",
    options: [
      "Facts and opinions",
      "Premises and conclusion",
      "Questions and answers",
      "Examples and reports"
    ],
    correct: "Premises and conclusion",
  },
  {
    id: "32",
    question: "What must all premises be?",
    options: [
      "Commands",
      "Questions",
      "Statements",
      "Opinions only"
    ],
    correct: "Statements",
  },
  {
    id: "33",
    question: "How many statements are required for an argument?",
    options: [
      "One",
      "At least two",
      "Three exactly",
      "Unlimited"
    ],
    correct: "At least two",
  },
  {
    id: "34",
    question: "Which of the following is NOT an argument?",
    options: [
      "A report",
      "A set of premises and conclusion",
      "A persuasive claim",
      "A logical reasoning"
    ],
    correct: "A report",
  },
  {
    id: "35",
    question: "What is a report in logic?",
    options: [
      "An opinion",
      "An explanation",
      "Information without argument",
      "A conclusion"
    ],
    correct: "Information without argument",
  },
  {
    id: "36",
    question: "What is the purpose of an illustration?",
    options: [
      "To prove a claim",
      "To clarify with examples",
      "To argue strongly",
      "To reject ideas"
    ],
    correct: "To clarify with examples",
  },
  {
    id: "37",
    question: "What is an explanation used for?",
    options: [
      "To persuade",
      "To prove logically",
      "To show why something happened",
      "To reject arguments"
    ],
    correct: "To show why something happened",
  },
  {
    id: "38",
    question: "Why is a conditional statement not an argument?",
    options: [
      "It is too complex",
      "It lacks a conclusion",
      "It is only one statement",
      "It is always false"
    ],
    correct: "It is only one statement",
  },
  {
    id: "39",
    question: "What does WCA stand for?",
    options: [
      "Well-Constructed Analysis",
      "Well-Crafted Argument",
      "Weak Causal Argument",
      "Wide Concept Application"
    ],
    correct: "Well-Crafted Argument",
  },
  {
    id: "40",
    question: "What is the purpose of a well-crafted argument?",
    options: [
      "To confuse readers",
      "To simplify and clarify structure",
      "To add more words",
      "To avoid conclusions"
    ],
    correct: "To simplify and clarify structure",
  },
  {
    id: "41",
    question: "Which word is a premise indicator?",
    options: [
      "Therefore",
      "Thus",
      "Because",
      "Hence"
    ],
    correct: "Because",
  },
  {
    id: "42",
    question: "Which word is a conclusion indicator?",
    options: [
      "Since",
      "Because",
      "Therefore",
      "Given that"
    ],
    correct: "Therefore",
  },
  {
    id: "43",
    question: "What are 'discounts' in arguments?",
    options: [
      "Main premises",
      "Irrelevant objections",
      "Supporting evidence",
      "Conclusions"
    ],
    correct: "Irrelevant objections",
  },
  {
    id: "44",
    question: "What is repetition in an argument?",
    options: [
      "Adding new ideas",
      "Restating the same idea",
      "Giving examples",
      "Providing evidence"
    ],
    correct: "Restating the same idea",
  },
  {
    id: "45",
    question: "What are assurances?",
    options: [
      "Logical proofs",
      "Confidence words like 'clearly'",
      "Examples",
      "Premises"
    ],
    correct: "Confidence words like 'clearly'",
  },
  {
    id: "46",
    question: "What are hedges?",
    options: [
      "Strong claims",
      "Words showing uncertainty",
      "Logical conclusions",
      "Evidence statements"
    ],
    correct: "Words showing uncertainty",
  },
  {
    id: "47",
    question: "Why should excess verbiage be removed?",
    options: [
      "To make arguments longer",
      "To improve clarity",
      "To confuse readers",
      "To add emotion"
    ],
    correct: "To improve clarity",
  },
  {
    id: "48",
    question: "What is uniform language?",
    options: [
      "Using different terms",
      "Using consistent terms",
      "Using complex words",
      "Using emotional words"
    ],
    correct: "Using consistent terms",
  },
  {
    id: "49",
    question: "What does being charitable in analysis mean?",
    options: [
      "Criticizing harshly",
      "Ignoring arguments",
      "Interpreting fairly",
      "Rejecting ideas"
    ],
    correct: "Interpreting fairly",
  },
  {
    id: "50",
    question: "What is a sub-conclusion?",
    options: [
      "Final conclusion",
      "A supporting example",
      "An intermediate conclusion",
      "A premise"
    ],
    correct: "An intermediate conclusion",
  },
  {
    id: "51",
    question: "What is an implicit premise?",
    options: [
      "A false statement",
      "A hidden assumption",
      "A repeated idea",
      "A conclusion"
    ],
    correct: "A hidden assumption",
  },
  {
    id: "52",
    question: "What is another name for an argument with missing premises?",
    options: [
      "Syllogism",
      "Enthymeme",
      "Paradox",
      "Fallacy"
    ],
    correct: "Enthymeme",
  },
  {
    id: "53",
    question: "What is the purpose of argument diagrams?",
    options: [
      "To decorate arguments",
      "To show logical structure",
      "To add examples",
      "To remove conclusions"
    ],
    correct: "To show logical structure",
  },
  {
    id: "54",
    question: "What do arrows represent in argument diagrams?",
    options: [
      "Examples",
      "Questions",
      "Support relationship",
      "Opinions"
    ],
    correct: "Support relationship",
  },
  {
    id: "55",
    question: "What are independent premises?",
    options: [
      "Premises that depend on each other",
      "Premises that support separately",
      "False premises",
      "Hidden premises"
    ],
    correct: "Premises that support separately",
  },
  {
    id: "56",
    question: "What are interdependent premises?",
    options: [
      "Premises that work together",
      "Separate premises",
      "False premises",
      "Extra statements"
    ],
    correct: "Premises that work together",
  },
  {
    id: "57",
    question: "What is the first step in analyzing an argument?",
    options: [
      "Draw diagram",
      "Identify premises and conclusion",
      "Remove words",
      "Add examples"
    ],
    correct: "Identify premises and conclusion",
  },
  {
    id: "58",
    question: "Why are some real arguments difficult to analyze?",
    options: [
      "They are too short",
      "They are perfectly clear",
      "They contain extra or unclear information",
      "They lack conclusions"
    ],
    correct: "They contain extra or unclear information",
  },
  {
    id: "59",
    question: "What is the main goal of argument analysis?",
    options: [
      "To memorize facts",
      "To identify logical structure",
      "To create confusion",
      "To avoid reasoning"
    ],
    correct: "To identify logical structure",
  },
   {
    id: "60",
    question: "What indicates that a passage is an argument?",
    options: [
      "It gives information",
      "It contains examples",
      "It provides reasons for a conclusion",
      "It asks a question"
    ],
    correct: "It provides reasons for a conclusion",
  },
  {
    id: "61",
    question: "Why must arguments contain only statements?",
    options: [
      "Statements are longer",
      "Statements have truth value",
      "Statements are opinions",
      "Statements are emotional"
    ],
    correct: "Statements have truth value",
  },
  {
    id: "62",
    question: "What makes a passage a non-argument?",
    options: [
      "It has a conclusion",
      "It has premises",
      "It lacks support for a claim",
      "It uses logic"
    ],
    correct: "It lacks support for a claim",
  },
  {
    id: "63",
    question: "Which is an example of an unsupported assertion?",
    options: [
      "An argument",
      "A report",
      "A conclusion with reasons",
      "A diagram"
    ],
    correct: "A report",
  },
  {
    id: "64",
    question: "What distinguishes an illustration from an argument?",
    options: [
      "It proves a claim",
      "It uses logic",
      "It gives examples only",
      "It has premises"
    ],
    correct: "It gives examples only",
  },
  {
    id: "65",
    question: "What is the main role of explanatory statements?",
    options: [
      "To prove truth",
      "To persuade",
      "To explain why something happens",
      "To reject claims"
    ],
    correct: "To explain why something happens",
  },
  {
    id: "66",
    question: "Why are conditional statements considered non-arguments?",
    options: [
      "They are false",
      "They contain only one statement",
      "They are too complex",
      "They lack meaning"
    ],
    correct: "They contain only one statement",
  },
  {
    id: "67",
    question: "What is the first step in forming a well-crafted argument?",
    options: [
      "Draw diagram",
      "Identify premises and conclusion",
      "Add examples",
      "Remove indicators"
    ],
    correct: "Identify premises and conclusion",
  },
  {
    id: "68",
    question: "What is excess verbiage?",
    options: [
      "Key premises",
      "Logical conclusions",
      "Unnecessary words or statements",
      "Strong evidence"
    ],
    correct: "Unnecessary words or statements",
  },
  {
    id: "69",
    question: "What is the purpose of removing excess verbiage?",
    options: [
      "To weaken arguments",
      "To simplify and clarify reasoning",
      "To lengthen text",
      "To confuse readers"
    ],
    correct: "To simplify and clarify reasoning",
  },
  {
    id: "70",
    question: "Which of the following is a discount indicator?",
    options: [
      "Because",
      "Therefore",
      "Although",
      "Hence"
    ],
    correct: "Although",
  },
  {
    id: "71",
    question: "What should be done with discounts in arguments?",
    options: [
      "Treat as conclusions",
      "Treat as premises",
      "Ignore them",
      "Expand them"
    ],
    correct: "Ignore them",
  },
  {
    id: "72",
    question: "What is the main issue with repetition?",
    options: [
      "Adds new ideas",
      "Confuses structure",
      "Repeats same idea unnecessarily",
      "Strengthens logic"
    ],
    correct: "Repeats same idea unnecessarily",
  },
  {
    id: "73",
    question: "Why are assurances often removed?",
    options: [
      "They weaken arguments",
      "They add no logical value",
      "They are false",
      "They are unclear"
    ],
    correct: "They add no logical value",
  },
  {
    id: "74",
    question: "What do hedges indicate?",
    options: [
      "Certainty",
      "Confidence",
      "Uncertainty",
      "Proof"
    ],
    correct: "Uncertainty",
  },
  {
    id: "75",
    question: "When should hedges NOT be removed?",
    options: [
      "When they confuse meaning",
      "When they affect argument strength",
      "When they repeat ideas",
      "When they are long"
    ],
    correct: "When they affect argument strength",
  },
  {
    id: "76",
    question: "Why is uniform language important?",
    options: [
      "It adds complexity",
      "It ensures logical clarity",
      "It adds examples",
      "It removes conclusions"
    ],
    correct: "It ensures logical clarity",
  },
  {
    id: "77",
    question: "What problem occurs without uniform language?",
    options: [
      "Too many premises",
      "Weak evidence",
      "Obscured logical connection",
      "Missing conclusion"
    ],
    correct: "Obscured logical connection",
  },
  {
    id: "78",
    question: "What does being charitable in interpretation involve?",
    options: [
      "Ignoring arguments",
      "Changing meaning",
      "Preserving the author's intent",
      "Rejecting weak ideas"
    ],
    correct: "Preserving the author's intent",
  },
  {
    id: "79",
    question: "What should be avoided when interpreting arguments?",
    options: [
      "Clarity",
      "Fairness",
      "Distorting the author's meaning",
      "Logical structure"
    ],
    correct: "Distorting the author's meaning",
  },
  {
    id: "80",
    question: "What is a final conclusion?",
    options: [
      "A premise",
      "An intermediate step",
      "The main claim being supported",
      "An example"
    ],
    correct: "The main claim being supported",
  },
  {
    id: "81",
    question: "What role does a sub-conclusion play?",
    options: [
      "Ends argument",
      "Supports premises",
      "Supports final conclusion",
      "Adds examples"
    ],
    correct: "Supports final conclusion",
  },
  {
    id: "82",
    question: "What is an enthymeme?",
    options: [
      "A false argument",
      "An argument with hidden premise",
      "A diagram",
      "A conclusion only"
    ],
    correct: "An argument with hidden premise",
  },
  {
    id: "83",
    question: "Why are implicit premises added?",
    options: [
      "To confuse argument",
      "To clarify reasoning",
      "To remove logic",
      "To shorten text"
    ],
    correct: "To clarify reasoning",
  },
  {
    id: "84",
    question: "What is the first step in diagramming an argument?",
    options: [
      "Draw arrows",
      "Remove words",
      "Number statements",
      "Add examples"
    ],
    correct: "Number statements",
  },
  {
    id: "85",
    question: "What do arrows in diagrams indicate?",
    options: [
      "Examples",
      "Questions",
      "Support relationship",
      "Opinions"
    ],
    correct: "Support relationship",
  },
  {
    id: "86",
    question: "What is independent support?",
    options: [
      "Premises depend on each other",
      "Each premise supports conclusion separately",
      "Premises are false",
      "Premises are hidden"
    ],
    correct: "Each premise supports conclusion separately",
  },
  {
    id: "87",
    question: "What is interdependent support?",
    options: [
      "Premises work alone",
      "Premises must work together",
      "Premises are irrelevant",
      "Premises are repeated"
    ],
    correct: "Premises must work together",
  },
  {
    id: "88",
    question: "Why may statements joined by 'and' be separated?",
    options: [
      "To reduce meaning",
      "To show logical structure",
      "To remove premises",
      "To simplify grammar"
    ],
    correct: "To show logical structure",
  },
  {
    id: "89",
    question: "What is the main benefit of argument diagrams?",
    options: [
      "They decorate text",
      "They simplify grammar",
      "They reveal logical connections",
      "They remove conclusions"
    ],
    correct: "They reveal logical connections",
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
