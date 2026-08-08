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

const quizzes = [
    { question: "HTMLの正式名称は？", answer: "HyperText Markup Language" },
    { question: "CSSの正式名称は？", answer: "Cascading Style Sheets" },
    { question: "JavaScriptの正式名称は？", answer: "JavaScript" }
];

let currentIndex = 0;
let correctCount = 0;

document.getElementById("question").innerText = quizzes[currentIndex].question;
document.getElementById("submitBtn").addEventListener("click", function() {
    let userAnswer = document.getElementById("answerInput").value;
    let correctAnswer = quizzes[currentIndex].answer;

    if (userAnswer === correctAnswer) {
        document.getElementById("result").innerText = "正解です";
        correctCount = correctCount + 1;
    } else {
        document.getElementById("result").innerText = " 不正解です";
    }
});

document.getElementById("nextBtn").addEventListener("click", function() {
    currentIndex = currentIndex + 1;

    if (currentIndex < quizzes.length) {
        document.getElementById("question").innerText = quizzes[currentIndex].question;
        document.getElementById("answerInput").value = "";
        document.getElementById("result").innerText = "";
    } else {
        document.getElementById("question").innerText = quizzes.length + "問中" + correctCount + "問正解でした！";
        document.getElementById("answerInput").style.display = "none";
        document.getElementById("submitBtn").style.display = "none";
        document.getElementById("nextBtn").style.display = "none";
        document.getElementById("restartBtn").style.display = "inline";
    }
});

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

});

console.log(quizzes[0].question);
console.log(quizzes[1].answer);
