// require('es6-promise').polyfill();
import React from 'react';
import { render } from 'react-dom';
import { createStore, compose ,applyMiddleware } from 'redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import routes from './routes.js';
import { syncHistoryWithStore, routerMiddleware} from 'react-router-redux';

import reduxThunk from 'redux-thunk';
import rootReducer from './javascript/reducers/index';

const defaultState = {};
const createStoreWithMiddleware = applyMiddleware(routerMiddleware(browserHistory), reduxThunk)(createStore);
const enhancer = compose(
    window.devToolsExtension?window.devToolsExtension():f=>f
);
const store = createStoreWithMiddleware(rootReducer, defaultState,enhancer);

const history = syncHistoryWithStore(browserHistory, store);

const router = (
    <Provider store={store}>
        <Router history={history} routes={routes}>
        </Router>
    </Provider>
);

render(router, document.getElementById('root'));
