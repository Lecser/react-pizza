import React, { useCallback } from "react";
import logoSvg from "../assets/img/pizza-logo.svg";
import { Link } from "react-router-dom";
import { Search } from "./Search/Search";
import { useDispatch, useSelector } from "react-redux";
import { selectFilter } from "../redux/filter/selectors";
import { setSearchValue } from "../redux/filter/slice";
import { ReactComponent as CartIcon } from "../assets/img/cart.svg";
import { ReactComponent as PizzaLogoIcon } from "../assets/img/pizza-logo.svg";
import debounce from "lodash.debounce";
import { selectCart } from "../redux/cart/selectors";
import { calcTotalPizzasCount } from "../utils/calcTotalPizzasCount";

export const Header = () => {
  const { searchValue } = useSelector(selectFilter);
  const dispatch = useDispatch();
  const { cartItems, totalPrice } = useSelector(selectCart);
  const searchValueHandler = useCallback(
    debounce((inputValue) => {
      dispatch(setSearchValue(inputValue));
    }, 250),
    [dispatch]
  );

  const totalPizzasCount = calcTotalPizzasCount(cartItems);

  return (
    <div className="header">
      <div className="container">
        <Link to="/">
          <div className="header__logo">
            <PizzaLogoIcon className={"PizzaLogoIcon"} />
            <div>
              <h1>React Pizza V2</h1>
              <p>самая вкусная пицца во вселенной</p>
            </div>
          </div>
        </Link>
        <Search
          searchValue={searchValue}
          searchValueHandler={searchValueHandler}
        />
        <div className="header__cart">
          <Link to={"/cart"} className="button button--cart">
            <span>{totalPrice} ₽</span>
            <div className="button__delimiter"></div>
            <CartIcon />
            <span>{totalPizzasCount}</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
