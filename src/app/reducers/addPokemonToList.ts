import { createAsyncThunk } from "@reduxjs/toolkit";
import { addDoc } from "firebase/firestore";
import { pokemonListRef } from "../../utils/firebaseConfig";
import { getUserPokemons } from "./getUserPokemons";
import { setToast } from "../slices/AppSlice";
import {
  pokemonStatsType,
  pokemonTypeInterface,
  userPokemonsType,
} from "../../utils/types";
import { RootState } from "../store";

// Esta função assíncrona (thunk) adiciona um Pokémon à lista do usuário.
export const addPokemonToList = createAsyncThunk(
  "pokemon/addPokemon",
  async (
    pokemon: {
      id: number;
      name: string;
      types: pokemonTypeInterface[] | string[];
      stats?: pokemonStatsType[];
    },
    { getState, dispatch }
  ) => {
    try {
      // Obtém o estado atual usando o RootState
      const {
        app: { userInfo },
        pokemon: { userPokemons },
      } = getState() as RootState;

      // Verifica se o usuário está logado
      if (!userInfo?.email) {
        return dispatch(
          setToast("Please login in order to add pokemon to your collection.")
        );
      }

      // Procura se o Pokémon já está na coleção do usuário
      const index = userPokemons.findIndex((userPokemon: userPokemonsType) => {
        return userPokemon.name === pokemon.name;
      });

      // Se o Pokémon não estiver na coleção, adiciona-o
      if (index === -1) {
        let types: string[] = [];
        if (!pokemon.stats) {
          // Converte os tipos do Pokémon para uma matriz de strings
          pokemon.types.forEach((type: any) =>
            types.push(Object.keys(type).toString())
          );
        } else {
          types = pokemon.types as string[];
        }

        // Adiciona o Pokémon à coleção do usuário no Firestore
        await addDoc(pokemonListRef, {
          pokemon: { id: pokemon.id, name: pokemon.name, types },
          email: userInfo.email,
        });

        // Atualiza a lista de Pokémon do usuário no estado Redux
        await dispatch(getUserPokemons());

        // Exibe uma mensagem de sucesso
        dispatch(setToast(`${pokemon.name} added to your collection.`));
      } else {
        // Se o Pokémon já estiver na coleção, exibe uma mensagem
        dispatch(setToast(`${pokemon.name} already part of your collection.`));
      }
    } catch (err) {
      // Em caso de erro, exibe o erro no console
      console.log({ err });
    }
  }
);
