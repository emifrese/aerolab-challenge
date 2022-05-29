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
  showingProducts: Type[];
  sortIncrement: boolean;
  show: number;
  pages: number;
  currentPage: number;
}

const initialState: ProductsState = {
  products: [],
  filterProducts: [],
  showingProducts: [],
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
      state.showingProducts = state.filterProducts.slice(
        state.currentPage * state.show - state.show,
        state.show,
      );
      state.pages = Math.ceil(state.filterProducts.length / state.show);
    },
    sort: (state) => {
      state.filterProducts.sort((a, b) => {
        if (!state.sortIncrement) {
          return a.cost - b.cost;
        }

        return b.cost - a.cost;
      });
      state.sortIncrement = !state.sortIncrement;
      const indexInit: number = state.currentPage * state.show - state.show;
      const indexEnd: number =
        Math.floor(state.filterProducts.length / state.pages) * state.currentPage;

      state.showingProducts = state.filterProducts.slice(indexInit, indexEnd);
    },
    filter: (state, action: PayloadAction<string>) => {
      switch (action.payload) {
        case "All":
          state.filterProducts = state.products;
          break;
        case "Phones":
          state.filterProducts = state.products.filter((product) => product.category === "Phones");
          break;
        case "Gaming":
          state.filterProducts = state.products.filter((product) => product.category === "Gaming");
          break;
        case "Laptops":
          state.filterProducts = state.products.filter((product) => product.category === "Laptops");
          break;
        case "Cameras":
          state.filterProducts = state.products.filter((product) => product.category === "Cameras");
          break;
        case "Audio":
          state.filterProducts = state.products.filter((product) => product.category === "Audio");
          break;
        case "Monitors & TV":
          state.filterProducts = state.products.filter(
            (product) => product.category === "Monitors & TV",
          );
          break;
        case "Drones":
          state.filterProducts = state.products.filter((product) => product.category === "Drones");
          break;
        case "Phone Accessories":
          state.filterProducts = state.products.filter(
            (product) => product.category === "Phone Accessories",
          );
          break;
        case "Smart Home":
          state.filterProducts = state.products.filter(
            (product) => product.category === "Smart Home",
          );
          break;
        case "PC Accessories":
          state.filterProducts = state.products.filter(
            (product) => product.category === "PC Accessories",
          );
          break;
        case "Tablets & E-readers":
          state.filterProducts = state.products.filter(
            (product) => product.category === "Tablets & E-readers",
          );
          break;
      }
      state.pages = Math.ceil(state.filterProducts.length / state.show);
      state.currentPage = 1;
      const indexInit: number = state.currentPage * state.show - state.show;

      state.showingProducts = state.filterProducts.slice(indexInit, state.show);
    },
    changePage: (state, action: PayloadAction<string>) => {
      if (action.payload === "add" && state.currentPage < state.pages) {
        state.currentPage += 1;
      } else if (action.payload === "sub" && state.currentPage > 1) {
        state.currentPage -= 1;
      }
      const indexInit: number = state.currentPage * state.show - state.show;
      const indexEnd: number =
        Math.floor(state.filterProducts.length / state.pages) * state.currentPage;

      state.showingProducts = state.filterProducts.slice(indexInit, indexEnd);
    },
  },
});

export const productsActions = productsSlice.actions;

export const selectProducts = (state: RootState) => state.products.products;

export default productsSlice.reducer;
