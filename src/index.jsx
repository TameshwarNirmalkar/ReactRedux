import React, { PropTypes } from 'react';

import { render } from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';

import thunk from 'redux-thunk';

import CustomContent from './components/CustomContent';

import rootReducer from './reducers';

const store = createStore(rootReducer,compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
));

let attachElement = document.getElementById('customContentApp');

render(
		<Provider store={store}>
        	<CustomContent />
        </Provider>,
    	attachElement
);