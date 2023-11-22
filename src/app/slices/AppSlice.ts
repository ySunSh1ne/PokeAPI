import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { pokemonTabs } from "../../utils/constants";
import { AppTypeInitialState } from "../../utils/types";

// Estado inicial do slice de aplicativo
const initialState: AppTypeInitialState = {
  isLoading: true,
  userInfo: undefined,
  toasts: [],
  currentPokemonTab: pokemonTabs.description,
};

// Criação do slice de aplicativo usando createSlice do Redux Toolkit
export const AppSlice = createSlice({
  name: "app", // Nome do slice
  initialState, // Estado inicial
  reducers: {
    // Reducer para definir o status de carregamento
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    // Reducer para definir o status do usuário
    setUserStatus: (
      state,
      action: PayloadAction<{ email: string } | undefined>
    ) => {
      state.userInfo = action.payload;
    },
    // Reducer para adicionar uma mensagem de aviso (toast)
    setToast: (state, action: PayloadAction<string>) => {
      const toasts = [...state.toasts];
      toasts.push(action.payload);
      state.toasts = toasts;
    },
    // Reducer para limpar as mensagens de aviso (toasts)
    clearToasts: (state) => {
      state.toasts = [];
    },
    // Reducer para definir a aba atual de Pokémon
    setPokemonTab: (state, action) => {
      state.currentPokemonTab = action.payload;
    },
  },
});

// Exporta as actions criadas automaticamente pelo createSlice
export const {
  setLoading,
  setUserStatus,
  setToast,
  clearToasts,
  setPokemonTab,
} = AppSlice.actions;
