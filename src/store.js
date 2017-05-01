import { combineReducers } from 'redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from "redux-logger";
import { projectsReducer } from './containers/ProjectList/store';

const rootReducer = combineReducers({
  projects: projectsReducer
});

const logger = createLogger();

const store = createStore(rootReducer,
  {},
  applyMiddleware(thunk, logger)
);

export default store;
