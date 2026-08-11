function fetchPromise(URL) {
    return new Promise(function (resolve) {
        fetch(URL)
            .then(function (response) {
                const promise = response.json()
                resolve(promise);
            })
            .catch(function (error) {
                console.log("error")
            })
    })
}

async function main(){
    let pokemons = [];
    const data = await fetchPromise("https://pokeapi.co/api/v2/pokemon/?offset=0&limit=898");
    pokemons = data.results;
    console.log(pokemons[2].name);
    const pokemonPromise = pokemons.map(pokemon => fetchPromise(pokemon.url));
    const pokemonElements = await Promise.all(pokemonPromise);
    const pokemonList = document.querySelector(".pokemon_list");
  
    const button = document.querySelector(".button");
    let size = 20;
    function renderPokemonList(data, size){
        let img = "";
        pokemonList.innerHTML = "";
        for(let i = 0; i < size; i++){
            img += `<div class="pokemon_item">
                        <div class="id">#${i+1}</div>
                        <div class="image">
                            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${i+1}.png" alt="${data[i].name}">
                        </div>
                        <div class="name">
                            <p>${data[i].name}</p>
                        </div>`
                   
            for (let j = 0; j < data[i].types.length; j++){
                img += `<div class="type">${data[i].types[j].type.name}</div>`
            }
            img += `</div>`
        }
        pokemonList.innerHTML = img;
    }
    renderPokemonList(pokemonElements, size);
}   
main();

