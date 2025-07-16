const loadMoreButton = document.getElementById("loadMoreButton");
const limit = 10;
let offset = 0;

const pokemonList = document.getElementById("pokemonList");

function pokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}" onclick="window.open.href='/pokedex?pokemon=${pokemon.name}'">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>
            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>
                <img src="${pokemon.photo}" alt="${pokemon.name}">
            </div>
        </li>`;
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(pokemonToLi).join("");
        pokemonList.innerHTML += newHtml;
    });
}

// Carrega os primeiros 5 Pokémon
loadPokemonItens(offset, limit);

// Ao clicar no botão, carrega mais 5
loadMoreButton.addEventListener("click", () => {
    offset += limit;
    loadPokemonItens(offset, limit);
});
