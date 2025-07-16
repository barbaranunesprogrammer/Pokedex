// main.js otimizado com paginação e suporte a ID/nome na busca

const loadMoreButton = document.getElementById("loadMoreButton");
const pokemonList = document.getElementById("pokemonList");
const searchInput = document.querySelector(".input");
const searchButton = document.querySelector(".btnSearch");
const clearButton = document.querySelector(".btnClear");

let offset = 0;
const limit = 15;
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

        if ((offset + limit) >= MAX_POKEMONS) {
            loadMoreButton.style.display = "none";
        }
    });
}

// Busca um Pokémon
async function getPokemon() {
    const query = searchInput.value.trim().toLowerCase();

    if (query === "") {
        clearSearch();
        return;
    }

    let idOrName = query;
    if (!isNaN(query)) {
        const id = parseInt(query);
        if (id < 1 || id > MAX_POKEMONS) {
            alert(`O ID deve ser entre 1 e ${MAX_POKEMONS}.`);
            return;
        }
        idOrName = id;
    }

    const url = `https://pokeapi.co/api/v2/pokemon/${idOrName}`;

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("Não encontrado");

        const data = await response.json();
        const pokemon = convertPokeApiDetailToPokemon(data);

        pokemonList.innerHTML = pokemonToLi(pokemon);
        loadMoreButton.style.display = "none";
    } catch (error) {
        alert("Pokémon não encontrado. Tente novamente.");
    }
}

// Botão limpar
function clearSearch() {
    searchInput.value = "";
    pokemonList.innerHTML = "";
    offset = 0;
    loadMoreButton.style.display = "block";
    loadPokemonItens(offset, limit);
}

// Suporte ao Enter no input
searchInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        getPokemon();
    }
});

// Inicializa com limite total
fetch("https://pokeapi.co/api/v2/pokemon?limit=1")
    .then(res => res.json())
    .then(data => {
        MAX_POKEMONS = data.count;
        loadPokemonItens(offset, limit);
    });

// Eventos de botão
searchButton.addEventListener("click", getPokemon);
clearButton.addEventListener("click", clearSearch);
loadMoreButton.addEventListener("click", () => {
    offset += limit;
    loadPokemonItens(offset, limit);
});
