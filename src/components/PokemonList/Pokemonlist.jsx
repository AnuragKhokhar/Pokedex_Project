import "./PokemonList.css"
import Pokemon from "../Pokemon/Pokemon";
import usePokemonList from "../../hooks/usePokemonList";

function PokemonList() {

    const {pokemonListState, setPokemonListState} = usePokemonList("https://pokeapi.co/api/v2/pokemon", false);

    return (
        <div className="pokemon-list-wrapper">
            <div className="pokemonLst">Pokemon List</div>
            <div className="pokemon-wrapper">
            {(pokemonListState.isLoading) ? 'Loading....' : 
                pokemonListState.pokemonList.map((p)=> < Pokemon image = {p.image} name={p.name}  key={p.id} id ={p.id} />)
            }
            </div>
            <div className="controls">
                <button disabled={pokemonListState.prevUrl==null} onClick={()=>setPokemonListState({
                    ...pokemonListState,
                    pokedexurl: pokemonListState.prevUrl
                })} >Prev</button>

                <button disabled={pokemonListState.nextUrl==null} onClick={()=>setPokemonListState({
                    ...pokemonListState,
                    pokedexurl: pokemonListState.nextUrl
                })} >Next</button>
            </div>
        </div>
    )
}

export default PokemonList;