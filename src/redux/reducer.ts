import { combineReducers } from 'redux';
import { default as HouseReducer } from './redux/reducer';
import { State } from './state';

/**
 * Root reducer of the application combining all sub reducers.
 */
export const reducer = combineReducers<State>({
    houses: HouseReducer
});
