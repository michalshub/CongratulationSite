export function setUserName(name) {
    return { type: "SET_USER_NAME", payload: name }
}

export function setUserMail(email) {
    return { type: "SET_USER_MAIL", payload: email }
}

export function setUserPassword(password) {
    return { type: "SET_USER_PASSWORD", payload: password }
}

export function setUserToken(token) {
    return { type: "SET_USER_TOKEN", payload: token }
}

export function setUserCongratulation(congratulation) {
    return { type: "SET_USER_CONGRATULATION", payload: congratulation }
}