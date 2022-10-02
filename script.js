const resultEl = document.getElementById("result");
const lengthEl = document.getElementById("length");
const uppercaseEl = document.getElementById("uppercase");
const lowercaseEl = document.getElementById("lowercase");
const numbersEl = document.getElementById("numbers");
const symbolsEl = document.getElementById("symbols");
const generateEl = document.getElementById("generate");
const clipboardEl = document.getElementById("clipboard");
const copied = document.getElementById("copied");

function getRandomLower() {
  if (lowercaseEl.checked) {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
  }
}

function getRandomUpper() {
  if (uppercaseEl.checked) {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
  }
}

function getRandomNumber() {
  if (numbersEl.checked) {
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
  }
}

function getRandomSymbol() {
  if (symbolsEl.checked) {
    let symbls = "!@#$%^&*";
    return symbls[Math.floor(Math.random() * symbls.length)];
  }
}

let randomFuncs = {
  lower: getRandomLower,
  upper: getRandomUpper,
  number: getRandomNumber,
  symbol: getRandomSymbol,
};

function passwordGen(lower, upper, numbers, symbols, length) {
  let generatedPass = [];
  if (length >= 4 && length <= 20) {
    for (i = 0; i < length; i++) {
      generatedPass.push(lower(), upper(), numbers(), symbols());
    }
    resultEl.textContent = String(generatedPass)
      .replaceAll(",", "")
      .slice(0, length);
  } else if (length < 4) {
    resultEl.innerText = "Minimum 4 Digit";
  } else {
    resultEl.innerText = "Maximum 20 Digit";
  }
}

generateEl.addEventListener("click", () => {
  passwordGen(
    randomFuncs.lower,
    randomFuncs.upper,
    randomFuncs.number,
    randomFuncs.symbol,
    lengthEl.value
  );
});

clipboardEl.addEventListener("click", () => {
  navigator.clipboard.writeText(resultEl.textContent);

  if (!resultEl.textContent) {
    return;
  } else {
    setTimeout(() => {
      copied.textContent = "Password Copied ✔";
      copied.style.display = "block";
    }, 100);

    setTimeout(() => {
      copied.style.display = "none";
      resultEl.textContent = "";
    }, 1200);
  }
});
