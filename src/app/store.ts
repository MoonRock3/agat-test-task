import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import mapReducer from '../features/Map/mapSlice';

export const store = configureStore({
  reducer: {
    map: mapReducer,
  },
});

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  RootState,
  unknown,
  Action
>;
