import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ReactComponent as PlusIcon } from "../../assets/img/plus.svg";
import { addItem } from "../../redux/cart/slice";
import { selectCartItemsById } from "../../redux/cart/selectors";

function PizzaBlock(props) {
  const { title, price, imageUrl, sizes, types, id } = props;
  const dispatch = useDispatch();
  const cartItemsId = useSelector(selectCartItemsById(id));
  const [activeType, setActiveType] = useState(0);
  const [activeSize, setActiveSize] = useState(0);
  const typeNames = ["тонкое", "традиционное"];
  const addCartItemHandler = () => {
    dispatch(
      addItem({
        ...props,
        types: typeNames[activeType],
        sizes: sizes[activeSize],
      })
    );
  };

  const addedQuantity = cartItemsId ? cartItemsId.quantity : 0;

  return (
    <div className="pizza-block-wrapper">
      <div className="pizza-block">
        <img className="pizza-block__image" src={imageUrl} alt="Pizza" />
        <h4 className="pizza-block__title">{title}</h4>
        <div className="pizza-block__selector">
          <ul>
            {types.map((typeId) => (
              <li
                key={typeId}
                onClick={() => setActiveType(typeId)}
                className={activeType === typeId ? "active" : ""}
              >
                {typeNames[typeId]}
              </li>
            ))}
          </ul>
          <ul>
            {sizes.map((size, index) => (
              <li
                key={size}
                onClick={() => setActiveSize(index)}
                className={activeSize === index ? "active" : ""}
              >
                {size} см.
              </li>
            ))}
          </ul>
        </div>
        <div className="pizza-block__bottom">
          <div className="pizza-block__price">от {price} ₽</div>
          <button
            onClick={addCartItemHandler}
            className="button button--outline button--add"
          >
            <PlusIcon />
            <span>Добавить</span>
            {addedQuantity > 0 && <i>{addedQuantity}</i>}
          </button>
        </div>
      </div>
    </div>
  );
}

export default PizzaBlock;
