import { useContext, useEffect, useReducer, useState } from "react";
import { fetchSinToken, fetchConToken } from "../../../helpers/fetch";
import {
  shoppingInitialState,
  shoppingRecuder,
} from "../../../reducers/shoppingReducer";
import { TYPES } from "../../../actions/shoppingActions";
import { AuthContext } from "../../../contexts/authContext";
import { getAmount } from "../../../helpers/amount";
import Card from "../../../components/card/Card";
import List from "../../../components/list/List";

import "./cashier.scss";
import { capitalizeFirstLetter } from "../../../helpers/capitalize-first-letter";

const Cashier = () => {
  const {
    state: { uid, designado, nombre },
  } = useContext(AuthContext);

  const [
    { products, filter, cart, categories, orden, loading, reload },
    dispatch,
  ] = useReducer(shoppingRecuder, shoppingInitialState);

  //Tratar de resolverlo con un reducer
  //const [reload, setReload] = useState(false);
  /* const orden = {}; */

  const [cambio, setCambio] = useState(0);

  const cargarProductos = async () => {
    const resp = await fetchSinToken(
      `api/v1/productos?desde=0&limite=20&punto=${designado}`
    );

    const { productos, categorias } = await resp.json();

    if (resp.ok) {
      //setReload(false);

      dispatch({
        type: "ADD_PRODUCT",
        payload: { productos, categorias },
      });
    }
  };

  //De momento no lo uso
  const handleChange = (e) => {
    setCambio(e.target.value);
  };

  const addCart = (id) => {
    dispatch({
      type: TYPES.ADD_TO_CART,
      payload: { id, punto: designado },
    });
  };

  const filterProducts = (categoria) => {
    categoria === "clear"
      ? dispatch({
          type: TYPES.CLEAR_FILTER_PRODUCT,
        })
      : dispatch({
          type: TYPES.FILTER_PRODUCT,
          payload: categoria,
        });
  };

  const delFromCart = (id, all = false) => {
    if (all) {
      dispatch({
        type: TYPES.REMOVE_ALL_FROM_CART,
        payload: { id, punto: designado },
      });
    } else {
      dispatch({
        type: TYPES.REMOVE_ONE_FROM_CART,
        payload: { id, punto: designado },
      });
    }
  };

  const clearCart = () => {
    dispatch({
      type: TYPES.CLEAR_CART,
    });
  };

  const submitOrder = async () => {
    if (cart.length != 0) {
      /* orden.productos = cart.map(({ uid, cantidad, precio }) => {
        return { producto: uid, cantidad, precio };
      });
      //orden.usuario = uid; (Eso lo configuro en el back)
      orden.montoTotal = getAmount(cart);
      orden.punto = destino; */

      /* dispatch({
        type: "CREATE_ORDER",
        payload: { destino, montoTotal: getAmount(cart) },
      }); */

      console.log(orden, "antes de enviarla");

      const resp = await fetchConToken("api/v1/ordenes", { orden }, "POST");
      //Tratar de manejarlo con reducer
      if (resp.ok) {
        clearCart();
      }

      /* products.map((element) =>
        element.destino.map((item) => {
          if (item.punto == "635ab7536abc9ecc0518bf37") {
            item.cantidad--;
          }
          return item;
        })
      ); */

      /* if (resp.ok) {
        clearCart();

        //AGREGAR UNA NOTIFICACIÓN DE ÉXITO
      } */
    } else {
      console.log("carrito vacio");
    }
  };

  useEffect(() => {
    cargarProductos();
  }, [reload]);

  useEffect(() => {
    console.log("aver");
    dispatch({
      type: "CREATE_ORDER",
      payload: { designado, montoTotal: getAmount(cart) },
    });
  }, [cart]);

  if (loading) {
    return <div>Espera papu</div>;
  }

  if (!products.length) {
    return <div>Nada por aquí... </div>;
  }

  return (
    <div className="cashier">
      <div className="cashier-left">
        <div className="navbar">
          <div className="title step-3">Point of Sale</div>
          <div className="title step-0">Hola, {nombre} 👋!</div>
          {/* <select name="punto" id="punto" onChange={handleChange}>
            {punto.map((element) => (
              <option key={element.uid} value={element.uid}>
                {element.barrio}
              </option>
            ))}
          </select> */}
        </div>
        <div className="navbar-categories">
          {categories.map((item) => (
            <button
              className="step--1"
              key={item}
              onClick={() => {
                filterProducts(item);
              }}
            >
              {capitalizeFirstLetter(item.toLowerCase())}
            </button>
          ))}
          <button
            className="step--1"
            onClick={() => {
              filterProducts("clear");
            }}
          >
            Limpiar
          </button>
        </div>
        <div className="card-wrapper">
          {filter
            ? filter.map((item) => (
                <Card
                  key={item.uid}
                  addCart={addCart}
                  designado={designado}
                  {...item}
                />
              ))
            : products.map((item) => (
                <Card
                  key={item.uid}
                  addCart={addCart}
                  designado={designado}
                  {...item}
                />
              ))}
        </div>
      </div>
      <div className="cashier-right">
        <div className="list-wrapper">
          {cart.length ? (
            cart.map((item) => (
              <List
                key={item.uid}
                addCart={addCart}
                delFromCart={delFromCart}
                destino={item.destino}
                designado={designado}
                {...item}
              />
            ))
          ) : (
            <div>Nada por aquí... </div>
          )}
        </div>
        <div className="list-amount">
          <div className="list-amount-contenido">
            <div>Monto: ${getAmount(cart)}</div>
          </div>
          <div className="list-amount-contenido">
            <div>
              Efectivo:
              <input
                type="number"
                name="efectivo"
                id="efectivo"
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="list-amount-contenido">
            <div>
              Cambio: ${cambio > getAmount(cart) ? cambio - getAmount(cart) : 0}
            </div>
          </div>
          <div>
            <button
              onClick={() => {
                submitOrder();
              }}
            >
              Enviar
            </button>
            <button
              onClick={() => {
                clearCart();
              }}
            >
              Limpiar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cashier;
