import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
// import { HashRouter as Router } from 'react-router-dom';

import App from './components/App';
import { store } from './store/store';
import { setHash } from './common/helpers/hashHelper';
import { fetchSettings } from './common/helpers/settingsHelper';

import 'bootstrap/dist/css/bootstrap.min.css';
import './theme/variables.css';
import './index.css';

setHash();
fetchSettings();

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('aw-root'),
);
