import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import { store } from './components/store/Store';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { v4 as uuid } from 'uuid';

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path='/:id' element={<App />} />
        <Route path='/' element={<Navigate replace to={`/${uuid()}`} />}/>
      </Routes>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

