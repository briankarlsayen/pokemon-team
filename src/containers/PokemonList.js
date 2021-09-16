import React, {useEffect, useState} from 'react'
import SearchIcon from '@material-ui/icons/Search';
import axios from 'axios'

function PokemonList(props) {
    const [search, setSearch] = useState("")
    const [callback, setCallback] = useState(false)
    
    const formHandler = (e) => {
        props.history.push(`/pokemon-team/${search}`)
    }

    useEffect(() => {
        let isMounted = true
        function getRandom(){
            const rand = Math.floor(Math.random() * 1117) 
            axios.get(`https://pokeapi.co/api/v2/pokemon?limit=1&offset=${rand}`)
            .then(result => {if(isMounted) setSearch(result.data.results[0].name)})
        }
        getRandom()
        return () => {isMounted = false}
    }, [callback])

    return (
        <div className="pokemon-list">
            
            <div className={"search-wrapper"}>
                <form className="searchWrapper-form" onSubmit={()=> formHandler()}>
                    <p>Search Pokemon</p>
                    <div className="searchform">
                        <input className="searchForm-searchbar" placeholder="ex. pikachu" type="text" onChange={e => setSearch(e.target.value)} />
                        <button><SearchIcon /></button>
                    </div>
                    <button className="randomBtn" onClick={()=> setCallback(!callback)}>Random</button>
                </form>
                
            </div>
        </div>
    )
}

export default PokemonList
