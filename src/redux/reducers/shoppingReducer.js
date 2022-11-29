import { TYPES } from "../types/types";

export const shoppingInitialState = {
  products: [],
  cart: [],
  loading: true,
  reload: false,
  remaining: 0,
};

const compare = (a, b) =>
  a.nombre > b.nombre ? 1 : b.nombre > a.nombre ? -1 : 0;

export const shoppingReducer = (state = shoppingInitialState, action) => {
  switch (action.type) {
    case TYPES.ADD_PRODUCT: {
      return {
        ...state,
        initialProducts: [...action.payload.productos].sort(compare),
        products: [...action.payload.productos].sort(compare),
        categories: action.payload.categorias,
        loading: false,
        reload: false,
      };
    }
    case TYPES.ADD_TO_CART: {
      let producto;

      let newItem =
        state.products.find((product) => product.uid === action.payload.id) ||
        state.cart.find((product) => product.uid === action.payload.id);

      let itemInCart = state.cart.find((item) => item.uid === newItem.uid);

      if (itemInCart) {
        producto = itemInCart.destino.find(
          (item) => item.punto._id === action.payload.punto
        );
      }
      return itemInCart
        ? {
            ...state,
            reload: false,
            cart: state.cart.map((productos) =>
              productos.uid === newItem.uid
                ? {
                    ...productos,
                    cantidad:
                      producto.cantidad > 0
                        ? productos.cantidad + 1
                        : productos.cantidad,
                    destino: productos.destino.map((destinos) =>
                      destinos.punto._id === action.payload.punto
                        ? {
                            ...destinos,
                            cantidad:
                              destinos.cantidad >= producto.cantidad &&
                              producto.cantidad > 0
                                ? destinos.cantidad - 1
                                : destinos.cantidad,
                          }
                        : destinos
                    ),
                  }
                : productos
            ),
          }
        : {
            ...state,
            reload: false,
            products: state.products.filter(
              (product) => product.uid !== action.payload.id
            ),
            cart: [
              ...state.cart,
              {
                ...newItem,
                cantidad: 1,
                destino: newItem.destino.map((item) =>
                  item.punto._id === action.payload.punto
                    ? {
                        ...item,
                        cantidad: item.cantidad - 1,
                      }
                    : item
                ),
              },
            ],
          };
    }
    case TYPES.REMOVE_ONE_FROM_CART: {
      let itemToDelete = state.cart.find(
        (item) => item.uid === action.payload.id
      );
      return itemToDelete.cantidad > 1
        ? {
            ...state,
            reload: false,
            cart: state.cart.map((productos) =>
              productos.uid === action.payload.id
                ? {
                    ...productos,
                    cantidad: productos.cantidad - 1,
                    destino: productos.destino.map((destinos) =>
                      destinos.punto._id === action.payload.punto
                        ? { ...destinos, cantidad: destinos.cantidad + 1 }
                        : destinos
                    ),
                  }
                : productos
            ),
          }
        : {
            ...state,
            reload: false,
            products: [
              ...state.products,
              {
                ...itemToDelete,
                destino: itemToDelete.destino.map((item) =>
                  item.punto._id === action.payload.punto
                    ? { ...item, cantidad: item.cantidad + 1 }
                    : item
                ),
              },
            ].sort(compare),
            cart: state.cart.filter((item) => item.uid !== action.payload.id),
          };
    }
    case TYPES.CLEAR_CART: {
      const { cart, ...rest } = state;
      return {
        ...rest,
        products: state.initialProducts,
        reload: false,
        cart: [],
        remaining: 0,
      };
    }
    case TYPES.FILTER_PRODUCT: {
      let filtrado = [];
      for (let i = 0; i < state.initialProducts.length; i++) {
        let comparacion = false;
        for (let j = 0; (j < state.cart.length) & !comparacion; j++) {
          if (state.initialProducts[i]["uid"] == state.cart[j]["uid"])
            comparacion = true;
        }
        if (!comparacion) filtrado.push(state.initialProducts[i]);
      }
      return {
        ...state,
        reload: false,
        products: filtrado
          .filter((element) => element.categoria.nombre === action.payload)
          .sort(compare),
      };
    }
    case TYPES.CLEAR_FILTER_PRODUCT: {
      let filtrado = [];
      for (let i = 0; i < state.initialProducts.length; i++) {
        let comparacion = false;
        for (let j = 0; (j < state.cart.length) & !comparacion; j++) {
          if (state.initialProducts[i]["uid"] == state.cart[j]["uid"])
            comparacion = true;
        }
        if (!comparacion) filtrado.push(state.initialProducts[i]);
      }
      return {
        ...state,
        products: filtrado,
      };
    }
    case TYPES.CREATE_ORDER: {
      return {
        ...state,
        orden: {
          productos: state.cart.map(({ uid, cantidad, precio }) => {
            return { producto: uid, cantidad, precio };
          }),
          montoTotal: action.payload.montoTotal,
          punto: action.payload.designado,
        },
        reload: false,
      };
    }
    case TYPES.SUBMIT_ORDER: {
      return {
        ...state,
        products: [],
        cart: [],
        orden: [],
        reload: true,
      };
    }
    case TYPES.REMAINING: {
      return {
        ...state,
        remaining: action.payload,
      };
    }
    case TYPES.CLEAN_UP: {
      return {
        ...shoppingInitialState,
      };
    }
    default:
      return state;
  }
};
