export const USER_LOGIN = 'USER_LOGIN'
export const USER_LOGOUT = 'USER_LOGOUT'



export const doLogin = (token) => {
    return {
        type: USER_LOGIN,
        payload: token
    }
}
export const doLogout = () => {
    return {
        type: USER_LOGOUT,
    }
}



