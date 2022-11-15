import React from "react";
import classes from "./Pagination.module.scss";
import ReactPaginate from "react-paginate";

export const Pagination = ({ countPizzas, onChangePage, currentPage }) => {
  return (
    <ReactPaginate
      className={classes.root}
      breakLabel="..."
      nextLabel=">"
      previousLabel="<"
      onPageChange={(event) => onChangePage(event.selected + 1)}
      pageRangeDisplayed={4}
      pageCount={Math.ceil(countPizzas / 4)}
      forcePage={currentPage - 1}
    />
  );
};
