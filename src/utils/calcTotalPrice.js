export const calcTotalPrice = (items) => {
  return items.reduce((sum, obj) => obj.price * obj.quantity + sum, 0);
};
