// @ts-nocheck

import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { defaultImages, images, pokemonTypes } from "../../utils";
import { generatedPokemonType, genericPokemonType } from "../../utils/types";

// Esta função assíncrona (thunk) obtém dados detalhados dos Pokémon com base em uma lista de Pokémon genéricos.
export const getPokemonsData = createAsyncThunk(
  "pokemon/randomPokemon",
  async (pokemons: genericPokemonType[]) => {
    try {
      // Inicializa um array para armazenar os dados detalhados dos Pokémon
      const pokemonsData: generatedPokemonType[] = [];

      // Itera sobre a lista de Pokémon genéricos para obter dados detalhados
      for await (const pokemon of pokemons) {
        // Faz uma solicitação HTTP GET para obter dados detalhados do Pokémon
        const {
          data,
        }: {
          data: {
            id: number;
            types: { type: genericPokemonType }[];
          };
        } = await axios.get(pokemon.url);

        // Mapeia os tipos do Pokémon para um formato mais legível
        const types = data.types.map(
          ({ type: { name } }: { type: { name: string } }) => ({
            [name]: pokemonTypes[name],
          })
        );

        // Obtém a imagem do Pokémon com base no ID, usando imagens padrão se não houver uma imagem específica
        let image: string = images[data.id];
        if (!image) {
          image = defaultImages[data.id];
        }

        // Adiciona os dados detalhados do Pokémon ao array
        if (image) {
          pokemonsData.push({
            name: pokemon.name,
            id: data.id,
            image,
            types,
          });
        }
      }

      // Retorna os dados detalhados dos Pokémon
      return pokemonsData;
    } catch (err) {
      // Em caso de erro, imprime o erro no console
      console.error(err);
    }
  }
);
