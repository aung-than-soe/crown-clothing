import UserActionTypes from "./user.types";

const INITIAL_STATE = {
    currentUser: null
}

const userReducer = (state = INITIAL_STATE, action) => {

    switch (action.type) {
        case UserActionTypes.SIGN_IN_SUCCESS:
            return {
                ...state,
                currentUser: action.payload,
                error: null
            };

        case UserActionTypes.SIGN_OUT_SUCCESS:
            return {
                ...state,
                currentUser: null,
                error: null
            };

        case UserActionTypes.SIGN_IN_FAILED:
        case UserActionTypes.SIGN_OUT_FAILED:    
            return {
                error: action.payload,
                ...state
            };
        default:
            return state;
    }
}

export default userReducer;
