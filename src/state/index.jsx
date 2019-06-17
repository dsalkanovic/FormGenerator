import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { combineReducers } from 'redux';

import configurator from './configurator';
import fields from './fields';
import ui from './ui';

const initialState = {};
const enhancers = [];
const middleware = [thunk];

if (process.env.NODE_ENV === 'development') {
    if (typeof window === 'object') {
        const { __REDUX_DEVTOOLS_EXTENSION_COMPOSE__ } = window;
        if (__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ && typeof __REDUX_DEVTOOLS_EXTENSION_COMPOSE__ === 'function') {
            enhancers.push(__REDUX_DEVTOOLS_EXTENSION_COMPOSE__());
        }
    }
}

const appReducer = combineReducers({
    configurator,
    ui,
    fields
});

const rootReducer = (state, action) => appReducer(state, action);
const composedEnhancers = compose(
    applyMiddleware(...middleware),
    ...enhancers
);
export const store = createStore(rootReducer, initialState, composedEnhancers);
