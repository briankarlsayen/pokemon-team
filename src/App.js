import { Redirect, Route, Switch } from 'react-router';
import './App.css';
import PokemonList from './containers/PokemonList';
import PokemonCard from './containers/PokemonCard';
import PokemonTeam from './containers/PokemonTeam';
import { NavLink } from 'react-router-dom';
import PokeballImg from './pokeball.svg';

function App() {
  return (
    <div className="App">
        <nav>
          <div className="navBar">
            <NavLink to={"/pokemon-team"}>
              <img src={PokeballImg} alt="pokeball-logo" />
              <p>Pokemon</p>
            </NavLink>
            <div className="navList">
              <ul>
                <li><NavLink to="/pokemon-team/pokemonteam">Pokemon Team</NavLink></li>
              </ul>
            </div>
          </div>
        </nav>
      <Switch>
        <Route path={"/pokemon-team"} exact component={PokemonList} />
        <Route path={"/pokemon-team/pokemonteam"} exact component={PokemonTeam} />
        <Route path={"/pokemon-team/:pokemon"} exact component={PokemonCard} />
        <Redirect to={"pokemon-team/"} />
      </Switch>
    </div>
  );
}

export default App;
