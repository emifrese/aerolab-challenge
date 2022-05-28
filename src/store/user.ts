import {createSlice, PayloadAction} from "@reduxjs/toolkit";

import type {RootState} from "../store/index";

import type {Type} from "./products";

interface UserState {
  createDate: string;
  name: string;
  points: number;
  redeemHistory: Array<Type>;
  __v: number;
  _id: string;
}

const initialState: UserState = {
  createDate: "",
  name: "",
  points: 0,
  redeemHistory: [],
  __v: 0,
  _id: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    getUser: (state, action: PayloadAction<UserState>) => {
      state.createDate = action.payload.createDate;
      state.name = action.payload.name;
      state.points = action.payload.points;
      state.redeemHistory = action.payload.redeemHistory;
      state.__v = action.payload.__v;
      state._id = action.payload._id;
    },
    purchase: (state, action: PayloadAction<Type>) => {
      const existingHistoryItemIndex = state.redeemHistory.findIndex(
        (item) => item._id === action.payload._id,
      );

      const existingHistoryItem = state.redeemHistory[existingHistoryItemIndex];

      if (existingHistoryItem) {
        state.redeemHistory[existingHistoryItemIndex].amount++;
      } else {
        state.redeemHistory.push(action.payload);
        const newItem = {...state.redeemHistory[state.redeemHistory.length - 1], amount: 1};

        state.redeemHistory[state.redeemHistory.length - 1] = newItem;
      }

      state.points -= action.payload.cost;
    },
    addCoins: (state, action: PayloadAction<number>) => {
      state.points += action.payload;
    },
  },
});

export const userActions = userSlice.actions;

export const selectUser = (state: RootState) => state.user;

export default userSlice.reducer;
