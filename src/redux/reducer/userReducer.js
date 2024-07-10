import { ADD_CART, DEC_ITEM, DELETE_CART, INC_ITEM, USER_LOGIN, USER_LOGOUT } from "../action/userAction";

const INIT = {
<<<<<<< Updated upstream
    token: '',
=======
    id: '',
    username: '',
    password: '',
    role: '',
>>>>>>> Stashed changes
    isAuthenticated: false
}

const userReducer = (state = INIT, action) => {
    switch (action.type) {
        case USER_LOGIN:
            return {
                ...state,
<<<<<<< Updated upstream
                token: action.payload,
=======
                id: action.payload.id,
                username: action.payload.username,
                password: action.payload.password,
                role: action.payload.role,
>>>>>>> Stashed changes
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