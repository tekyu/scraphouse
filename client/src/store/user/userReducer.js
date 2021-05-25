import produce from 'immer';
import { UPDATE_PLAYER } from './userActions';

export const initialState = {
  username: '',
  id: '',
  auth: false,
};

export const userReducer = produce(
  (draft = initialState, { type, payload }) => {
    switch (type) {
      case UPDATE_PLAYER:
        Object.assign(draft, payload);
        return draft;

      default:
        return draft;
    }
  },
);
