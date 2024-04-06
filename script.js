encodeDict = {
  A: "↙️⬇️",
  B: "⬅️⬇️",
  C: "↖️⬇️",
  D: "⬆️⬇️",
  E: "⬇️↗️",
  F: "⬇️➡️",
  G: "⬇️↘️",
  H: "⬅️↙️",
  I: "↖️↙️",
  J: "⬆️➡️",
  K: "↙️⬆️",
  L: "↙️↗️",
  M: "↙️➡️",
  N: "↙️↘️",
  O: "⬅️↖️",
  P: "⬅️⬆️",
  Q: "⬅️↗️",
  R: "⬅️➡️",
  S: "⬅️↘️",
  T: "↖️⬆️",
  U: "↖️↗️",
  V: "⬆️↘️",
  W: "↗️➡️",
  X: "↗️↘️",
  Y: "↖️➡️",
  Z: "↘️➡️",
  1: "↙️⬇️",
  2: "⬅️⬇️",
  3: "↖️⬇️",
  4: "⬆️⬇️",
  5: "⬇️↗️",
  6: "⬇️➡️",
  7: "⬇️↘️",
  8: "⬅️↙️",
  9: "↖️↙️",
  0: "↙️⬆️",
  " ": "⬇️⬇️",
  "#": "⬆️↗️",
};

decodeNum = {
  "↙⬇": "1",
  "⬅⬇": "2",
  "↖⬇": "3",
  "⬆⬇": "4",
  "⬇↗": "5",
  "⬇➡": "6",
  "⬇↘": "7",
  "⬅↙": "8",
  "↖↙": "9",
  "↙⬆": "0",
};
decodeAbc = {
  "↙⬇": "A",
  "⬅⬇": "B",
  "↖⬇": "C",
  "⬆⬇": "D",
  "⬇↗": "E",
  "⬇➡": "F",
  "⬇↘": "G",
  "⬅↙": "H",
  "↖↙": "I",
  "⬆➡": "J",
  "↙⬆": "K",
  "↙↗": "L",
  "↙➡": "M",
  "↙↘": "N",
  "⬅↖": "O",
  "⬅⬆": "P",
  "⬅↗": "Q",
  "⬅➡": "R",
  "⬅↘": "S",
  "↖⬆": "T",
  "↖↗": "U",
  "⬆↘": "V",
  "↗➡": "W",
  "↗↘": "X",
  "↖➡": "Y",
  "↘➡": "Z",
  "⬇⬇": " "
};

const pbox = document.getElementById("plaintext");
pbox.addEventListener("input", pboxScript);

const sbox = document.getElementById("semaphore");
sbox.addEventListener("input", sboxScript);

const errbox = document.getElementById("errbox");

function isNum(input) {
  return !isNaN(input) && input != " ";
}

function encode(plaintext) {
  plaintext = plaintext.replace(/[^a-zA-Z0-9\s]/g, "").toUpperCase();
  let encoded = "";
  let isNumbers = !isNum(plaintext[0]);

  Array.from(plaintext).forEach((character) => {
    if (!isNumbers && isNum(character)) {
      // indicates a switch to numbers

      isNumbers = true;
      encoded += encodeDict["#"];
    } else if (isNumbers && !isNum(character)) {
      // Switching from numbers to letters
      isNumbers = false;
      encoded += encodeDict["J"]; // J represents the start of alphabetical characters
    }
    encoded += encodeDict[character];
  });
  return encoded;
}

function decode(cipher) {
  cipher = cipher.replace(/\uFE0F/g, ""); // Unicode drove me mad. Cannot seem to nicely loop over multiple code point emoji arrows with the FE0F selector, so we strip em.
  decoded = "";

  numMode = false;
  if (cipher[0] + cipher[1] == "⬆➡") cipher = cipher.slice(2);

  for (let i = 0; i < cipher.length; i += 2) {
    chunk = cipher[i] + cipher[i + 1]
    if (chunk == "⬆↗"){ // Represents the # character
       numMode = true;
      continue;

    }
    else if (numMode && decodeAbc[chunk] == "J") { // why do numbers get a symbol but letters dont!???
      numMode = false;
      continue;
    }
    chunk = numMode
      ? decodeNum[chunk]
      : decodeAbc[chunk];
    
      decoded += chunk ? chunk : "?"; // If semaphore is improperly formed command, ? will appear

  }

  return decoded;
}

function sboxScript() {
  if (/[^⬅️↘️⬆️⬇️↙️⬇️⬅️↘️⬆️⬇️↙⬇↘⬅➡↖⬆↗\s]/.test(sbox.value)) {
    errbox.textContent = "Illegal characters in semaphore box!";
    pbox.value = "";
  } else {
    errbox.textContent = "";
    pbox.value = decode(sbox.value);
  }
}

function pboxScript() {
  if (/[^a-zA-Z0-9\s]/.test(pbox.value)) {
    errbox.textContent = "Illegal characters in plaintext!";
    sbox.value = "";
  } else {
    errbox.textContent = "";
    sbox.value = encode(pbox.value);
  }
}
