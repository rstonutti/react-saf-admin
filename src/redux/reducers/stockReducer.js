import { TYPES } from "../types/types";

export const stockInitialState = {
  stock: [],
  selects: {},
  loading: true,
  disabled: true,
  disabledLote: true,
};

export const stockReducer = (state = stockInitialState, action) => {
  switch (action.type) {
    case TYPES.SHOW_STOCK:
      return {
        ...state,
        stock: [...action.payload],
        loading: false,
      };
    case TYPES.ADD_SUPPLIER:
      return {
        ...state,
        selects: {
          supplier: [...action.payload.usuarios],
          points: [...action.payload.puntos],
        },
        loading: false,
      };
    case TYPES.SUPPLIER_PRODUCTS: {
      let lotes = [];
      action.payload.forEach((c) => {
        if (!lotes.includes(c.lote)) {
          lotes = [c.lote, ...lotes];
        }
      });

      return {
        ...state,
        selects: {
          ...state.selects,
          products: [...action.payload],
          lotes: [...lotes],
        },
        disabled: false,
        //loading: false,
      };
    }
    case TYPES.PRODUCT_SELECTED: {
      let lotes = [];

      state.selects.products.forEach((c) => {
        if (action.payload === c.uid) {
          if (!lotes.includes(c.lote)) {
            lotes = [c.lote, ...lotes];
          }
        }
      });

      return {
        ...state,
        selects: {
          ...state.selects,
          lotes: lotes,
        },
        disabledLote: false,
      };
    }
    case TYPES.CLEAN_UP_STOCK:
      return {
        ...stockInitialState,
      };
    default:
      return state;
  }
};
