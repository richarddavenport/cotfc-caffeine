import { compose } from '@ngrx/core/compose';
import { routerReducer } from '@ngrx/router-store';
import { Action, ActionReducer, combineReducers } from '@ngrx/store';
import { storeFreeze } from 'ngrx-store-freeze/dist';

import { environment } from './../environments/environment';
import { AppState } from './app.state';

const reducers: {[K in keyof AppState]} = {
  router: routerReducer,
};

const developmentReducer: ActionReducer<AppState> = compose(storeFreeze, combineReducers)(reducers);
const productionReducer: ActionReducer<AppState> = combineReducers(reducers);

export function appReducer(state: AppState, action: Action) {
  if (environment.production) {
    return productionReducer(state, action);
  } else {
    return developmentReducer(state, action);
  }
}
