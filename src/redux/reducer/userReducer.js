import { USER_LOGIN, USER_LOGOUT } from "../action/userAction";

const INIT = {

    id: '',
    username: '',
    password: '',
    role: '',
    isAuthenticated: false
}

const userReducer = (state = INIT, action) => {
    switch (action.type) {
        case USER_LOGIN:
            return {
                ...state,
                id: action.payload.id,
                username: action.payload.username,
                password: action.payload.password,
                role: action.payload.role,
                isAuthenticated: true
            }
            break;

        case USER_LOGOUT:
            return INIT;
            break;

        default:
            return state;
            break;
    }

};

export default userReducer;