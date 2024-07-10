import { USER_LOGIN, USER_LOGOUT } from "../action/userAction";

const INIT = {
<<<<<<< HEAD
    username: '',
    password: '',
    role: '',
=======
<<<<<<< Updated upstream
    token: '',
=======
    id: '',
    username: '',
    password: '',
    role: '',
>>>>>>> Stashed changes
>>>>>>> admin
    isAuthenticated: false
}

const userReducer = (state = INIT, action) => {
    switch (action.type) {
        case USER_LOGIN:
            return {
                ...state,
<<<<<<< HEAD
                username: action.payload.username,
                password: action.payload.password,
                role: action.payload.role,
=======
<<<<<<< Updated upstream
                token: action.payload,
=======
                id: action.payload.id,
                username: action.payload.username,
                password: action.payload.password,
                role: action.payload.role,
>>>>>>> Stashed changes
>>>>>>> admin
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