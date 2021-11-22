var number;

function genNumber() {
  number = Math.floor(Math.random() * 100);
  console.log(number);
  return number;
}

function getNumber() {
  return number;
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

function getServerGuessNum(min, max) {
  const num = getRandomInt(min, max);
  return num;
}

export { genNumber, getServerGuessNum, getNumber };
