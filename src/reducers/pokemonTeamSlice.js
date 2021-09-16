import {createSlice} from '@reduxjs/toolkit';

const pokemonTeamSlice = createSlice({
    name: 'pokemonteam',
    initialState: [],
    reducers: {
        addPokemon: (state, action) => {
            const newPokemon = {
                id: Date.now(),
                name: action.payload.name
            };
            state.push(newPokemon)
        },
        deletePokemon: (state, action) => {
            return state.filter((pokemon) => pokemon.id !== action.payload.id)
        }
    }
});

export const {addPokemon, deletePokemon} = pokemonTeamSlice.actions;

export default pokemonTeamSlice.reducer;