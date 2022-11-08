import { useEffect, useReducer, useState } from "react";
import "./styles/cashier.scss";

import { fetchSinToken, fetchConToken } from "../../helpers/fetch";
import { getProducts } from "../../helpers/products";

import Card from "../../components/card/Card";
import List from "../../components/list/List";
import { shoppingInitialState, shoppingRecuder } from "../../reducers/shoppingReducer";
import { TYPES } from "../../actions/shoppingActions";
import { getAmount } from "../../helpers/amount";

const Cashier = () => {
  const [punto, setPunto] = useState([]);

  const [state, dispatch] = useReducer(shoppingRecuder, shoppingInitialState);

  const { products, filter, cart, categories, loading } = state;

  const orden = {}

  const cargarProductos = async () => {
    const resp = await fetchSinToken("api/v1/productos?desde=0&limite=20&punto=635abb0158786cb20862d056");
    const { productos } = await resp.json();

    const respPuntos = await fetchSinToken("api/v1/puntos?desde=0&limite=20");
    const { puntos } = await respPuntos.json();

    setPunto(puntos)

    if (resp.ok) {
      dispatch({
        type: "ADD_PRODUCT",
        payload: productos
      })
    }
  };

  const addCart = (id) => {
    dispatch({
      type: TYPES.ADD_TO_CART,
      payload: id
    })
  }

  const filterProducts = (categoria) => {

    categoria === "clear" ? dispatch({
      type: TYPES.CLEAR_FILTER_PRODUCT
    }) :
      dispatch({
        type: TYPES.FILTER_PRODUCT,
        payload: categoria
      })
  }

  const delFromCart = (id, all = false) => {
    if (all) {
      dispatch({ type: TYPES.REMOVE_ALL_FROM_CART, payload: id });
    } else {
      dispatch({ type: TYPES.REMOVE_ONE_FROM_CART, payload: id });
    }
  }

  const clearCart = () => {
    dispatch({
      type: TYPES.CLEAR_CART
    })
  }

  const handleChange = (e) => {
    console.log(e.target.value)


  }

  const submitOrder = async () => {

    orden.productos = cart.map(({ uid, cantidad, precio }) => {
      return { producto: uid, cantidad, precio }
    })
    orden.usuario = '635826651adf380f93198427'
    orden.montoTotal = getAmount(cart)
    orden.punto = '635ab7536abc9ecc0518bf37'

    const resp = await fetchConToken("api/v1/ordenes", { orden }, 'POST');

    console.log(resp)

    if (resp.ok) {
      clearCart()

      //AGREGAR UNA NOTIFICACIÓN DE ÉXITO

    }
  }

  useEffect(() => {
    cargarProductos();
  }, []);

  if (loading) {
    return <div>Espera papu</div>;
  }

  if (!products.length) {
    return <div>Nada por aquí... </div>;
  }

  return (
    <div className="cashier">
      <div className="cashier-left">
        <div className="navbar"><h1>Soberanía Alimentaria Formoseña</h1>
          <select name="punto" id="punto" onChange={handleChange}>
            {
              punto.map(element => <option key={element.uid} value={element.uid}>{element.barrio}</option>)
            }
          </select>
        </div>
        <div className="navbar-categories">
          {
            categories.map((item) => (
              <button key={item} onClick={() => {
                filterProducts(item)
              }}>{item}</button>
            ))}
          <button onClick={() => {
            filterProducts('clear')
          }}> Limpiar </button>
        </div>
        <div className="card-wrapper">
          {filter ? filter.map((item) => (
            <Card key={item.uid} addCart={addCart} {...item} />
          )) : products.map((item) => (
            <Card key={item.uid} addCart={addCart} {...item} />
          ))}
        </div>
      </div>
      <div className="cashier-right">
        <div className="list-wrapper">
          {
            cart.length ? cart.map((item) => (
              <List key={item.uid} addCart={addCart} delFromCart={delFromCart} {...item} />
            )) : <div>Nada por aquí... </div>
          }
        </div>
        <div className="list-amount">
          <div>Monto</div>
          <div>{
            getAmount(cart)
          }</div>
          <button onClick={() => { submitOrder() }}>Enviar</button>
          <button onClick={() => { clearCart() }}>Limpiar</button>
        </div>
      </div>
    </div>
  );
};

export default Cashier;
