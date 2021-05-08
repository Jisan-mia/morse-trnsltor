const textAreaInput = document.querySelector("#textAreaInput");
const morseAreaInput = document.querySelector("#morseAreaInput");

// morse code key vales
const MORSE_CODE = {
	"-----": "0",
	".----": "1",
	"..---": "2",
	"...--": "3",
	"....-": "4",
	".....": "5",
	"-....": "6",
	"--...": "7",
	"---..": "8",
	"----.": "9",
	".-": "A",
	"-...": "B",
	"-.-.": "C",
	"-..": "D",
	".": "E",
	"..-.": "F",
	"--.": "G",
	"....": "H",
	"..": "I",
	".---": "J",
	"-.-": "K",
	".-..": "L",
	"--": "M",
	"-.": "N",
	"---": "O",
	".--.": "P",
	"--.-": "Q",
	".-.": "R",
	"...": "S",
	"-": "T",
	"..-": "U",
	"...-": "V",
	".--": "W",
	"-..-": "X",
	"-.--": "Y",
	"--..": "Z",
	"-.-.--": "!",
	".-.-.-": ".",
	"--..--": ",",
};

// MORSE_CODE obj keys to values and values to keys odolbodl
const odolBodolFunc = (keys, values) => {
	let obj = {};

	for (let i = 0; i < keys.length; i++) {
		obj[values[i]] = keys[i];
	}
	return obj;
};
const morseKeys = Object.keys(MORSE_CODE);
const morseValues = Object.values(MORSE_CODE);
const odolBodolMorse = odolBodolFunc(morseKeys, morseValues);

//text input validate
const checkTextInputValidation = (input) => {
	textAreaInput.value = textAreaInput.value.replace(input, "");

	textAreaInput.style.borderColor = "red";
	setTimeout(() => {
		textAreaInput.style.borderColor = "#3273dc";
	}, 400);
};

// text to morse code
const onTextInput = (e) => {
	// JISAN MIA
	const text = e.value.toUpperCase();
	const word = text.split(" ");
	const letters = word.map((char) => char.split(""));
	let morse = [];
	for (let x = 0; x < letters.length; x++) {
		morse[x] = [];
		for (let y = 0; y < letters[x].length; y++) {
			if (odolBodolMorse[letters[x][y]]) {
				morse[x].push(odolBodolMorse[letters[x][y]]);
			} else {
				checkTextInputValidation(letters[x][y]);
			}
		}
	}
	if (text) {
		morseAreaInput.value = morse.map((word) => word.join(" ")).join("   ");
	} else {
		morseAreaInput.value = "";
	}
};

//morse code validate
const checkMorseValidation = (input) => {
	morseAreaInput.value = input.replace(/[^.-\s]/g, "");
	const x = /[^.-\s]/g.test(input); //invalid input true
	if (x) {
		morseAreaInput.style.borderColor = "red";
		setTimeout(() => {
			morseAreaInput.style.borderColor = "#3273dc";
		}, 400);
	}
};

// morse code to text
const onMorseInput = (e) => {
	const morseInput = e.value;
	// .--- .. ... .- -.   -- .. .-
	checkMorseValidation(e.value);

	const morseToText = morseInput
		.split("   ")
		.map((word) =>
			word
				.split(" ")
				.map((char) => MORSE_CODE[char])
				.join("")
		)
		.join(" ")
		.trim();

	/*
	# Another solution
	let morseToTextV2 = [];
	const word = morseInput.split("   ");
	const letters = word.map((char) => char.slit(" "));

	for (let x = 0; x < letters.length; x++) {
		morseToTextV2[x] = [];
		for (let y = 0; y < letters[x].length; y++) {
			if (MORSE_CODE[letters[x][y]]) {
				morseToTextV2[x].push(MORSE_CODE[letters[x][y]]);
			}
		}
	}
	*/
	if (morseAreaInput.value) {
		textAreaInput.value = morseToText;
	} else {
		textAreaInput.value = "";
	}
};
