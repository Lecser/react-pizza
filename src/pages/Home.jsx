import React, { useEffect, useState } from "react";

import Categories from "../components/Categories";
import Sort from "../components/Sort";
import Skeleton from "../components/PizzaBlock/Skeleton";
import PizzaBlock from "../components/PizzaBlock/PizzaBlock";
import axios from "axios";
import { Pagination } from "../components/Pagination/Pagination";
import { selectPizzaData } from "../redux/pizza/selectors";
import { useDispatch, useSelector } from "react-redux";
import { setItems } from "../redux/pizza/slice";
import { selectFilter } from "../redux/filter/selectors";
import { setCategoryId, setCurrentPage } from "../redux/filter/slice";

export const Home = () => {
  const dispatch = useDispatch();
  const { items } = useSelector(selectPizzaData);
  const { currentPage, searchValue, sort, categoryId } =
    useSelector(selectFilter);
  const [isLoading, setIsLoading] = useState(true);
  const [countPizzas, setCountPizzas] = useState();
  const Pizzas = items.map((it) => {
    return <PizzaBlock key={it.id} {...it} />;
  });
  const onClickCategoryId = (id) => {
    dispatch(setCategoryId(id));
  };
  const onChangePage = (page) => {
    dispatch(setCurrentPage(page));
  };

  const skeletons = [...new Array(10)].map((_, index) => (
    <Skeleton key={index} />
  ));

  const fetchPizzas = () => {
    setIsLoading(true);
    const sortBy = sort.sortProperty.replace("_", "");
    const category = categoryId ? `category=${categoryId}` : ``;
    const search = searchValue ? `&search=${searchValue}` : ``;
    const order = sort.order;

    axios
      .get(
        `https://6313f1dda8d3f673ffd1f738.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
      )
      .then((r) => {
        dispatch(setItems(r.data.items));
        setCountPizzas(r.data.count);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchPizzas();
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
      <div className="content__items">{isLoading ? skeletons : Pizzas}</div>
      <Pagination
        currentPage={currentPage}
        onChangePage={onChangePage}
        countPizzas={countPizzas}
      />
    </div>
  );
};
