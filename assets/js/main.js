const loadMoreButton = document.getElementById("loadMoreButton");
const pokemonList = document.getElementById("pokemonList");
const searchInput = document.querySelector(".input");

let offset = 0;
let limit = 0;
let MAX_POKEMONS = 0;

// Gera HTML de um Pokémon
function pokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}" onclick="window.open('/pokedex.html?pokemon=${pokemon.name}', '_blank')">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>
            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join("")}
                </ol>
                <img src="${pokemon.photo}" alt="${pokemon.name}">
            </div>
        </li>
    `;
}

// Carrega os Pokémon
function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(pokemonToLi).join("");
        pokemonList.innerHTML += newHtml;
    });
}

// Busca um Pokémon
async function getPokemon() {
    const query = searchInput.value.trim().toLowerCase();

    if (query === "") {
        clearSearch();
        return;
    }

    const id = Number(query);
    if (!isNaN(id) && (id < 1 || id > MAX_POKEMONS)) {
        alert(`O ID deve ser entre 1 e ${MAX_POKEMONS}.`);
        return;
    }

    const url = `https://pokeapi.co/api/v2/pokemon/${query}`;

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("Não encontrado");

        const data = await response.json();
        const pokemon = convertPokeApiDetailToPokemon(data);

        pokemonList.innerHTML = pokemonToLi(pokemon);
    } catch (error) {
        alert("Pokémon não encontrado. Tente novamente.");
    }
}

// Botão limpar
function clearSearch() {
    searchInput.value = "";
    pokemonList.innerHTML = "";
    offset = 0;
    loadPokemonItens(offset, limit);
}

// Suporte ao Enter no input
searchInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        getPokemon();
    }
});

// Inicializa: pega todos os Pokémon e define MAX_POKEMONS dinamicamente
pokeApi.getPokemons(0, 10000).then((pokemons = []) => {
    MAX_POKEMONS = pokemons.length;
    limit = MAX_POKEMONS;
    pokemonList.innerHTML = "";
    loadPokemonItens(offset, limit);
    loadMoreButton.style.display = "none"; // esconde botão se tudo já estiver carregado
});

// Botões
document.querySelector(".btnSearch").addEventListener("click", getPokemon);
document.querySelector(".btnClear").addEventListener("click", clearSearch);
