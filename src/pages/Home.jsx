import React, { useContext, useEffect, useState } from "react";

import Categories from "../components/Categories";
import Sort from "../components/Sort";
import Skeleton from "../components/PizzaBlock/Skeleton";
import PizzaBlock from "../components/PizzaBlock/PizzaBlock";
import axios from "axios";
import { Pagination } from "../components/Pagination/Pagination";
import { SearchContext } from "../App";

export const Home = () => {
  const { searchValue } = useContext(SearchContext);
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categoryId, setCategoryId] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [countPizzas, setCountPizzas] = useState();
  const [sortType, setSortType] = useState({
    name: "сначала популярные",
    sortProperty: "rating",
    order: "desc",
  });

  const sortBy = sortType.sortProperty.replace("_", "");
  const order = sortType.order;
  const category = categoryId ? `category=${categoryId}` : ``;
  const search = searchValue ? `&search=${searchValue}` : ``;
  const Pizzas = items.map((it) => {
    return <PizzaBlock key={it.id} {...it} />;
  });
  const skeletons = [...new Array(10)].map((_, index) => (
    <Skeleton key={index} />
  ));
  useEffect(() => {
    setIsLoading(true);
    axios
      .get(
        `https://6313f1dda8d3f673ffd1f738.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
      )
      .then((r) => {
        setItems(r.data.items);
        setCountPizzas(r.data.count);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, [categoryId, sortType, searchValue, currentPage]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={setCategoryId} />
        <Sort value={sortType} onChangeSort={setSortType} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{isLoading ? skeletons : Pizzas}</div>
      <Pagination
        currentPage={currentPage}
        onChangePage={setCurrentPage}
        countPizzas={countPizzas}
      />
    </div>
  );
};
