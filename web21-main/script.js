const question = [
    {
        text:"Как зовут Тотоева?",
        options:["Марат","Заур","Александр","Сармат"],
        correctIndex: 1
    },

    {
        text:"Сколько лет Аркадию?",
        options:["20","19","22","21"],
        correctIndex: 3
    },

    {
        text:"Сколько девочек в 21 группе",
        options:["7","5","10","4"],
        correctIndex: 0
    }
]

let currentIndex = 0;
let userAnswer = new Array(question.length).fill(null);



const quizCard = document.querySelector('#quizCard');
const progressTest = document.querySelector('#progressTest');
const questionText = document.querySelector('#questionText');
const optionsForm = document.querySelector('#optionsForm');

const nextButton = document.querySelector('#nextButton');
const backButton = document.querySelector('#backButton');

const resultCard = document.querySelector('#resultCard');
const resultText = document.querySelector('#resultText');
const restartButton = document.querySelector('#restartButton');

const reviewList=document.querySelector('#reviewList');

function renderQuestion(){
    const q = question[currentIndex];

    progressTest.textContent = `Вопрос ${currentIndex+1}/${question.length}`;
    questionText.textContent = q.text;
    optionsForm.innerHTML ="";

    q.options.forEach((op,opIndex) => {
        const label = document.createElement('label');
        label.className = "option";
        const radio = document.createElement("input");
        radio.type = "radio";
        radio.name = "answer";
        radio.value = String(opIndex);

        radio.addEventListener("change",()=>{
            userAnswer[currentIndex] = opIndex;
            updateNavButton();
        })

        const span = document.createElement("span");
        span.textContent = op;

        label.appendChild(radio);
        label.appendChild(span);

        optionsForm.appendChild(label);

         if(userAnswer[currentIndex]===opIndex)
    {
        radio.checked=true;
    }
    });
    updateNavButton();

   
}

function updateNavButton(){
    backButton.disabled = currentIndex===0;

    const isLast = currentIndex===question.length-1;
    nextButton.textContent= isLast ? "Завершен": "Вперед";

    const isAnswer = userAnswer[currentIndex]!==null;
    nextButton.disabled = !isAnswer;
}

nextButton.addEventListener("click",()=>{
    const isLast = currentIndex===question.length-1;
    if(isLast){
        ShowResult();
        return;
    }
    currentIndex++;
    renderQuestion();
})

backButton.addEventListener("click",()=>{
    currentIndex--;
    renderQuestion();
})


renderQuestion();

function ShowResult()
{
    let correct=0;
    for(let i=0;i<question.length;i++)
    {
        if(userAnswer[i]===question[i].correctIndex) correct++;

    }

    quizCard.classList.add('hidden');
    resultCard.classList.remove('hidden');
    resultText.textContent=`   correct answers:${correct} of ${question.length}`;

reviewList.innerHTML='';

question.forEach((q,i)=>{
    const userIndex=userAnswer[i];
    const correctText=q.options[q.correctIndex];
    const isRight=userIndex===q.correctIndex;
    const userText=userAnswer===null?"no answer":q.options[userIndex];
    const item=document.createElement('div')
    item.className='review-item';

    item.innerHTML=`<div class="review-q">${i+1}. ${q.text}</div>
    <div class="review-a ${isRight?"ok":"bad"}">
    your answer was ${userText} ${isRight?"🤳":"🎅🏿"}
    </div>
    `
    reviewList.appendChild(item);
})

}

restartButton.addEventListener('click',()=>{

    currentIndex=0;
    userAnswer=new Array(question.length).fill(null);
    resultCard.classList.add('hidden');
    quizCard.classList.remove('hidden');

    renderQuestion();
})