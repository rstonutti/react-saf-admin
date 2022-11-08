import { TYPES } from "../actions/shoppingActions";

export const shoppingInitialState = {
    products: [],
    cart: [],
    loading: true
};

export function shoppingRecuder(state, action) {
    switch (action.type) {
        case TYPES.ADD_PRODUCT: {

            let categorias = []

            action.payload.forEach((c) => {
                if (!categorias.includes(c.categoria.nombre)) {
                    categorias = [c.categoria.nombre, ...categorias]
                }
            });

            return {
                ...state,
                products: [...action.payload],
                categories: categorias,
                loading: false
            }
        }
        case TYPES.FILTER_PRODUCT: {

            const productosFiltrados = state.products.filter(element => element.categoria.nombre === action.payload)

            return {
                ...state,
                filter: productosFiltrados,

            }
        }
        case TYPES.CLEAR_FILTER_PRODUCT: {

            const { filter, ...rest } = state

            return {
                ...rest
            }
        }
        case TYPES.ADD_TO_CART: {
            let newItem = state.products.find(
                (product) => product.uid === action.payload
            );
            //console.log(newItem);

            let itemInCart = state.cart.find((item) => item.uid === newItem.uid);

            return itemInCart
                ? {
                    ...state,
                    cart: state.cart.map((item) =>
                        item.uid === newItem.uid
                            ? { ...item, cantidad: item.cantidad + 1 }
                            : item
                    ),
                }
                : {
                    ...state,
                    cart: [...state.cart, { ...newItem, cantidad: 1 }],
                };
        }
        case TYPES.REMOVE_ONE_FROM_CART: {
            let itemToDelete = state.cart.find((item) => item.uid === action.payload);

            return itemToDelete.cantidad > 1
                ? {
                    ...state,
                    cart: state.cart.map((item) =>
                        item.uid === action.payload
                            ? { ...item, cantidad: item.cantidad - 1 }
                            : item
                    ),
                }
                : {
                    ...state,
                    cart: state.cart.filter((item) => item.uid !== action.payload),
                };
        }
        case TYPES.REMOVE_ALL_FROM_CART: {

        }
        case TYPES.CLEAR_CART: {
            const { cart, ...rest } = state

            return {
                ...rest,
                cart: []
            }
        }
        case TYPES.CREATE_ORDER: {

            const orden = cart.map(({ uid, cantidad, precio }) => {
                return { producto: uid, cantidad, precio }
            })

            //UNDER CONSTRUCCION | SI ES QUE LO NECESITO

            return {
                ...state,
                orden
            }
        }
        default:
            return state;
    }
}