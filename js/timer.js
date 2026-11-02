//設定（ここを書き換えれば時間を変えられる）
const WORK_MIN = 25;                        //作業時間（分）
const SHORT_BREAK_MIN = 10;                  //作業の間の休憩（分）
const SWITCH_BREAK_MIN = 10;                //教本と制作の間の休憩（分）
const TEXTBOOK_SETS = 2;                    //教本の作業回数


//状態（タイマーが動くと変わっていく値）
let phase = "textbookWork";                 //今の段階
let remainingSeconds = WORK_MIN * 60;       //残り時間（秒）
let textbookCount = 0;                      //教本の作業が終わった回数
let makeCount = 0;                          //制作の作業が終わった回数

let timerId = null;                         //動いているタイマーの番号（止まっているときはnull）
let audioCtx = null;                        //音を鳴らすための道具（最初の開始で用意する）

//段階ごとの表示名
const PHASE_LABELS = {
    textbookWork: "教本・作業中",
    textbookBreak: "教本・休憩中",
    switchBreak: "切り替え休憩",
    makeWork: "制作・作業中",
    makeBreak: "制作・休憩中"
};

//画面を今の状態に合わせて書き換える
function updateDisplay() {
    let minutes = Math.floor(remainingSeconds / 60);
    let seconds = remainingSeconds % 60;

    document.getElementById("mode").innerText = PHASE_LABELS[phase];
    document.getElementById("time").innerText = String(minutes).padStart(2, "0") + ":" + String(seconds).padStart(2, "0");
    document.getElementById("count").innerText = "教本" + textbookCount + "回 / 制作" + makeCount + "回";

    document.getElementById("mode").className = phase;
    document.getElementById("time").className = phase;
}

updateDisplay();

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
    if (phase === "textbookWork") {
        textbookCount = textbookCount + 1;

        if (textbookCount < TEXTBOOK_SETS) {
            phase = "textbookBreak";
            remainingSeconds = SHORT_BREAK_MIN * 60;
        } else {
            phase = "switchBreak";
            remainingSeconds = SWITCH_BREAK_MIN * 60;
        }

    } else if (phase === "textbookBreak") {
        phase = "textbookWork";
        remainingSeconds = WORK_MIN * 60;

    } else if (phase === "switchBreak") {
        phase = "makeWork";
        remainingSeconds = WORK_MIN * 60;

    } else if (phase === "makeWork") {
        makeCount = makeCount + 1;
        phase = "makeBreak";
        remainingSeconds = SHORT_BREAK_MIN * 60;

    } else if (phase === "makeBreak") {
        phase = "makeWork";
        remainingSeconds = WORK_MIN * 60;
    }
}

//1秒ごとに呼ばれる処理
function tick() {
    remainingSeconds = remainingSeconds - 1;

    if (remainingSeconds <= 0) {
        nextPhase();

        if (phase === "textbookWork" || phase === "makeWork") {
            playBeep(880);  //作業が始まる：高い音
        } else {
            playBeep(523);  //休憩が始まる：低い音
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

    phase = "textbookWork";
    remainingSeconds = WORK_MIN * 60;
    textbookCount = 0;
    makeCount = 0;

    updateDisplay();
})