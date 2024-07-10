export const USER_LOGIN = 'USER_LOGIN'
export const USER_LOGOUT = 'USER_LOGOUT'


export const doLogin = (id, username, password, role) => {
    return {
        type: USER_LOGIN,
        payload: { id, username, password, role }
    }
}
export const doLogout = () => {
    return {
        type: USER_LOGOUT,
    }
}



