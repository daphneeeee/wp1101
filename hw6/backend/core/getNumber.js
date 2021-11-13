var number;

function genNumber() {
  number = Math.floor(Math.random() * 100);
  console.log(number);
  return number;
}

function getNumber() {
  return number;
}

export { genNumber, getNumber };
