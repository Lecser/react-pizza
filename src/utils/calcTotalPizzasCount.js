export const calcTotalPizzasCount = (items) => {
  return items.reduce((acc, el) => acc + el.quantity, 0);
};
