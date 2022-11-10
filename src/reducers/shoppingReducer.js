import { TYPES } from "../actions/shoppingActions";

export const shoppingInitialState = {
  products: [],
  cart: [],
  loading: true,
};

export function shoppingRecuder(state, action) {
  switch (action.type) {
    case TYPES.ADD_PRODUCT: {

      //Ahora esto lo hace desde el backend
      /* let categorias = [];

      action.payload.forEach((c) => {
        if (!categorias.includes(c.categoria.nombre)) {
          categorias = [c.categoria.nombre, ...categorias];
        }
      }); */

      return {
        ...state,
        initialProducts: [...action.payload.productos],
        products: [...action.payload.productos],
        categories: action.payload.categorias,
        loading: false,
      };
    }
    case TYPES.FILTER_PRODUCT: {
      /* const productosFiltrados = state.products.filter(
        (element) => element.categoria.nombre === action.payload
      ); */

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
    case TYPES.ADD_TO_CART: {
      let { destino, ...newItem } = state.products.find(
        (product) => product.uid === action.payload.id
      );
      //console.log(newItem);

      let itemInCart = state.cart.find((item) => item.uid === newItem.uid);

      let producto = state.products.find((item) => item.uid === newItem.uid);

      let { cantidad } = producto.destino.find(
        (item) => item.punto === action.payload.punto
      );

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
      );

      console.log(cositas); */

      return itemInCart
        ? {
          ...state,
          cart: state.cart.map((item) =>
            item.uid === newItem.uid
              ? {
                ...item,
                cantidad: cantidad > 0 ? item.cantidad + 1 : item.cantidad,
              }
              : item
          ),
          products: state.products.map((items) =>
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
          ),
        }
        : {
          ...state,
          cart: [...state.cart, { ...newItem, cantidad: 1 }],
          products: state.products.map((items) =>
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
          ),
        };
    }
    case TYPES.REMOVE_ONE_FROM_CART: {
      let itemToDelete = state.cart.find(
        (item) => item.uid === action.payload.id
      );

      return itemToDelete.cantidad > 1
        ? {
          ...state,
          cart: state.cart.map((item) =>
            item.uid === action.payload.id
              ? { ...item, cantidad: item.cantidad - 1 }
              : item
          ),
          products: state.products.map((items) =>
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
          ),
        }
        : {
          ...state,
          cart: state.cart.filter((item) => item.uid !== action.payload.id),
          products: state.products.map((items) =>
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
          ),
        };
    }
    case TYPES.REMOVE_ALL_FROM_CART: {
    }
    case TYPES.CLEAR_CART: {
      const { cart, ...rest } = state;

      return {
        ...rest,
        products: state.initialProducts,
        cart: [],
      };
    }
    case TYPES.CREATE_ORDER: {
      const orden = cart.map(({ uid, cantidad, precio }) => {
        return { producto: uid, cantidad, precio };
      });

      //UNDER CONSTRUCCION | SI ES QUE LO NECESITO

      return {
        ...state,
        orden,
      };
    }
    default:
      return state;
  }
}
