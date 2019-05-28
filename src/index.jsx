import React, { Component, PropTypes } from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { BrowserRouter as Router, Route, Link, browserHistory, IndexRoute } from 'react-router-dom';

import CustomContent from './components/CustomContent';
import rootReducer from './reducers';

import './assets/css/main.scss';

const store = createStore(rootReducer, compose(
  applyMiddleware(thunk),
  // window.devToolsExtension ? window.devToolsExtension() : f => f
));

const attachElement = document.getElementById('customContentApp');

class Home extends Component {
  render() {
    return (
      <Provider store={store}>
        <CustomContent />
      </Provider>
    )
  }
}

render(
  <Router>
    <Route path="/" component={Home} />
  </Router>,
  attachElement
);