import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { pokemonsRoute } from "../../utils/constants";

// Esta função assíncrona (thunk) obtém os dados iniciais dos Pokémon.
export const getInitialPokemonData = createAsyncThunk(
  "pokemon/initialData",
  async () => {
    try {
      // Faz uma solicitação HTTP GET para a rota de Pokémon usando axios
      const { data } = await axios.get(pokemonsRoute);

      // Retorna os resultados (array de Pokémon) da resposta da API
      return data.results;
    } catch (err) {
      // Em caso de erro, imprime o erro no console
      console.error(err);
    }
  }
);
