import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {fetchPokemons} from '../reducers/pokemonSlice';
import { deletePokemon } from '../reducers/pokemonTeamSlice'
import _ from 'lodash';
import '../PokemonCard.css';
import pokemonType from './typeColors';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

function PokemonTeam(props) {
    const pokemonNew = useSelector(state => state.fetchPokemons);
    const pokemonList = useSelector(state => state.pokemonTeam);
    const dispatch = useDispatch();

    //delete pokemon on team
    const removeToList = (id) => {
        dispatch(deletePokemon({id: id}))
    }

    const ShowData = (pokemonName, pokemonId) => {
        if(!_.isEmpty(pokemonNew.list[pokemonName])) {
            const pokeData = pokemonNew.list[pokemonName];
            return(
                <div key={pokemonId} className="pokemon-card pokemon-team">
                    <div className="pokemonCard-imgbackground">
                        <div className="pokemonCard-img">
                            <img src={pokeData.sprites.front_default} alt={pokemonName} />
                            <button className="pokemonCard-remove" onClick={() => removeToList(pokemonId)}><HighlightOffIcon /></button>
                            <h2 className="name">{pokemonName}</h2>
                                <div className="pokemonCard-type">
                                {pokeData.types.map((el, index) => {
                                    return <p className="img-type" key={index} style={{backgroundColor: pokemonType[el.type.name]}}>{el.type.name}</p>
                                })}
                            </div>
                        </div>
                        <button style={{marginTop:10, width: 150}} className="pokemonCard-btn" onClick={() => props.history.push(`/pokemon-team/${pokemonName}`)}>View</button>
                        
                    </div>
                    
                </div>
                
            )
        }
        //from extraReducers
        if(pokemonNew.pending) {
            return <p>Loading...</p>
        }
    }

    useEffect(()=> {
        for(let i=0;i<pokemonList.length; i++){
            dispatch(fetchPokemons(pokemonList[i].name))   
        }
        window.scrollTo(0, 0)
    }, [])

    useEffect(()=> {
    }, [pokemonList])
    return (

        <div className="poke">
            {pokemonList.map(pokemon =>(
                ShowData(pokemon.name, pokemon.id)
            ))}
        </div>
    )
}

export default PokemonTeam
