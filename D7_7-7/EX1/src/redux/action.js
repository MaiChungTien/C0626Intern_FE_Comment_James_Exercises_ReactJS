import { checkLogin } from "../service/userService";

export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";
export const LOGOUT = "LOGOUT";

// Actions
export const loginRequest = () => ({ type: LOGIN_REQUEST });
export const loginSuccess = (user) => ({ type: LOGIN_SUCCESS, payload: user });
export const loginFailure = (error) => ({ type: LOGIN_FAILURE, payload: error });
export const logout = () => ({ type: LOGOUT });


//MiddleWare
export const loginThunk = (email, password) => {
    return async (dispatch) => {
        dispatch(loginRequest());
        try {
            const response = await checkLogin(email, password);
            if (response.success) {
                dispatch(loginSuccess(response.user));
                return Promise.resolve(response.user); 
            } else {
                dispatch(loginFailure(response.message));
                return Promise.reject(response.message); 
            }
        } catch (error) {
            dispatch(loginFailure("Lỗi kết nối"));
            return Promise.reject("Lỗi kết nối");
        }
    };
};
