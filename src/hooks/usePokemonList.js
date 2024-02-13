import axios from "axios";
import { useState, useEffect } from "react";

function usePokemonList(url, types){
    const [pokemonListState, setPokemonListState] = useState({
        pokemonList: [],
        isLoading: true,
        pokedexurl: url,
        nextUrl: '',
        prevUrl: ''
    });

    async function downloadPokemons(){
        setPokemonListState({...pokemonListState, isLoading: true});
        const response = await axios.get(pokemonListState.pokedexurl);

        const pokemonResults = response.data.results;

        setPokemonListState((pokemonListState) => ({
            ...pokemonListState,
            nextUrl: response.data.next,
            prevUrl: response.data.previous
        }));

        if(types){
            setPokemonListState((state)=>({
                ...state,
                pokemonList: response.data.pokemon.slice(0,5),
            }));
        }

        else{
            
            const pokemonResultPromise = pokemonResults.map( async (pokemon) => await axios.get(pokemon.url));
            const pokemonData = await axios.all(pokemonResultPromise);
            console.log(pokemonData);

            const pokeListresult = pokemonData.map((pokeData)=>{
            const pokemon = pokeData.data;
            return {
                id:pokemon.id,
                name : pokemon.name,
                image: pokemon.sprites.other.dream_world.front_default,
                type: pokemon.types
            }    

            });

            setPokemonListState((pokemonListState)=> ({
                ...pokemonListState,
                pokemonList: pokeListresult,
                isLoading: false
            }));
        }

        
    }
    
    useEffect(()=>{
        downloadPokemons();
    }, [pokemonListState.pokedexurl]);

    return {pokemonListState, setPokemonListState};

}

export default usePokemonList;