const loadMoreButton = document.getElementById("loadMoreButton");
const pokemonList = document.getElementById("pokemonList");
const searchInput = document.querySelector(".input");
const searchButton = document.querySelector(".btnSearch");
const clearButton = document.querySelector(".btnClear");

let offset = 0;
const limit = 15;
const MAX_POKEMONS = 1025; // Valor fixo para a Pokédex nacional

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

    pokemonList.innerHTML = "";
    loadMoreButton.style.display = "none";

    // Se for um número, tenta buscar por ID
    if (!isNaN(query)) {
        const id = parseInt(query);
        if (id < 1 || id > MAX_POKEMONS) {
            alert(`O ID deve ser entre 1 e ${MAX_POKEMONS}.`);
            return;
        }

        try {
            const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
            if (!res.ok) throw new Error();
            const data = await res.json();
            const pokemon = convertPokeApiDetailToPokemon(data);
            pokemonList.innerHTML = pokemonToLi(pokemon);
            return;
        } catch {
            alert("Pokémon não encontrado por ID.");
            return;
        }
    }

    // Se não for número, tenta buscar como nome
    try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${query}`);
        if (res.ok) {
            const data = await res.json();
            const pokemon = convertPokeApiDetailToPokemon(data);
            pokemonList.innerHTML = pokemonToLi(pokemon);
            return;
        }
    } catch {}

    // Se não for nome, tenta buscar como tipo
    try {
        const res = await fetch(`https://pokeapi.co/api/v2/type/${query}`);
        if (!res.ok) throw new Error("Tipo inválido");

        const data = await res.json();

        const pokemonPromises = data.pokemon
            .slice(0, 30) // Limita a 30 Pokémon por tipo
            .map(async (entry) => {
                const res = await fetch(entry.pokemon.url);
                const pokeData = await res.json();
                return convertPokeApiDetailToPokemon(pokeData);
            });

        const pokemons = await Promise.all(pokemonPromises);
        const html = pokemons.map(pokemonToLi).join("");
        pokemonList.innerHTML = html;
    } catch {
        alert("Nenhum Pokémon, ID ou tipo encontrado.");
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

// Inicializa a lista com os 1025 principais
loadPokemonItens(offset, limit);

// Eventos de botão
searchButton.addEventListener("click", getPokemon);
clearButton.addEventListener("click", clearSearch);
loadMoreButton.addEventListener("click", () => {
    offset += limit;
    loadPokemonItens(offset, limit);
});
