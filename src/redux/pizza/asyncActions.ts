// import { createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";
//
// export const fetchPizzas = createAsyncThunk(
//   "pizza/fetchPizzas",
//   async (params) => {
//     const { sortBy, category, search, order, currentPage } = params;
//     const { data } = await axios.get(
//       `https://6313f1dda8d3f673ffd1f738.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
//     );
//     return data;
//   }
// );
