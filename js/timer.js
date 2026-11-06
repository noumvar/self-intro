//設定（ここを書き換えれば時間を変えられる）
const WORK_MIN = 0.1;                        //作業時間（分）
const SHORT_BREAK_MIN = 0.05;                  //作業の間の休憩（分）
const SWITCH_BREAK_MIN = 0.1;                //教本と制作の間の休憩（分）

//学習の種類（上から順に進む）
const SEGMENTS = [
    { name: "教本",             className: "textbook",      sets: 2 },
    { name: "制作 HTML,CSS",    className: "makeWeb",       sets: 1 },
    { name: "制作 JS",          className: "makeJs",        sets: Infinity}
]


//状態（タイマーが動くと変わっていく値）
let segmentIndex = 0;                       //今、何番目の種類か
let isBreak = false;                        //休憩中かどうか
let breakKind = "";                         //休憩の種類（"short"か"switch"）
let remainingSeconds = WORK_MIN * 60;       //残り時間（秒）
let counts = [];                            //種類ごとの作業が終わった回数

let timerId = null;                         //動いているタイマーの番号（止まっているときはnull）
let audioCtx = null;                        //音を鳴らすための道具（最初の開始で用意する）

//回数をすべて0にする
function resetCounts() {
    counts = [];
    for (let i = 0; i < SEGMENTS.length; i++) {
        counts.push(0);
    }
}

resetCounts();

//画面を今の状態に合わせて書き換える
function updateDisplay() {
    let segment =SEGMENTS[segmentIndex];
    let minutes = Math.floor(remainingSeconds / 60);
    let seconds = remainingSeconds % 60;

    //今の段階の名前とクラス名を決める
    let label = "";
    let className = "";

    if (!isBreak) {
        label = segment.name + ".作業中";
        className = segment.className + "Work";
    } else if (breakKind === "short") {
        label = segment.name + ".休憩中";
        className = segment.className + "Break";
    } else {
        label = "切り替え休憩（次：" + SEGMENTS[segmentIndex + 1].name + "）";
        className = "switchBreak";
    }

//ここから

    document.getElementById("mode").innerText = label;
    document.getElementById("mode").className = className;
    document.getElementById("time").innerText = String(minutes).padStart(2, "0") + ":" + String(seconds).padStart(2, "0");
    document.getElementById("time").className = className;

    //回数の表示を種類の数だけ並べる
    let countText = "";
    for (let i = 0; i < SEGMENTS.length; i++) {
        if (i > 0) {
            countText = countText + "/";
        }
        countText = countText + SEGMENTS[i].name + " " + counts[i] + "回";
    }
    document.getElementById("count").innerText = countText;
}

//指定した高さの音を短く鳴らす
function playBeep(frequency) {
    if (audioCtx === null) {
        return;
    }

    const oscillator = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    oscillator.frequency.value = frequency;
    gain.gain.value = 0.2;

    oscillator.connect(gain);
    gain.connect(audioCtx.destination);

    oscillator.start();
    oscillator.stop(audioCtx.currentTime + 0.3);
}

//今の段階が終わったときに、次の段階へ切り替える
function nextPhase() {
    if (!isBreak) {
        let segment = SEGMENTS[segmentIndex];
        let isLast = (segmentIndex === SEGMENTS.length - 1);

        counts[segmentIndex] = counts[segmentIndex] + 1;
        isBreak = true;

        if (counts[segmentIndex] < segment.sets || isLast) {
            breakKind = "short";
            remainingSeconds = SHORT_BREAK_MIN * 60;
        } else {
            breakKind = "switch";
            remainingSeconds = SWITCH_BREAK_MIN * 60;
        }

    } else {
        if (breakKind === "switch") {
            segmentIndex = segmentIndex + 1;
        }
        isBreak = false;
        breakKind = "";
        remainingSeconds = WORK_MIN * 60;
    }
}

//1秒ごとに呼ばれる処理
function tick() {
    remainingSeconds = remainingSeconds - 1;

    if (remainingSeconds <= 0) {
        nextPhase();

        if (isBreak) {
            playBeep(523);  //休憩が始まる：低い音
        } else {
            playBeep(880);  //作業が始まる：高い音
        }
    }

    updateDisplay();
}

//開始
document.getElementById("startBtn").addEventListener("click", function() {
    if (audioCtx === null) {
        audioCtx = new AudioContext();
    }

    if (timerId !== null) {
        return;
    }
    timerId = setInterval(tick, 1000);
});

//一時停止
document.getElementById("pauseBtn").addEventListener("click", function() {
    clearInterval(timerId);
    timerId = null;
})

//リセット
document.getElementById("resetBtn").addEventListener("click", function() {
    clearInterval(timerId);
    timerId = null;

    segmentIndex = 0;
    isBreak = false;
    breakKind = "";
    remainingSeconds = WORK_MIN * 60;
    resetCounts();

    updateDisplay();
});

updateDisplay();
