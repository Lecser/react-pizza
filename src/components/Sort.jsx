import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectFilterSort } from "../redux/filter/selectors";
import { setSort } from "../redux/filter/slice";
import { ReactComponent as ArrowIcon } from "../assets/img/arrow-top.svg";

export const sortList = [
  { name: "Cначала популярные", sortProperty: "rating", order: "desc" },
  { name: "Cначала дорогие", sortProperty: "price", order: "desc" },
  { name: "Cначала недорогие", sortProperty: "_price", order: "asc" },
];

function Sort() {
  const [open, setOpen] = useState(false);
  const { name, sortProperty } = useSelector(selectFilterSort);
  const dispatch = useDispatch();

  const onClickListItem = (listObj) => {
    dispatch(setSort(listObj));
    setOpen(false);
  };

  return (
    <div tabIndex={0} onBlur={() => setOpen(false)} className="sort">
      <div className="sort__label">
        <ArrowIcon />
        <b>Сортировка по:</b>
        <span onClick={() => setOpen(!open)}>{name.toLowerCase()}</span>
      </div>
      {open && (
        <div className="sort__popup">
          <ul>
            {sortList.map((el, index) => {
              return (
                <li
                  onClick={() => onClickListItem(el)}
                  key={index}
                  className={sortProperty === el.sortProperty ? "active" : ""}
                >
                  {el.name}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Sort;
