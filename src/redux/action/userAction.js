export const USER_LOGIN = 'USER_LOGIN'
export const USER_LOGOUT = 'USER_LOGOUT'



<<<<<<< HEAD
export const doLogin = (username, password, role) => {
    return {
        type: USER_LOGIN,
        payload: { username, password, role }
=======
<<<<<<< Updated upstream
export const doLogin = (token) => {
    return {
        type: USER_LOGIN,
        payload: token
=======
export const doLogin = (id, username, password, role) => {
    return {
        type: USER_LOGIN,
        payload: { id, username, password, role }
>>>>>>> Stashed changes
>>>>>>> admin
    }
}
export const doLogout = () => {
    return {
        type: USER_LOGOUT,
    }
}



