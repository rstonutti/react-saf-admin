import { TYPES } from "../types/types";

export const stockInitialState = {
  stock: [],
  selects: {},
  found: null,
  loading: true,
  disabled: true,
  disabledLote: true,
  searching: false,
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
    case TYPES.START_SEARCH:
      return {
        ...state,
        found: null,
        searching: true,
      };
    case TYPES.END_SEARCH:
      return {
        ...state,
        found: action.payload,
        searching: false,
      };
    case TYPES.ASSIGN_STOCK:
      let producto = state.found;

      let haveStock = state.found.destino.find(
        (puntos) => puntos.punto === action.payload.punto
      );

      console.log(producto.destino);
      console.log(haveStock);

      return haveStock
        ? {
            ...state,
            stock: state.stock.length
              ? state.stock.map((producto) =>
                  producto.uid === state.found.uid
                    ? {
                        ...producto,
                        destino: producto.destino.map((destinos) =>
                          destinos.punto === action.payload.punto
                            ? {
                                ...destinos,
                                cantidad:
                                  destinos.cantidad + action.payload.cantidad,
                              }
                            : {
                                ...destinos,
                              }
                        ),
                      }
                    : {
                        ...producto,
                      }
                )
              : [
                  ...state.stock,
                  {
                    ...state.found,
                    destino: state.found.destino.map((destinos) =>
                      destinos.punto === action.payload.punto
                        ? {
                            ...destinos,
                            cantidad:
                              destinos.cantidad + action.payload.cantidad,
                          }
                        : {
                            ...destinos,
                          }
                    ),
                  },
                ],

            /*             stock: state.stock.length
              ? state.stock.map((producto) =>
                  producto.uid === state.found.uid
                    ? {
                        ...producto,
                        destino: producto.destino.length
                          ? producto.destino.map((destinos) =>
                              destinos.punto === action.payload.punto
                                ? {
                                    ...destinos,
                                    cantidad:
                                      destinos.cantidad +
                                      action.payload.cantidad,
                                  }
                                : {
                                    ...destinos,
                                  }
                            )
                          : [
                              {
                                punto: action.payload.punto,
                                cantidad: action.payload.cantidad,
                              },
                            ],
                      }
                    : {
                        ...state.found,
                        destino: state.found.destino
                          ? state.found.destino.map((destinos) =>
                              destinos.punto === action.payload.punto
                                ? {
                                    ...destinos,
                                    cantidad:
                                      destinos.cantidad +
                                      action.payload.cantidad,
                                  }
                                : {
                                    ...destinos,
                                  }
                            )
                          : [
                              {
                                punto: action.payload.punto,
                                cantidad: action.payload.cantidad,
                              },
                            ],
                      }
                )
              : [
                  ...state.stock,
                  {
                    ...state.found,
                    destino: state.found.destino.length
                      ? state.found.destino.map((destinos) =>
                          destinos.punto === action.payload.punto
                            ? {
                                ...destinos,
                                cantidad:
                                  destinos.cantidad + action.payload.cantidad,
                              }
                            : {
                                ...destinos,
                              }
                        )
                      : [
                          {
                            punto: action.payload.punto,
                            cantidad: action.payload.cantidad,
                          },
                        ],
                  },
                ], */

            /*         stock: [
          ...state.stock,
          {
            ...state.found,
            destino: state.found.destino
              ? state.found.destino.map((destinos) =>
                  destinos.punto === action.payload.punto
                    ? {
                        ...destinos,
                        cantidad: destinos.cantidad + action.payload.cantidad,
                      }
                    : {
                        ...destinos,
                      }
                )
              : [
                  {
                    punto: action.payload.punto,
                    cantidad: action.payload.cantidad,
                  },
                ],
          },
        ], */
          }
        : {
            ...state,
            stock: state.stock.length
              ? state.stock.map((producto) =>
                  producto.uid === state.found.uid
                    ? {
                        ...producto,
                        destino: [
                          ...producto.destino,
                          {
                            punto: action.payload.punto,
                            cantidad: action.payload.cantidad,
                          },
                        ] /* producto.destino.map((destinos) =>
                          destinos.punto === action.payload.punto
                            ? {
                                ...destinos,
                                cantidad:
                                  destinos.cantidad + action.payload.cantidad,
                              }
                            : {
                                ...destinos,
                              }
                        ), */,
                      }
                    : {
                        ...producto,
                      }
                )
              : [
                  ...state.stock,
                  {
                    ...state.found,
                    destino: [
                      ...state.found.destino,
                      {
                        punto: action.payload.punto,
                        cantidad: action.payload.cantidad,
                      },
                    ] /* state.found.destino.map((destinos) =>
                      destinos.punto === action.payload.punto
                        ? {
                            ...destinos,
                            cantidad:
                              destinos.cantidad + action.payload.cantidad,
                          }
                        : {
                            ...destinos,
                          }
                    ), */,
                  },
                ],
          };
    case TYPES.CLEAN_UP_STOCK:
      return {
        ...stockInitialState,
      };
    default:
      return state;
  }
};
