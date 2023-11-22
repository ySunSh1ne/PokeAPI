import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { AppSlice, PokemonSlice } from "./slices";

// Configuração do store Redux
export const store = configureStore({
  reducer: {
    // Adiciona os reducers associados aos slices
    pokemon: PokemonSlice.reducer,
    app: AppSlice.reducer,
  },
});

// Tipos personalizados para o dispatch, o estado e as thunks
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
