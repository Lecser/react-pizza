import React from "react";
import classes from "./NotFound.module.scss";

export const NotFoundBlock = () => {
  return (
    <div className={classes.root}>
      <h1>
        <span>😕</span>
        <br />
        Ничего не найдено.
      </h1>
      <p className={classes.description}>
        К сожалению данная страница отсутсвует в нашем интернет магазине.
      </p>
    </div>
  );
};
