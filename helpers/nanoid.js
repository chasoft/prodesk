const { customAlphabet } = require("nanoid")
const alphabet = "0123456789"
const nanoid = customAlphabet(alphabet, 12)

export default nanoid