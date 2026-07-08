import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { checkLogin } from "../service/userService";
import { AppDispatch } from "./store";

interface User {
  id?: string;
  email?: string;
  name?: string;
  [key: string]: any;
}

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action: PayloadAction<User>) => {
      state.loading = false;
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
    },
  },
});

export const { loginRequest, loginSuccess, loginFailure, logout } =
  authSlice.actions;
export default authSlice.reducer;

export const loginThunk = (email: string, password: string) => {
  return async (dispatch: AppDispatch) => {
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
