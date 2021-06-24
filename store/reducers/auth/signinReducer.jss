import { GET_SIGNIN_SUCCESS, GET_SIGNIN_ERROR } from "../../actions/action-types/action-names"

const DefaultState = {
    authMsg: ""
};

const SigninReducer = (state = DefaultState, action) => {
    // console.log(state)
    switch (action.type) {
        case GET_SIGNIN_ERROR:
            // console.log("login failed");
            return {
                ...state,
                authMsg: "Unable to login"
            };
        case GET_SIGNIN_SUCCESS:
            // console.log("login success");
            return {
                ...state,
                authMsg: "login success"
            };
    default:
        return state
    }
}

export default SigninReducer;