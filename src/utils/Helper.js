let characters = ""
let passwordLength = 0

const numbers = "0123456789"
const specialSymbols = "!@#$%^&*()<>,.?/[]{}-=_+|/"
const uppercaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
const lowercaseLetters = "abcdefghijklmnopqrstuvwxyz"

function setProps(condition, prop) {
  if (condition) {
    return (characters += prop)
  }

  return ""
}

function getRandomInteger(min, max) {
  const random = Math.floor(Math.random() * (max - min + 1)) + min
  return random
}

function setPasswordCharacters() {
  let password = ""

  if (characters.length) {
    for (let i = 0; i < passwordLength; i++) {
      password += characters[getRandomInteger(0, characters.length - 1)]
    }

    characters = ""
    passwordLength = 0

    return password
  }
}

function setPasswordLength(length) {
  passwordLength = length
}

export function generatePassword(passwordProps, pwdLength) {
  const { uppercase, lowercase, symbols, numeric } = passwordProps

  setProps(numeric, numbers)
  setProps(symbols, specialSymbols)
  setProps(uppercase, uppercaseLetters)
  setProps(lowercase, lowercaseLetters)

  setPasswordLength(pwdLength)

  const password = setPasswordCharacters()
  return password
}
