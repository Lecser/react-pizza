import React from "react";
import { Link } from "react-router-dom";
import { CartItem } from "../components/CartItem/CartItem";
import { ReactComponent as CartIcon } from "../assets/img/cart.svg";
import { ReactComponent as TrashIcon } from "../assets/img/trash.svg";
import { ReactComponent as ArrowIcon } from "../assets/img/grey-arrow-left.svg";
import { useDispatch, useSelector } from "react-redux";
import { selectCart } from "../redux/cart/selectors";
import { clearCart } from "../redux/cart/slice";
import { CartEmpty } from "../components/CartEmpty/CartEmpty";
import { calcTotalPizzasCount } from "../utils/calcTotalPizzasCount";

export const Cart = () => {
  const { cartItems, totalPrice } = useSelector(selectCart);
  const totalPizzasCount = calcTotalPizzasCount(cartItems);
  const dispatch = useDispatch();
  const clearCartHandler = () => {
    dispatch(clearCart());
  };
  return !cartItems.length > 0 ? (
    <CartEmpty />
  ) : (
    <div className="container container--cart">
      <div className="cart">
        <div className="cart__top">
          <h2 className="content__title">
            <CartIcon />
            Корзина
          </h2>
          <div className="cart__clear">
            <TrashIcon />
            <span onClick={clearCartHandler}>Очистить корзину</span>
          </div>
        </div>
        <div className="content__items">
          {cartItems.map((i) => (
            <CartItem key={i.id} {...i} />
          ))}
        </div>
        <div className="cart__bottom">
          <div className="cart__bottom-details">
            <span>
              Всего пицц: <b>{totalPizzasCount} шт.</b>{" "}
            </span>
            <span>
              Сумма заказа: <b>{totalPrice} ₽</b>{" "}
            </span>
          </div>
          <div className="cart__bottom-buttons">
            <Link
              to="/"
              className="button button--outline button--add go-back-btn"
            >
              <ArrowIcon />
              <span>Вернуться назад</span>
            </Link>
            <div className="button pay-btn">
              <span>Оплатить сейчас</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
