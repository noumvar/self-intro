console.log("こんにちは");

document.getElementById("tagline").innerText = "JavaScriptから書き換えました!";

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