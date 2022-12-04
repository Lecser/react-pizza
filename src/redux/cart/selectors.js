export const selectCartItemsById = (id) => (state) =>
  state.cart.cartItems.find((i) => i.id === id);
export const selectCart = (state) => state.cart;
