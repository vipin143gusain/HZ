import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
// import CssBaseline from '@material-ui/core/CssBaseline';

import {composeWithDevTools} from 'redux-devtools-extension';
import { createStore, applyMiddleware, compose } from 'redux';
import reducers from './pages/reducers';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';

const store = createStore(
  reducers,
  {},
  composeWithDevTools(
    applyMiddleware(thunk)
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);


// ReactDOM.render(
//   <React.StrictMode>
//     <CssBaseline />
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
