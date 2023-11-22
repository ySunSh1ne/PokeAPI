import { createAsyncThunk } from "@reduxjs/toolkit";
import { deleteDoc, doc } from "firebase/firestore";
import { pokemonListRef } from "../../utils/firebaseConfig";

// Esta função assíncrona (thunk) remove um Pokémon da lista do usuário.
export const removePokemonFromUserList = createAsyncThunk(
  "pokemon/remove",
  async ({ id }: { id: string }) => {
    try {
      // Cria uma referência ao documento do Pokémon no Firestore usando o ID
      const pokemonDocRef = doc(pokemonListRef, id);

      // Deleta o documento correspondente ao Pokémon da lista do usuário
      await deleteDoc(pokemonDocRef);

      // Retorna o ID do Pokémon removido para atualização no estado Redux
      return { id };
    } catch (err) {
      // Em caso de erro, imprime o erro no console
      console.log(err);
    }
  }
);
