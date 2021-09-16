import { configureStore } from '@reduxjs/toolkit'
import fetchPokemons from './reducers/pokemonSlice'
import pokemonTeam from './reducers/pokemonTeamSlice'
import storage from 'redux-persist/lib/storage'
import {combineReducers} from "redux"; 
import { persistReducer } from 'redux-persist'

const reducers = combineReducers({
  fetchPokemons,
  pokemonTeam     
 });

 const persistConfig = {
  key: 'root',
  storage,
  blacklist: [fetchPokemons.reducerPath],
};

const persistedReducer = persistReducer(persistConfig, reducers)

const Store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({
    serializableCheck: {
      // Ignore these action types
      ignoredActions: ['persist/PERSIST']
    },
  }),
})

export default Store