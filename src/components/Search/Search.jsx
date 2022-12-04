import React, { useRef, useState } from "react";
import classes from "./Search.module.scss";
import { ReactComponent as SearchIcon } from "../../assets/img/seacrh-icon.svg";
import { ReactComponent as ClearIcon } from "../../assets/img/clear-icon.svg";

export const Search = (props) => {
  const { searchValue, searchValueHandler } = props;
  const [value, setValue] = useState("");
  const onChangeCallback = (e) => {
    searchValueHandler(e.currentTarget.value);
    setValue(e.currentTarget.value);
  };

  const inputRef = useRef();
  const onClickClose = () => {
    searchValueHandler("");
    setValue("");
    inputRef.current?.focus();
  };
  return (
    <div className={classes.root}>
      <SearchIcon className={classes.icon} />
      <input
        ref={inputRef}
        value={value}
        className={classes.input}
        placeholder={"Поиск пиццы..."}
        type="text"
        onChange={onChangeCallback}
      />
      {searchValue && (
        <ClearIcon onClick={onClickClose} className={classes.clearIcon} />
      )}
    </div>
  );
};
