/**
 * To create a new function which will be executed only once!
 * @param {function} callback 
 * @returns a new function
 */
export function once(callback) {
	let res = null
	const runOnce = (...params) => {
		if (res != null) {
			return
		} else {
			res = "Called!"
			callback(...params)
			return
		}
	}
	return runOnce
}
