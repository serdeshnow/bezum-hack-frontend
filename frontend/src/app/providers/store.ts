import { combineReducers, configureStore } from '@reduxjs/toolkit';
// import userReducer from './reducers/user/user-slice.ts';

const rootReducer = combineReducers({
  /* reducers */
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    //   middleware: (getDefaultMiddleware) =>
    //     // getDefaultMiddleware().concat(pokemonApi.middleware),
  });
};

// export type RootState = ReturnType<typeof rootReducer>;
// export type AppStore = ReturnType<typeof setupStore>;
// export type AppDispatch = AppStore['dispatch'];
