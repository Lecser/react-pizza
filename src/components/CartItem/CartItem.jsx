import React from "react";
import { ReactComponent as MinusIcon } from "../../assets/img/minus-icon.svg";
import { ReactComponent as PlusIcon } from "../../assets/img/plus.svg";
import { ReactComponent as RemoveIcon } from "../../assets/img/removeCart-icon.svg";
import { useDispatch } from "react-redux";
import { addItem, minusItem, removeItem } from "../../redux/cart/slice";

export const CartItem = (props) => {
  const dispatch = useDispatch();
  const { title, price, imageUrl, types, sizes, quantity, id } = props;
  const removeItemHandler = (itemId) => {
    dispatch(removeItem(itemId));
  };
  console.log(quantity);
  const minusItemHandler = (itemId) => {
    if (quantity > 1) {
      dispatch(minusItem(itemId));
    } else removeItemHandler(itemId);
  };
  const addItemHandler = (items) => {
    dispatch(addItem(items));
  };
  return (
    <div className="cart__item">
      <div className="cart__item-img">
        <img className="pizza-block__image" src={imageUrl} alt="Pizza" />
      </div>
      <div className="cart__item-info">
        <h3>{title}</h3>
        <p>
          {types} тесто, {sizes} см.
        </p>
      </div>
      <div className="cart__item-count">
        <div
          onClick={() => minusItemHandler(id)}
          className="button button--outline button--circle cart__item-count-minus"
        >
          <MinusIcon />
        </div>
        <b>{quantity}</b>
        <div
          onClick={() => addItemHandler(props)}
          className="button button--outline button--circle cart__item-count-plus"
        >
          <PlusIcon />
        </div>
      </div>
      <div className="cart__item-price">
        <b>{price} ₽</b>
      </div>
      <div className="cart__item-remove">
        <div
          onClick={() => removeItemHandler(id)}
          className="button button--outline button--circle"
        >
          <RemoveIcon />
        </div>
      </div>
    </div>
  );
};
