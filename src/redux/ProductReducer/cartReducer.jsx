import { createSlice } from "@reduxjs/toolkit";

// Hàm để lấy giỏ hàng từ localStorage
const cartDefault = () => {
  const cartData = localStorage.getItem("cart");
  return cartData ? JSON.parse(cartData) : [];
};

// Hàm để lấy lịch sử đơn hàng từ localStorage
const orderHistoryDefault = () => {
  const orderHistoryData = localStorage.getItem("orderHistory");
  return orderHistoryData ? JSON.parse(orderHistoryData) : [];
};

const initialState = {
  cart: cartDefault(),
  orderHistory: orderHistoryDefault(),
};

const cartReducer = createSlice({
  name: "cartReducer",
  initialState,
  reducers: {
    addProductAction: (state, action) => {
      const { payload } = action;
      const itemCart = state.cart.find((item) => item.id === payload.id);
      if (itemCart) {
        itemCart.quantity += payload.quantity;
      } else {
        state.cart.push(payload);
      }
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
    changeQuantityProductAction: (state, action) => {
      const { payload } = action;
      const itemCart = state.cart.find((item) => item.id === payload.id);
      if (itemCart) {
        itemCart.quantity = Math.max(itemCart.quantity + payload.quantity, 1);
      }
    },
    removeProductAction: (state, action) => {
      const id = action.payload;
      state.cart = state.cart.filter((item) => item.id !== id);
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
    submitOrderAction: (state) => {
      // Cập nhật lịch sử đơn hàng
      const updatedOrderHistory = [...state.orderHistory, state.cart];
      state.orderHistory = updatedOrderHistory;
      localStorage.setItem("orderHistory", JSON.stringify(updatedOrderHistory));

      // Xóa giỏ hàng
      state.cart = [];
      localStorage.removeItem("cart");
    },
  },
});

export const {
  addProductAction,
  changeQuantityProductAction,
  removeProductAction,
  submitOrderAction,
} = cartReducer.actions;

export default cartReducer.reducer;
