import { createStore, applyMiddleware, compose } from 'redux';
import reducer from "../redux/reducer"
import thunkMiddleware from "redux-thunk";

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// conecta con extension del navegador => REDUX DEVTOOLS;

// Aca se crea la STORE EN REDUX
const store = createStore(
  reducer,
  composeEnhancer(applyMiddleware(thunkMiddleware)) // realiza peticiones a un server;
)

export default store;

//!CONFIGURACION!!!