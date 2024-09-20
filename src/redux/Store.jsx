import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./ProductReducer/productsReducer";
import cartReducer from "./ProductReducer/cartReducer";
import userReducer from "./ProductReducer/userReducer";

export const Store = configureStore({
  reducer: {
    productsReducer: productsReducer,
    cartReducer: cartReducer,
    userReducer: userReducer,
  },
});
