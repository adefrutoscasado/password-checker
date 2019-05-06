import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
// @ts-ignore
import {Provider} from 'react-redux';
import configureStore from './redux/redux';
// @ts-ignore
import {PersistGate} from 'redux-persist/integration/react';
import 'semantic-ui-css/semantic.min.css';

// @ts-ignore
import { BrowserRouter } from 'react-router-dom';

const {store, persistor} = configureStore()

ReactDOM.render((
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </PersistGate>
  </Provider>
), document.getElementById('root'));

// ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
