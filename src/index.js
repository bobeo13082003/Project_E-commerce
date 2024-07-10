import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from './Layout';
import { BrowserRouter } from 'react-router-dom';
import 'nprogress/nprogress.css'
import { Provider } from 'react-redux';
import { store } from './redux/store';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <Layout />
    </Provider>
  </BrowserRouter>
);


reportWebVitals();
