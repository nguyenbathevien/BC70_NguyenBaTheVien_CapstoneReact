import { createSlice } from "@reduxjs/toolkit";
import {
  Email,
  http,
  navigateHistory,
  setCookie,
  TOKEN,
  USER_LOGIN,
} from "../../util/setting";
let getUserLoginDefault = () => {
  const storedUser = localStorage.getItem(USER_LOGIN);
  if (storedUser) {
    return JSON.parse(storedUser);
  }
  return null;
};
const initialState = {
  userLogin: getUserLoginDefault(),
  userRegister: {
    id: 0,
    password: "",
    name: "",
    phone: "",
    gender: true,
  },
  profile: {},
};

const userReducer = createSlice({
  name: "userReducer",
  initialState,
  reducers: {
    setUserLogicAction: (state, action) => {
      state.userLogin = action.payload;
    },
    setUserRegisterAction: (state, action) => {
      state.userRegister = action.payload;
    },
    setProfileAction: (state, action) => {
      state.profile = action.payload;
    },
  },
});

export const { setUserLogicAction, setUserRegisterAction, setProfileAction } =
  userReducer.actions;

export default userReducer.reducer;

export const loginActionAsync = (userLoginModel) => {
  return async (dispatch) => {
    const res = await http.post("/Users/signin", userLoginModel);
    const token = res.data.content.accessToken;
    const userLogin = JSON.stringify(res.data.content);
    const userEmail = res.data.content.email;
    localStorage.setItem(Email, userEmail);
    localStorage.setItem(TOKEN, token);
    localStorage.setItem(USER_LOGIN, userLogin);
    setCookie(TOKEN, token, 7);
    const action = setUserLogicAction(res.data.content);
    dispatch(action);
  };
};
// Trong userReducer.js
export const loginActionFBAsync = (TokenFB) => {
  return async (dispatch) => {
    try {
      const res = await http.post("/Users/facebooklogin", {
        facebookToken: TokenFB,
      });

      // Kiểm tra kết quả trả về từ server
      console.log("Response từ server:", res.data);

      // Giả sử token nằm trong res.data.content.accessToken
      const token = res.data.content.accessToken;
      const userLogin = res.data.content;

      // Lưu trữ accessToken và cập nhật state người dùng
      localStorage.setItem(TOKEN, token);
      localStorage.setItem(USER_LOGIN, JSON.stringify(userLogin));

      const action = setUserLogicAction(userLogin);
      dispatch(action);

      alert("Đăng nhập Facebook thành công!");
      navigateHistory.push("/profile");
    } catch (err) {
      console.log("Error: ", err);
      alert("Đăng nhập Facebook thất bại!");
    }
  };
};

// Hàm callback từ Facebook
const responseFacebook = (response) => {
  console.log("Response từ Facebook:", response);
  const actionthunk = loginActionFBAsync(response.accessToken);
  dispatch(actionthunk);
};

export const registerActionAsync = (userRegisterModel) => {
  return async (dispatch) => {
    const res = await http.post("/Users/signup", userRegisterModel);
    const action = setUserRegisterAction(res.data.content);
    dispatch(action);
  };
};
export const profileActionAsync = async (dispatch) => {
  try {
    const res = await http.post("/Users/getProfile");
    const action = setProfileAction(res.data.content);
    dispatch(action);
  } catch (err) {
    console.log(err);
  }
};
