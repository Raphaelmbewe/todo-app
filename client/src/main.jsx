import React from 'react';
import * as ReactDOMClient from 'react-dom/client'
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import store from '@/store';
import './index.css';

ReactDOMClient.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Provider store={store} >
    <App />
    </Provider>
  </BrowserRouter>
);

