import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';

// aca es donde se renderiza totalmente nuestra pagina;
const root = ReactDOM.createRoot(document.getElementById('root'))

// asi le indicamos a nuestra app entera que trabaje con rutas;
root.render( 
  <Provider store={store}> 
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider> 
) 

reportWebVitals();
