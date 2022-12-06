import React, { useEffect } from "react";

import Categories from "../components/Categories";
import Sort from "../components/Sort";
import Skeleton from "../components/PizzaBlock/Skeleton";
import PizzaBlock from "../components/PizzaBlock/PizzaBlock";

import { Pagination } from "../components/Pagination/Pagination";
import { selectPizzaData } from "../redux/pizza/selectors";
import { useDispatch, useSelector } from "react-redux";
import { selectFilter } from "../redux/filter/selectors";
import { setCategoryId, setCurrentPage } from "../redux/filter/slice";
import { fetchPizzas } from "../redux/pizza/slice";
import { ErrorBlock } from "../components/Error/ErrorBlock";

export const Home = () => {
  const dispatch = useDispatch();

  const { items, pizzasCount, status } = useSelector(selectPizzaData);
  const { currentPage, searchValue, sort, categoryId } =
    useSelector(selectFilter);

  const Pizzas = items.map((it) => {
    return <PizzaBlock key={it.id} {...it} />;
  });
  const skeletons = [...new Array(10)].map((_, index) => (
    <Skeleton key={index} />
  ));

  const onClickCategoryId = (id) => {
    dispatch(setCategoryId(id));
  };
  const onChangePage = (page) => {
    dispatch(setCurrentPage(page));
  };

  const sortBy = sort.sortProperty.replace("_", "");
  const category = categoryId ? `category=${categoryId}` : ``;
  const search = searchValue ? `&search=${searchValue}` : ``;
  const order = sort.order;

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(fetchPizzas({ sortBy, category, search, order, currentPage }));
  }, [categoryId, sort.sortProperty, searchValue, currentPage]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          onClickCategoryId={onClickCategoryId}
          categoryId={categoryId}
        />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {status === "error" ? (
        <ErrorBlock>
          <h2>Произошла ошибка.😕</h2>
          <p>Проверь интернет или напиши в поддержу)</p>
        </ErrorBlock>
      ) : (
        <div className="content__items">
          {status === "loading" ? skeletons : Pizzas}
        </div>
      )}
      {!items.length && (
        <ErrorBlock>
          <h2>Такой пиццы не найдено.😕</h2>
          <p>Попробуй поискать другую =)</p>
        </ErrorBlock>
      )}
      {pizzasCount ? (
        <Pagination
          currentPage={currentPage}
          onChangePage={onChangePage}
          countPizzas={pizzasCount}
        />
      ) : null}
    </div>
  );
};
