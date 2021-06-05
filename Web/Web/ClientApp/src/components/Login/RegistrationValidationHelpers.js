export function validateEmail(email) {
	const emailRegex = /\S+@\S+\.\S+/

	if (emailRegex.test(email)) {
		return true
	}

	return false
}

export function validateUsername(username) {
	if (username.length >= 8) {
		return true
	}

	return false
}

export function validatePassword(password) {
	const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/

	if (passwordRegex.test(password)) {
		return true
	}

	return false
}

export function validatePasswordMatch(password, matchedPassword) {
	if (password === matchedPassword) {
		return true
	}

	return false
}

export function validateName(lastName) {
	if (lastName === '') {
		return false
	}

	return true;
}
