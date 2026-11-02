

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
let currentIndex = 0;
let correctCount = 0;

//問題を表示する
function showQuestion() {
    let quiz = quizzes[currentIndex];
    let choicesArea = document.getElementById("choicesArea");

    document.getElementById("question").innerText = quiz.question;
    document.getElementById("answerInput").value = "";
    document.getElementById("result").innerText = "";
    document.getElementById("submitBtn").disabled = false;

    //前の問題の選択肢を消す
    choicesArea.innerHTML = "";

    if (quiz.type === "choice") {
        //選択式：入力欄を隠して、選択肢のボタンを作る
        document.getElementById("answerInput").style.display = "none";
        document.getElementById("submitBtn").style.display = "none";

        for (let i = 0; i < quiz.choices.length; i++) {
            let button = document.createElement("button");
            button.innerText = quiz.choices[i];

            button.addEventListener("click", function() {
                if (button.innerText === quiz.answer) {
                    document.getElementById("result").innerText = "正解です";
                    correctCount = correctCount + 1;
                } else {
                    document.getElementById("result").innerText = "不正解です";
                }

                //選択肢のボタンを全部押せなくする
                let buttons = choicesArea.children;
                for (let j = 0; j < buttons.length; j++) {
                    buttons[j].disabled = true;
                }
            });

            choicesArea.appendChild(button);
        }
    } else {
        //入力式：入力欄を表示する
        document.getElementById("answerInput").style.display = "inline";
        document.getElementById("submitBtn").style.display = "inline";
    }
}

showQuestion();

//正誤判定
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
        document.getElementById("result").innerText = "不正解です";
    }

    document.getElementById("submitBtn").disabled = true;
});

//次の問題へ
document.getElementById("nextBtn").addEventListener("click", function() {
    currentIndex = currentIndex + 1;

    if (currentIndex < quizzes.length) {
        showQuestion();
    } else {
        document.getElementById("question").innerText = quizzes.length + "問中" + correctCount + "問正解でした！";
        document.getElementById("choicesArea").innerHTML = "";
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

    document.getElementById("nextBtn").style.display = "inline";
    document.getElementById("restartBtn").style.display = "none";

    showQuestion();

});
