// * Registering emojis
let emojis = [
	"\u{1F33D}", // 🌽 コーン
	"\u{1F344}", // 🍄 マッシュルーム
	"\u{1F345}", // 🍅 トマト
	"\u{1F346}", // 🍆 ナス
	"\u{1F347}", // 🍇 ブドウ
	"\u{1F348}", // 🍈 メロン
	"\u{1F349}", // 🍉 スイカ
	"\u{1F34A}", // 🍊 ミカン
	"\u{1F34C}", // 🍌 バナナ
	"\u{1F34D}", // 🍍 パイナップル
	"\u{1F34E}", // 🍎 リンゴ
	"\u{1F351}", // 🍑 桃
	"\u{1F352}", // 🍒 チェリー
	"\u{1F353}", // 🍓 イチゴ
	"\u{1F354}", // 🍔 ハンバーガー
	"\u{1F355}", // 🍕 ピザ
	"\u{1F356}", // 🍖 肉
	"\u{1F357}", // 🍗 チキン
	"\u{1F359}", // 🍙 おにぎり（別形）
	"\u{1F35A}", // 🍚 ご飯
	"\u{1F35B}", // 🍛 カレーライス
	"\u{1F35C}", // 🍜 ラーメン
	"\u{1F35D}", // 🍝 スパゲッティ
	"\u{1F35E}", // 🍞 パン
	"\u{1F35F}", // 🍟 フライドポテト
	"\u{1F360}", // 🍠 さつまいも
	"\u{1F361}", // 🍡 みたらし団子
	"\u{1F362}", // 🍢 串カツ
	"\u{1F363}", // 🍣 寿司
	"\u{1F364}", // 🍤 エビフライ
	"\u{1F365}", // 🍥 鯛焼き
	"\u{1F366}", // 🍦 アイスクリーム
	"\u{1F367}", // 🍧 かき氷
	"\u{1F368}", // 🍨 アイスクリーム（カップ）
	"\u{1F369}", // 🍩 ドーナツ
	"\u{1F36A}", // 🍪 クッキー
	"\u{1F36B}", // 🍫 チョコレート
	"\u{1F36C}", // 🍬 キャンディ
	"\u{1F36D}", // 🍭 ロリポップ
	"\u{1F36E}", // 🍮 カスタードプリン
	"\u{1F36F}", // 🍯 ハチミツ
	"\u{1F370}", // 🍰 ケーキ
	"\u{1F371}", // 🍱 弁当
	"\u{1F372}", // 🍲 鍋料理
	"\u{1F375}", // ☕ ホットドリンク
	"\u{1F376}", // 🍷 ワイングラス
	"\u{1F378}", // 🍸 カクテル
	"\u{1F379}", // 🍹 トロピカルドリンク
	"\u{1F37A}", // 🍺 ビール
];

const FIELD = document.querySelector("#field");
const TARGET = document.querySelector("#targetEmoji");
const TIMEUP = document.querySelector("#timeUp");
const TIMER = document.querySelector("#timer");


function Play() {
	// * Shuffle the emoji list
	for (let i = 0; i < emojis.length; i++) {
		let random = Math.round(Math.random() * 47);
		let temp = emojis[i];
		emojis[i] = emojis[random];
		emojis[random] = temp;
	}

	// * Add new P emojis, add info and insert into html
	let positionX = 229
	let positionY = -8;
	let positionZ = PositionRandom();

	for (let i = 0; i < emojis.length; i++) {

		let newP = document.createElement("p")
		newP.textContent = emojis[i];
		newP.style.right = `${positionX}px`;
		newP.style.top = `${positionY}px`;
		newP.style.zIndex = `${positionZ}`;
		positionX -= 39;
		positionZ = PositionRandom();

		// * Return to next row
		if (i == 6 || i == 13 || i == 20 || i == 27 || i == 34 || i == 41) {
			positionY -= 34;
			positionX = 229;
		}
		FIELD.append(newP);
	}

	// * Choose the level of layer randomly
	function PositionRandom() {
		let rnd = Math.round(Math.random() * 9);
		if (0 < rnd && rnd < 9) {
			return rnd;
		}
		else {
			PositionRandom();
		}
	}


	// * Pick up a target emoji to find
	let random = Math.round(Math.random() * 47);
	let target = document.querySelector(`#field p:nth-child(${random})`);


	// * Action when the target emoji is found
	target.addEventListener('click', () => {
		clearInterval(INTERVAL);
		OVERLAY.style.display = "block";
		FOUND.style.display = "block";
		clickCount = 0;
	})
	
	TARGET.textContent = target.textContent;
}

Play(60);

// * Popups
const OVERLAY = document.querySelector("#overlay");
const FOUND = document.querySelector("#found");


// * Action when the user clicks more than 3 times
let clickCount = 0;
const CLICK3 = document.querySelector("#click3");

FIELD.addEventListener('click', () => {
	clickCount++;
	if (clickCount >= 3) {
		OVERLAY.style.display = "block";
		CLICK3.style.display = "block";
		clickCount = 0;
		clearInterval(INTERVAL)
	}
})

// * Action when the time is up

let timeLeft = 30;
TIMER.textContent = timeLeft;

function updateTimer() {
	if (timeLeft > 0) {
		timeLeft--;
		TIMER.textContent = timeLeft;
	}
	else {
		clearInterval(INTERVAL)
		OVERLAY.style.display = "block";
		TIMEUP.style.display = "block";
	}
}
let INTERVAL = setInterval(updateTimer, 1000);

// * Replay buttons
const EASY = document.querySelectorAll(".easy");
const NORMAL = document.querySelectorAll(".normal");
const DIFFICULT = document.querySelectorAll(".difficult");

EASY.forEach(element => {
	element.addEventListener('click', () => {
	
		// * Clear the field
		const PARAGRAPHS = FIELD.querySelectorAll("p");
		PARAGRAPHS.forEach(p => {
			p.remove();
		});
	
		// * Clear the popups
		OVERLAY.style.display = "none";
		FOUND.style.display = "none";
		CLICK3.style.display = "none";
		TIMEUP.style.display = "none";
	
		// * Set timer and play
		clickCount = 0;
		timeLeft = 15;
		TIMER.textContent = timeLeft;
		INTERVAL = setInterval(updateTimer, 1000);
		Play();
	})
});

NORMAL.forEach(element => {
	element.addEventListener('click', () => {
	
		// * Clear the field
		const PARAGRAPHS = FIELD.querySelectorAll("p");
		PARAGRAPHS.forEach(p => {
			p.remove();
		});
	
		// * Clear the popups
		OVERLAY.style.display = "none";
		FOUND.style.display = "none";
		CLICK3.style.display = "none";
		TIMEUP.style.display = "none";
	
		// * Set timer and play
		clickCount = 0;
		timeLeft = 7;
		TIMER.textContent = timeLeft;
		INTERVAL = setInterval(updateTimer, 1000);
		Play();
	})
});

DIFFICULT.forEach(element => {
	element.addEventListener('click', () => {
	
		// * Clear the field
		const PARAGRAPHS = FIELD.querySelectorAll("p");
		PARAGRAPHS.forEach(p => {
			p.remove();
		});
	
		// * Clear the popups
		OVERLAY.style.display = "none";
		FOUND.style.display = "none";
		CLICK3.style.display = "none";
		TIMEUP.style.display = "none";
	
		// * Set timer and play
		clickCount = 0;
		timeLeft = 3;
		TIMER.textContent = timeLeft;
		INTERVAL = setInterval(updateTimer, 1000);
		Play();
	})
});