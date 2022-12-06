import React from "react";
import emptyCartImg from "../../assets/img/empty-cart.png";
import { Link } from "react-router-dom";

export const CartEmpty = () => {
  return (
    <div className={"cart cart--empty"}>
      <h2>Корзина пустая 😕</h2>
      <p>
        Вероятней всего, вы не добавили пиццу в корзину.
        <br />
        Для того, чтобы добавить пиццу, вернитесь на главную страницу.
      </p>
      <img src={emptyCartImg} alt="emptyCartImg" />
      <Link to={"/"} className={"button button--black"}>
        <span>Вернуться назад</span>
      </Link>
    </div>
  );
};
