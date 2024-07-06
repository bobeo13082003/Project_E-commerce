import { ADD_CART, DEC_ITEM, DELETE_CART, INC_ITEM, USER_LOGIN, USER_LOGOUT } from "../action/userAction";

const INIT = {
    token: '',
    isAuthenticated: false
}

const userReducer = (state = INIT, action) => {
    switch (action.type) {
        case USER_LOGIN:
            return {
                ...state,
                token: action.payload,
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