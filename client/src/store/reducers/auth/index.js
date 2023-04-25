import { createSlice } from "@reduxjs/toolkit";
import { fetchRequestWithToken } from "@/config/axios";

const initialState = {
  isLoading: false,
  login: null,
  signup: null,
  token: null,
  success: null,
  error: null,
};

export const STATE_KEY = "auth";

const authSlice = createSlice({
  name: STATE_KEY,
  initialState,
  reducers: {
    // Login
    requestLogin(state) {
      state.isLoading = true;
    },
    requestLoginSuccess(state, action) {
      state.isLoading = false;
      state.success = action?.payload?.response?.message;
      state.login = action.payload.response;
    },
    requestLoginFailed(state, action) {
      state.isLoading = false;
      state.error = action?.payload.error.message;
    },
 
    // Sign up
    requestSignUp(state) {
      state.isLoading = true;
    },
    requestSignUpSuccess(state, action) {
      state.isLoading = false;
      state.success = action?.payload?.response?.message;
      state.signup = action.payload.response;
    },
    requestSignUpFailed(state, action) {
      state.isLoading = false;
      state.error = action?.payload.error.message;
    },

    //verify authorization
    requestAuth(state) {
      state.isLoading = true;
    },
    requestAuthSuccess(state, action) {
      state.isLoading = false;
      state.success = action?.payload?.response?.message;
      state.token = action.payload.response;
    },
    requestAuthFailed(state, action) {
      state.isLoading = false;
      state.error = action?.payload.error.message;
    },

    // clear state
    clearAuth(state) {
      state.error = null;
      state.success = null;
    },
  },
});

export const {
  requestLogin,
  requestLoginFailed,
  requestLoginSuccess,

  requestSignUp,
  requestSignUpFailed,
  requestSignUpSuccess,

  requestAuth,
  requestAuthFailed,
  requestAuthSuccess,

  clearAuth,
} = authSlice.actions;

export const loginUser = (data) => (dispatch) => {
  dispatch(requestLogin());
  fetchRequestWithToken({
    url: `/api/login`,
    method: "POST",
    data,
  })(requestLoginSuccess)(requestLoginFailed)(dispatch);
};

export const signUpUser = (data) => (dispatch) => {
  dispatch(requestSignUp());
  fetchRequestWithToken({
    url: `/api/signup`,
    method: "POST",
    data,
  })(requestSignUpSuccess)(requestSignUpFailed)(dispatch);
};

export const AuthUser = () => (dispatch) => {
  dispatch(requestSignUp());
  fetchRequestWithToken({
    url: `/api/auth`,
    method: "GET",
  })(requestAuthSuccess)(requestAuthFailed)(dispatch);
};

export const authSelector = (state) => state[STATE_KEY];

export default authSlice.reducer;
