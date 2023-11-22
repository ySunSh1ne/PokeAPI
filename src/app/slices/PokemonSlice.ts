import { createSlice } from "@reduxjs/toolkit";
import { getInitialPokemonData } from "../reducers/getInitialPokemonData";
import { getPokemonsData } from "../reducers/getPokemonsData";
import { getUserPokemons } from "../reducers/getUserPokemons";
import { removePokemonFromUserList } from "../reducers/removePokemonFromUserList";
import {
  PokemonInitialStateType,
  generatedPokemonType,
} from "../../utils/types";

// Estado inicial do slice relacionado aos Pokémon
const initialState: PokemonInitialStateType = {
  allPokemon: undefined,
  randomPokemons: undefined,
  compareQueue: [],
  userPokemons: [],
  currentPokemon: undefined,
};

// Criação do slice relacionado aos Pokémon usando createSlice do Redux Toolkit
export const PokemonSlice = createSlice({
  name: "pokemon", // Nome do slice
  initialState, // Estado inicial
  reducers: {
    // Reducer para adicionar um Pokémon à fila de comparação
    addToCompare: (state, action) => {
      const index = state.compareQueue.findIndex(
        (pokemon: generatedPokemonType) => pokemon.id === action.payload.id
      );
      if (index === -1) {
        if (state.compareQueue.length === 2) {
          state.compareQueue.pop();
        }
        state.compareQueue.unshift(action.payload);
      }
    },
    // Reducer para remover um Pokémon da fila de comparação
    removeFromCompare: (state, action) => {
      const index = state.compareQueue.findIndex(
        (pokemon: generatedPokemonType) => pokemon.id === action.payload.id
      );
      const queue = [...state.compareQueue];
      queue.splice(index, 1);
      state.compareQueue = queue;
    },
    // Reducer para definir o Pokémon atual
    setCurrentPokemon: (state, action) => {
      state.currentPokemon = action.payload;
    },
    // Reducer para redefinir os Pokémon aleatórios
    resetRandomPokemons: (state) => {
      state.randomPokemons = undefined;
    },
  },

  // Configuração de reducers adicionais gerados automaticamente pelo createSlice
  extraReducers: (builder) => {
    // Reducer para preencher o estado com os Pokémon iniciais
    builder.addCase(getInitialPokemonData.fulfilled, (state, action) => {
      state.allPokemon = action.payload;
    });
    // Reducer para preencher o estado com os Pokémon aleatórios
    builder.addCase(getPokemonsData.fulfilled, (state, action) => {
      state.randomPokemons = action.payload;
    });
    // Reducer para preencher o estado com os Pokémon do usuário
    builder.addCase(getUserPokemons.fulfilled, (state, action) => {
      state.userPokemons = action.payload!;
    });
    // Reducer para remover um Pokémon da lista do usuário
    builder.addCase(removePokemonFromUserList.fulfilled, (state, action) => {
      const userPokemons = [...state.userPokemons];
      const index = userPokemons.findIndex(
        (pokemon) => pokemon.firebaseId === action.payload?.id
      );
      userPokemons.splice(index, 1);
      state.userPokemons = userPokemons;
    });
  },
});

// Exporta as actions criadas automaticamente pelo createSlice
export const {
  addToCompare,
  removeFromCompare,
  setCurrentPokemon,
  resetRandomPokemons,
} = PokemonSlice.actions;
