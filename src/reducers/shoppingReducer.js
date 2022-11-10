import { TYPES } from "../actions/shoppingActions";

export const shoppingInitialState = {
  products: [],
  cart: [],
  loading: true,
};

export function shoppingRecuder(state, action) {
  switch (action.type) {
    case TYPES.ADD_PRODUCT: {
      return {
        ...state,
        products: [...action.payload.productos],
        categories: action.payload.categorias,
        loading: false,
        reload: false,
      };
    }
    case TYPES.ADD_TO_CART: {
      let { ...newItem } = state.products.find(
        (product) => product.uid === action.payload.id
      );

      let producto;

      let itemInCart = state.cart.find((item) => item.uid === newItem.uid);

      if (itemInCart) {
        console.log(itemInCart.destino, "aber");
        producto = itemInCart.destino.find(
          (item) => item.punto === action.payload.punto
        );
      }

      /* const cositas = state.products.map((items) =>
        items.uid === newItem.uid
          ? items.destino.map((item) =>
              item.punto === "635abb0158786cb20862d056"
                ? { ...item, cantidad: item.cantidad - 5 }
                : item
            )
          : items
      ); 

      /* const cositas = state.products.map((items) =>
        items.uid === newItem.uid
          ? {
              ...items,
              destino: items.destino.map((item) =>
                item.punto === "635abb0158786cb20862d056"
                  ? { ...item, cantidad: item.cantidad - 1 }
                  : item
              ),
            }
          : items
      );*/

      return itemInCart
        ? {
            ...state,
            cart: state.cart.map((productos) =>
              productos.uid === newItem.uid
                ? {
                    ...productos,
                    cantidad:
                      producto.cantidad > 0
                        ? productos.cantidad + 1
                        : productos.cantidad,
                    destino: productos.destino.map((destinos) =>
                      destinos.punto === action.payload.punto
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
            /* products: state.products.map((items) =>
              items.uid === newItem.uid
                ? {
                    ...items,
                    destino: items.destino.map((item) =>
                      item.punto === action.payload.punto
                        ? {
                            ...item,
                            cantidad:
                              cantidad > 0 ? item.cantidad - 1 : item.cantidad,
                          }
                        : item
                    ),
                  }
                : items
            ), */
          }
        : {
            ...state,
            cart: [
              ...state.cart,
              {
                ...newItem,
                cantidad: 1,
                destino: newItem.destino.map((item) =>
                  item.punto === action.payload.punto
                    ? {
                        ...item,
                        cantidad: item.cantidad - 1,
                      }
                    : item
                ),
              },
            ],
            /* products: state.products.map((items) =>
              items.uid === newItem.uid
                ? {
                    ...items,
                    destino: items.destino.map((item) =>
                      item.punto === action.payload.punto
                        ? { ...item, cantidad: item.cantidad - 1 }
                        : item
                    ),
                  }
                : items
            ), */
          };
    }
    case TYPES.REMOVE_ONE_FROM_CART: {
      let itemToDelete = state.cart.find(
        (item) => item.uid === action.payload.id
      );

      return itemToDelete.cantidad > 1
        ? {
            ...state,
            cart: state.cart.map((productos) =>
              productos.uid === action.payload.id
                ? {
                    ...productos,
                    cantidad: productos.cantidad - 1,
                    //de acá
                    destino: productos.destino.map((destinos) =>
                      destinos.punto === action.payload.punto
                        ? { ...destinos, cantidad: destinos.cantidad + 1 }
                        : destinos
                    ),
                    //hasta acá
                  }
                : productos
            ),
            /* products: state.products.map((items) =>
              items.uid === action.payload.id
                ? {
                    ...items,
                    destino: items.destino.map((item) =>
                      item.punto === action.payload.punto
                        ? { ...item, cantidad: item.cantidad + 1 }
                        : item
                    ),
                  }
                : items
            ), */
          }
        : {
            ...state,
            cart: state.cart.filter((item) => item.uid !== action.payload.id),
            /* products: state.products.map((items) =>
              items.uid === action.payload.id
                ? {
                    ...items,
                    destino: items.destino.map((item) =>
                      item.punto === action.payload.punto
                        ? { ...item, cantidad: item.cantidad + 1 }
                        : item
                    ),
                  }
                : items
            ), */
          };
    }
    case TYPES.CLEAR_CART: {
      const { cart, ...rest } = state;

      return {
        ...rest,
        products: state.products,
        cart: [],
      };
    }
    case TYPES.FILTER_PRODUCT: {
      return {
        ...state,
        filter: state.products.filter(
          (element) => element.categoria.nombre === action.payload
        ),
      };
    }
    case TYPES.CLEAR_FILTER_PRODUCT: {
      const { filter, ...rest } = state;
      return {
        ...rest,
      };
    }
    case TYPES.CREATE_ORDER: {
      /* const orden = state.cart.map(({ uid, cantidad, precio }) => {
        return { producto: uid, cantidad, precio };
      });

      orden.montoTotal = action.payload.montoTotal;
      orden.punto = action.payload.destino;

      console.log(orden); */

      //UNDER CONSTRUCCION | SI ES QUE LO NECESITO

      return {
        ...state,
        orden: {
          productos: state.cart.map(({ uid, cantidad, precio }) => {
            return { producto: uid, cantidad, precio };
          }),
          montoTotal: action.payload.montoTotal,
          punto: action.payload.desginado,
        },
        reload: true,
      };
    }
    default:
      return state;
  }
}
