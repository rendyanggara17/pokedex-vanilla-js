async function fetchPokemon(id) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    return response.json();
}


async function loadPokemonList(limit = 60) {
    const listContainer = document.getElementById('pokemonList');
    for (let i = 1; i <= limit; i++) {
        const pokemon = await fetchPokemon(i);
        const button = document.createElement('button');
        button.textContent = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
        button.addEventListener('click', () => {
            displayPokemonDetails(pokemon);
        });
        listContainer.appendChild(button);
    }
}

function displayPokemonDetails(pokemon) {
    const detailsContainer = document.getElementById('pokemonDetails');
    detailsContainer.innerHTML = `
        <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
        <h2>${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h2>
        <p><strong>Type:</strong> ${pokemon.types.map(t => t.type.name).join(', ')}</p>
        <p><strong>Height:</strong> ${pokemon.height} <span style="font-size:15px;">Foot</span></p>
        <p><strong>Weight:</strong> ${pokemon.weight} <span style="font-size:15px;">Pounds</span></p>
    `;
}

document.addEventListener('DOMContentLoaded', () => {
    loadPokemonList();
    document.getElementById('searchButton').addEventListener('click', () => {
        const keyword = document.getElementById('searchInput').value.toLowerCase();
        const buttons = document.querySelectorAll('.pokemon-list button');
        
        buttons.forEach(button => {
            if (button.textContent.toLowerCase().includes(keyword)) {
                button.style.display = 'block';
            } else {
                button.style.display = 'none';
            }
        });
    });

    document.getElementById('clearButton').addEventListener('click', () => {
        document.getElementById('searchInput').value = '';
        const buttons = document.querySelectorAll('.pokemon-list button');
        buttons.forEach(button => {
            button.style.display = 'block';
        });
    });
});
