/** Basic client-side validation for auth forms */

export function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email).trim())
}

export function validateLogin({ email, password }) {
  const errors = {}
  if (!String(email).trim()) errors.email = 'errors.required'
  else if (!isValidEmail(email)) errors.email = 'errors.email'
  if (!password) errors.password = 'errors.required'
  else if (String(password).length < 6) errors.password = 'errors.passwordLength'
  return errors
}

export function validateSignup({ name, email, password, confirm }) {
  const errors = {}
  if (!String(name).trim()) errors.name = 'errors.required'
  if (!String(email).trim()) errors.email = 'errors.required'
  else if (!isValidEmail(email)) errors.email = 'errors.email'
  if (!password) errors.password = 'errors.required'
  else if (String(password).length < 6) errors.password = 'errors.passwordLength'
  if (password !== confirm) errors.confirm = 'errors.passwordMatch'
  return errors
}
