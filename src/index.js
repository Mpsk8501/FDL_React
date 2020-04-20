import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter} from "react-router-dom";
import {applyMiddleware, createStore} from "redux";
import rootReducer from "./ReduxStore/reducers/rootReducer";
import reduxThunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";
import {Provider} from "react-redux";

const store = createStore(rootReducer,composeWithDevTools(
    applyMiddleware(reduxThunk)
));


ReactDOM.render(
      <React.StrictMode>
       <Provider store={store}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
       </Provider>
      </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
