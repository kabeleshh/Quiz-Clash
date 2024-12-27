const questions = [
    {
        question : "Which is the largest animal in the world ?",
        answer : [
            { text:"Lion", correct : false },
            { text:"Tiger", correct : false },
            { text:"Blue Whale", correct : true},
            { text:"Shark",correct : false}
        ]
    },
    {
        question : "Which is the largest planet in the universe ?",
        answer : [
            { text:"Earth", correct : false },
            { text:"Mars", correct : false },
            { text:"Saturn", correct : false},
            { text:"Jupiter",correct : true}
        ]
    },
    {
        question : "What is the capital of India ?",
        answer : [
            { text:"Chennai", correct : false },
            { text:"Jaipur", correct : false },
            { text:"Mumbai", correct : false},
            { text:"New Delhi",correct : true}
        ]
    },
    {
        question : "Which is the most acient language in the earth ?",
        answer : [
            { text:"Tamil", correct : true },
            { text:"Sanskrit", correct : false },
            { text:"Russian", correct : false },
            { text:"Greek",correct : false }
        ]
    },
    {
        question : "When Pillipines got independent ?",
        answer : [
            { text:"1893", correct : false },
            { text:"1924", correct : false },
            { text:"1950", correct : true},
            { text:"1634", correct : false}
        ]
    }
];

const quest = document.getElementById("question");
const ans = document.querySelector(".ans");
const nxtBtn = document.getElementById("nxt-btn");

let currIndexVal = 0;
let score = 0;

function startQuiz(){                                                              //1
    currIndexVal = 0;
    score = 0;
    nxtBtn.innerHTML = "Next"
    displayQuest();
}

function displayQuest(){                                                           //2
    reState();
    let currQuest = questions[currIndexVal];
    let quesNum = currIndexVal + 1;
    quest.innerHTML = quesNum + ". " + currQuest.question;

    currQuest.answer.forEach(answer => {
        const button =  document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        ans.appendChild(button);

        if(answer.correct){
            button.dataset.correct = String(answer.correct);
        }
        button.addEventListener("click",selectedAns)
    });
}

function reState(){                                                                //3
    nxtBtn.style.display = "none";
    while(ans.firstChild){
        ans.removeChild(ans.firstChild);
    }
}

function selectedAns(e){                                                           //4
    const selectedElement = e.target;
    const isCorrect = selectedElement.dataset.correct === "true";
    if(isCorrect){
        selectedElement.style.backgroundColor = "blue";
        score++;
    }
    else{
        selectedElement.style.backgroundColor = "red";
    }

    Array.from(ans.children).forEach(button =>{
        if(button.dataset.correct==="true"){
            button.style.backgroundColor = "blue";
        }
        button.disabled = true;
    });
    nxtBtn.style.display = "block";
}

function showResult(){                                                             //7
    reState();
    quest.innerHTML = `Score : ${score} out of ${questions.length}`;
    nxtBtn.style.display = "block";
    nxtBtn.innerHTML = `Try Again`;
}

function nextQuest(){                                                              //6
    currIndexVal++;
    if(currIndexVal < questions.length){
        displayQuest();
    }
    else{
        showResult();
    }
}

nxtBtn.addEventListener("click",()=>{                                             //5
    if(currIndexVal < questions.length){
        nextQuest();
    }
    else{
        startQuiz();
    }
})

startQuiz();                                                                      //0

