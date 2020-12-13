import React from 'react';
import ReactDOM from 'react-dom';
import "react-bootstrap";
import "./css/bootstrap.min.css";
import "./font-awesome/css/font-awesome.css";
import "./css/style.css";
import "./css/animate.css";
import "./css/plugins/toastr/toastr.min.css";
import "./js/plugins/gritter/jquery.gritter.css";
import './index.css';
import App from './views/App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
