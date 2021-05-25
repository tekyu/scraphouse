import { createSelector } from 'reselect';
import { initialState } from './userReducer';

const userSelector = state => state.user;

export const user = createSelector(userSelector, user => user);

export const auth = createSelector(
  userSelector,
  ({ auth = initialState.auth }) => auth,
);

export const username = createSelector(
  userSelector,
  ({ username = initialState.username }) => username,
);

export const id = createSelector(
  userSelector,
  ({ id = initialState.id }) => id,
);
