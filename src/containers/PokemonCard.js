import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPokemons } from '../reducers/pokemonSlice';
import { addPokemon } from '../reducers/pokemonTeamSlice'
import _ from 'lodash';
import '../PokemonCard.css';
import Loading from './Loading'
import pokemonType from './typeColors';

function Pokemon(props) {
    const pokemonName = props.match.params.pokemon;
    const pokemonNew = useSelector(state => state.fetchPokemons);
    const dispatch = useDispatch();
    const pokemonList = useSelector(state => state.pokemonTeam);
    const [disable, setDisable] = useState(false)
    const [btnText, setBtnText] = useState('Add To Team')
    
    useEffect(()=> {
    },[pokemonList])

    //add pokemon on team
    function addToList(pokemon){
        dispatch(addPokemon({name: pokemon}))
        setBtnText('Already Added')
        setDisable(true)
    }

    //return true when already on team
    function checkDuplicate(){
        for(let i=0; i<pokemonList.length; i++){
            if(pokemonList[i].name === pokemonName){
                setDisable(true)
                setBtnText('Already Added')
            }
        }
    }

    const ShowData = () => {
        if(!_.isEmpty(pokemonNew.list[pokemonName])) {
            const pokeData = pokemonNew.list[pokemonName];
            return(
                <div className="pokemon-card">
                    <div className="pokemonCard-imgbackground">
                        <div className="pokemonCard-img">
                            <img src={pokeData.sprites.front_default} alt="" />
                            <h2 className="name">{pokemonName}</h2>
                                <div className="pokemonCard-type">
                                {pokeData.types.map((el, index) => {
                                    return <p className="img-type" key={index} style={{backgroundColor: pokemonType[el.type.name]}}>{el.type.name}</p>
                                })}
                            </div>
                        </div>
                    </div>
                    <div className="pokemonCard-right">
                        <div className="pokemonCard-stats">
                            <h3 className="subtitle">Stats</h3>
                            {pokeData.stats.map((el, index) => {
                                return <p className="text" key={index}>{el.stat.name}<span>{el.base_stat}</span></p>
                            })}
                        </div>
                        <div className="pokemonCard-abilities">
                            <h3 className= "subtitle">Abilities</h3>
                            {pokeData.abilities.map((el, index) => {
                                return <p className="text" key={index}>{el.ability.name}</p>
                            })}
                        </div>
                    </div>
                    {!disable ? 
                        <button className="pokemonCard-btn" onClick={() => addToList(pokemonName)}>{btnText}</button>:
                        <button className="pokemonCard-btn" disabled>{btnText}</button>
                    }
                </div>
            )
        }
        //from extraReducers
        if(pokemonNew.pending) {
            return <Loading />
        }
        if(pokemonNew.rejected !== "") {
            return <Loading />
            //<p>{pokemonNew.status}</p>
        }
        return <p>error getting pokemon</p>
    }
    useEffect(()=> {
        dispatch(fetchPokemons(pokemonName))
        window.scrollTo(0, 0)
        if(pokemonList.length >= 6 ){
            setDisable(true)
            setBtnText('Team Full')
        } 
        checkDuplicate()
    }, [])

    return (
        <div className="poke">
            {ShowData()}
        </div>
    )
}

export default Pokemon
