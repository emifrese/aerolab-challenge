import {createSlice, PayloadAction} from "@reduxjs/toolkit";

import type {RootState} from "../store/index";

export interface Type {
  category: string;
  cost: number;
  img: {hdUrl: string; url: string};
  name: string;
  _id: string;
  amount: number;
}

interface ProductsState {
  products: Type[];
  filterProducts: Type[];
  sortIncrement: boolean;
  show: number;
  pages: number;
  currentPage: number;
}

const initialState: ProductsState = {
  products: [],
  filterProducts: [],
  sortIncrement: false,
  show: 16,
  pages: 1,
  currentPage: 1,
};

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    getAllProducts: (state, action: PayloadAction<Type[]>) => {
      state.products = action.payload;
      state.filterProducts = action.payload;
    },
    sort: (state) => {
      state.products.sort((a, b) => {
        if (!state.sortIncrement) {
          return a.cost - b.cost;
        }

        return b.cost - a.cost;
      });
      state.sortIncrement = !state.sortIncrement;
    },
    filter: (state, action: PayloadAction<string>) => {
      switch (action.payload) {
        case "All":
          state.filterProducts = state.products;
          break;
        case "Phones":
          state.filterProducts = state.filterProducts.filter(
            (product) => product.category === "Phones",
          );
          break;
        case "Gaming":
          state.filterProducts = state.filterProducts.filter(
            (product) => product.category === "Gaming",
          );
          break;
        case "Laptops":
          state.filterProducts = state.filterProducts.filter(
            (product) => product.category === "Laptops",
          );
          break;
        case "Cameras":
          state.filterProducts = state.filterProducts.filter(
            (product) => product.category === "Cameras",
          );
          break;
        case "Audio":
          state.filterProducts = state.filterProducts.filter(
            (product) => product.category === "Audio",
          );
          break;
        case "Monitors & TV":
          state.filterProducts = state.filterProducts.filter(
            (product) => product.category === "Monitors & TV",
          );
          break;
        case "Drones":
          state.filterProducts = state.filterProducts.filter(
            (product) => product.category === "Drones",
          );
          break;
        case "Phone Accessories":
          state.filterProducts = state.filterProducts.filter(
            (product) => product.category === "Phone Accessories",
          );
          break;
        case "Smart Home":
          state.filterProducts = state.filterProducts.filter(
            (product) => product.category === "Smart Home",
          );
          break;
        case "PC Accessories":
          state.filterProducts = state.filterProducts.filter(
            (product) => product.category === "PC Accessories",
          );
          break;
        case "Tablets & E-readers":
          state.filterProducts = state.filterProducts.filter(
            (product) => product.category === "Tablets & E-readers",
          );
          break;
      }
      state.pages = Math.ceil(state.filterProducts.length / state.show);
      console.log(Math.ceil(state.filterProducts.length / state.show));
      console.log(state.filterProducts.length);
    },
    changePage: (state, action: PayloadAction<string>) => {
      if (action.payload === "add" && state.currentPage < state.pages) {
        console.log("add");
        state.currentPage++;
      } else if (action.payload === "sub" && state.currentPage > state.pages) {
        state.currentPage--;
      }
    },
  },
});

export const productsActions = productsSlice.actions;

export const selectProducts = (state: RootState) => state.products.products;

export default productsSlice.reducer;
