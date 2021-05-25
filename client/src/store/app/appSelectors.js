import { createSelector } from "reselect";
import { initialState } from "./appReducer";

export const error = createSelector(
  state => state.app,
  ({ error = initialState.error }) => error
);

export const modalType = createSelector(
  state => state.app,
  ({ modalType = initialState.modalType }) => modalType
);
