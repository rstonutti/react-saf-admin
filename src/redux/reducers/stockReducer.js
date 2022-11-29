import { TYPES } from "../types/types";

export const stockInitialState = {
  stock: [],
  loading: true,
};

export const stockReducer = (state = stockInitialState, action) => {
  switch (action.type) {
    case TYPES.SHOW_STOCK:
      return {
        ...state,
        stock: [...action.payload],
        loading: false,
      };
    default:
      return state;
  }
};
