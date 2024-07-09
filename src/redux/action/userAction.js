export const USER_LOGIN = 'USER_LOGIN'
export const USER_LOGOUT = 'USER_LOGOUT'



export const doLogin = (username, password, role) => {
    return {
        type: USER_LOGIN,
        payload: { username, password, role }
    }
}
export const doLogout = () => {
    return {
        type: USER_LOGOUT,
    }
}



