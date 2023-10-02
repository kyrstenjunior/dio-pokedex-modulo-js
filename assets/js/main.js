const pokemonList = document.querySelector(".grid");
const loadMoreBtn = document.querySelector("#loadMorePokemons");

var limit = 10;
var offset = 0;

function loadPokemonItems(offset, limit) {

  pokeApi.getPokemons(offset, limit).then((pokemons = []) => {

    const newHTML = pokemons.map((pokemon) => 
      `<li class="card" style="background-color:var(--${pokemon.type})">
          <div class="conteudo">
            <h2>${pokemon.name}</h2>
            <span class="number">#${pokemon.number}</span>
            <div class="types">
              ${pokemon.types.map((type) => `<span style="background-color:var(--${pokemon.type})">${type}</span>`).join("")}
            </div>
          </div>
          <img src="${pokemon.photo}" alt="${pokemon.name}">
        </li>`
    ).join('');

    pokemonList.innerHTML += newHTML;
  });

}

loadPokemonItems(offset, limit);

loadMoreBtn.addEventListener("click", () => {
  var count = offset + limit;

  if(count < 150){
    offset += limit;
    count = offset + limit;
    loadPokemonItems(offset, limit);
  } else if (count >= 150){
    offset = count;
    limit = 1;
    count = offset + limit;
    loadPokemonItems(offset, limit);
    document.querySelector(".pagination").style.display = "none";
  }

})