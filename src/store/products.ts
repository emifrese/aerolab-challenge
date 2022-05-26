import {createSlice, PayloadAction} from "@reduxjs/toolkit";

import type {RootState} from "../store/index";

export interface Type {
  category: string;
  cost: number;
  img: {hdUrl: string; url: string};
  name: string;
  _id: string;
}

interface ProductsState {
  products: Type[];
  sortIncrement: boolean;
}

const initialState: ProductsState = {
  products: [],
  sortIncrement: false,
};

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    getAllProducts: (state, action: PayloadAction<Type[]>) => {
      state.products = action.payload;
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
  },
});

export const productsActions = productsSlice.actions;

export const selectProducts = (state: RootState) => state.products.products;

export default productsSlice.reducer;
