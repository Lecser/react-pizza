import { createSlice } from "@reduxjs/toolkit";
import { calcTotalPrice } from "../../utils/calcTotalPrice";

const initialState = {
  cartItems: [],
  totalPrice: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
      const findItem = state.cartItems.find((i) => i.id === action.payload.id);
      findItem
        ? findItem.quantity++
        : state.cartItems.push({ ...action.payload, quantity: 1 });
      state.totalPrice = calcTotalPrice(state.cartItems);
    },
    minusItem(state, action) {
      const findItem = state.cartItems.find((i) => i.id === action.payload);
      findItem && findItem.quantity--;
      state.totalPrice = calcTotalPrice(state.cartItems);
    },
    removeItem(state, action) {
      state.cartItems = state.cartItems.filter((i) => i.id !== action.payload);
      state.totalPrice = calcTotalPrice(state.cartItems);
    },
    clearCart(state) {
      state.cartItems = [];
      state.totalPrice = calcTotalPrice(state.cartItems);
    },
  },
});

export const { addItem, removeItem, minusItem, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
