import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { http } from "../../util/setting";
const initialState = {
  arrProduct: [],
  prodDetail: {},
};

const productsReducer = createSlice({
  name: "productsReducer",
  initialState,
  reducers: {
    setProductAction: (state, action) => {
      state.arrProduct = action.payload;
    },
    setProductDetailAction: (state, action) => {
      state.prodDetail = action.payload;
    },
  },
});

export const {
  setProductAction,
  setProductDetailAction,
  setProductSearchAction,
} = productsReducer.actions;

export default productsReducer.reducer;
export const getProductApiActionThunk = () => {
  return async (dispatch) => {
    const res = await http.get("/Product");
    const actionPayload = setProductAction(res.data.content);
    dispatch(actionPayload);
  };
};

export const getProductDetailByIdActionThunk = (id) => {
  return async (dispatch) => {
    const res = await http.get(`/Product/getbyid?id=${id}`);
    const action = setProductDetailAction(res.data.content);
    dispatch(action);
  };
};
