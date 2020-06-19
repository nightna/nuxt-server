const randomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

const generateArray = (count, min, max) => {
  return Array(count)
    .fill(0)
    .map((e) => randomNumber(min, max))
}

const randomValue = (arr) => {
  const len = arr.length
  const num = randomNumber(0, len - 1)
  return arr[num]
}

module.exports = {
  randomNumber,
  generateArray,
  randomValue
}
