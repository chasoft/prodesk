const { customAlphabet } = require("nanoid")
const alphabet = "0123456789"

/**
 * Note: i love id with only numbers
 * but when using _.set from lodash,
 * if we use path with id only number,
 * lodash will create array instead of expected object
 * that's why i add a letter i at the end of the id
 */

function nanoid() {
	return customAlphabet(alphabet, 12)() + "i"
}

export default nanoid