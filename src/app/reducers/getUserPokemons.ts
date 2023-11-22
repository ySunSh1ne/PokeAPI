import { createAsyncThunk } from "@reduxjs/toolkit";
import { getDocs, query, where } from "firebase/firestore";
import { pokemonListRef } from "../../utils/firebaseConfig";
import { defaultImages, images, pokemonTypes } from "../../utils";
import { RootState } from "../store";
import { userPokemonsType } from "../../utils/types";

// Esta função assíncrona (thunk) obtém os Pokémon associados ao usuário atual.
export const getUserPokemons = createAsyncThunk(
  "pokemon/userList",
  async (args, { getState }) => {
    try {
      // Obtém informações do usuário do estado global (Redux)
      const {
        app: { userInfo },
      } = getState() as RootState;

      // Verifica se o usuário está autenticado (possui informações de e-mail)
      if (!userInfo?.email) {
        return; // Retorna imediatamente se o usuário não estiver autenticado
      }
      // Cria uma consulta para obter os Pokémon do usuário no Firestore
      const firestoreQuery = query(
        pokemonListRef,
        where("email", "==", userInfo?.email)
      );

      // Executa a consulta e obtém os documentos correspondentes
      const fetchedPokemons = await getDocs(firestoreQuery);

      // Se existirem Pokémon associados ao usuário, processa e retorna os dados
      if (fetchedPokemons.docs.length) {
        const userPokemons: userPokemonsType[] = [];

        // Itera sobre os documentos e processa cada Pokémon associado ao usuário
        fetchedPokemons.forEach(async (pokemon) => {
          const pokemons = await pokemon.data().pokemon;

          // @ts-ignore

          // Obtém a imagem do Pokémon com base no ID, usando imagens padrão se não houver uma imagem específica
          let image = images[pokemons.id];
          if (!image) {
            // @ts-ignore
            image = defaultImages[pokemons.id];
          }

          // Mapeia os tipos do Pokémon para um formato mais legível
          const types = pokemons.types.map((name: string) => ({
            // @ts-ignore

            [name]: pokemonTypes[name],
          }));

          // Adiciona o Pokémon processado ao array de Pokémon do usuário
          userPokemons.push({
            ...pokemons,
            firebaseId: pokemon.id,
            image,
            types,
          });
        });

        // Retorna a lista de Pokémon associados ao usuário
        return userPokemons;
      }

      // Retorna um array vazio se não houver Pokémon associados ao usuário
      return [];
    } catch (err) {
      // Em caso de erro, imprime o erro no console
      console.log(err);
    }
  }
);
