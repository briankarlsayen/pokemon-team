import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'


export const fetchPokemons = createAsyncThunk(
    "posts/fetchPokemons", async (pokemon, thunkAPI) => {
       try {
          //const response = await fetch(`url`); //where you want to fetch data
          //Your Axios code part.
          //const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);//where you want to fetch data
          const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);//where you want to fetch data
          return await response.data
        } catch (error) {
           return thunkAPI.rejectWithValue({ error: error.message });
        }
  });

const initialState = {
    list: {}
}

const pokemonSlice = createSlice({
  name: 'pokemons',
  initialState,
  extraReducers: {
        [fetchPokemons.pending]: (state, action) => {
            state.status = 'loading'
            state.list = ''
        },
        [fetchPokemons.fulfilled]: (state, action) => {
           
            state.status = 'success'
            state.list = {
                ...state.list,
                [action.meta.arg]: action.payload
            }
        },
        [fetchPokemons.rejected]: (state, action) => {
            state.status = 'failed to get pokemon'
            state.list = ''
        }
    }
})

export default pokemonSlice.reducer