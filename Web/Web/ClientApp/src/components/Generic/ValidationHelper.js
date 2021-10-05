export function validateEmail(email) {
	const emailRegex = /\S+@\S+\.\S+/

	if (emailRegex.test(email)) {
		return true
	}

	return false
}

