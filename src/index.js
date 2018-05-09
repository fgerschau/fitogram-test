import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import $ from 'jquery';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import 'font-awesome/css/font-awesome.min.css';
import 'toastr/build/toastr.min.css';
import 'toastr/build/toastr.min';
import Routes from './config/Routes';

window.jQuery = $;
window.$ = $;
global.jQuery = $;

ReactDOM.render(
  /* eslint-disable react/jsx-filename-extension */
  <BrowserRouter>
    <Routes />
  </BrowserRouter>,
  document.getElementById('root'),
);
