console.log("こんにちは");

//document.getElementById("tagline").innerText = "JavaScriptから書き換えました!";

const siteName = "noumvar";
console.log(siteName);

let score = 50;

if (score >= 60) {
    console.log("合格です");
} else {
    console.log("不合格です");
}

let answer = "4";

if (answer === "5") {
    console.log("正解です");
} else {
    console.log("不正解です");
}

function great(name) {
    console.log("こんにちは、" + name);
}

great("リー");

function add(a, b) {
    return a  + b;
}

let result = add(3, 5);
console.log(result);

let subjects = ["プログラミング","イラスト","哲学"];
console.log(subjects[0]);
console.log(subjects.length);

for (let i = 0; i < subjects.length; i++) {
    console.log(subjects[i]);
}


//問題のデータ
const quizzes = [
    { 
        type: "exact",
        question: "HTMLの正式名称は？", 
        answer: "HyperText Markup Language" 
    },
    { 
        type: "exact",
        question: "CSSの正式名称は？", 
        answer: "Cascading Style Sheets" 
    },
    { 
        type: "exact",
        question: "JavaScriptの正式名称は？", 
        answer: "JavaScript" 
    },
    {
        type: "keyword",
        question: "不変量とはどのような性質のことか",
        keywords: ["変わらない", "変換"]
    },
    {
        type: "choice",
        question: "因数分解の結果として正しいものは？",
        choices: ["a(b+c)の形", "a+b+cの形", "a÷bの形"],
        answer: "a(b+c)の形"
    }
];



//変数
let currentIndex = 4;
let correctCount = 0;

//choice処理
let choices = quizzes[currentIndex].choices;

if (choices) {
    for (let i = 0; i < choices.length; i++) {
        let button = document.createElement("button");

        button.innerText = choices[i];

        button.addEventListener("click", function() {
            let quiz = quizzes[currentIndex];

            if (button.innerText === quiz.answer) {
                document.getElementById("result").innerText = "正解です";
                correctCount = correctCount + 1;
            } else {
                document.getElementById("result").innerText = " 不正解です";
            }
        });

        document.getElementById("choicesArea").appendChild(button);
    }
}

//正誤判定
document.getElementById("question").innerText = quizzes[currentIndex].question;

document.getElementById("submitBtn").addEventListener("click", function() {
    let userAnswer = document.getElementById("answerInput").value;
    let quiz = quizzes[currentIndex];
    let isCorrect = false;

    //type判定
    if (quiz.type === "exact") {
        isCorrect = (userAnswer === quiz.answer);
    } else if (quiz.type === "keyword") {
        for (let i = 0; i < quiz.keywords.length; i++) {
            if (userAnswer.includes(quiz.keywords[i])) {
                isCorrect = true;
            }
        }
    }

    if (isCorrect) {
        document.getElementById("result").innerText = "正解です";
        correctCount = correctCount + 1;
    } else {
        document.getElementById("result").innerText = " 不正解です";
    }

    document.getElementById("submitBtn").disabled = true;
});

//次の問題へ
document.getElementById("nextBtn").addEventListener("click", function() {
    currentIndex = currentIndex + 1;

    if (currentIndex < quizzes.length) {
        document.getElementById("question").innerText = quizzes[currentIndex].question;
        document.getElementById("answerInput").value = "";
        document.getElementById("result").innerText = "";
        document.getElementById("submitBtn").disabled = false;
    } else {
        document.getElementById("question").innerText = quizzes.length + "問中" + correctCount + "問正解でした！";
        document.getElementById("answerInput").style.display = "none";
        document.getElementById("submitBtn").style.display = "none";
        document.getElementById("nextBtn").style.display = "none";
        document.getElementById("restartBtn").style.display = "inline";
    }
});

//もう一度
document.getElementById("restartBtn").addEventListener("click", function() {

    currentIndex = 0;
    correctCount = 0;

    document.getElementById("question").innerText = quizzes[currentIndex].question;
    document.getElementById("answerInput").value = "";
    document.getElementById("result").innerText = "";

    document.getElementById("answerInput").style.display = "inline";
    document.getElementById("submitBtn").style.display = "inline";
    document.getElementById("nextBtn").style.display = "inline";
    document.getElementById("restartBtn").style.display = "none";
    document.getElementById("submitBtn").disabled = false;

});

console.log(quizzes[0].question);
console.log(quizzes[1].answer);
