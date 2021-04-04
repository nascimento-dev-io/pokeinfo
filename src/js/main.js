function getElement(element) {
  return document.querySelector(element);
}

const url = "https://pokeapi.co/api/v2/pokemon";

const searchText = getElement("#search-text"),
  searchButton = getElement("#search-button"),
  containerInfo = getElement(".info-details"),
  erroMenssage = getElement(".erro-message");

searchButton.addEventListener("click", () => {
  let pokeName = searchText.value.toLowerCase();
  pokeInfoRequest(url, pokeName);

  setTimeout(() => containerInfo.classList.remove("fade"), 2000);
});

const options = {
  method: "GET",
  mode: "cors",
  cache: "default",
};

const pokeInfoRequest = (url, pokeName) => {
  fetch(`${url}/${pokeName}`, options)
    .then((pokeInfo) =>
      pokeInfo.json().then((jsonData) => {
        setInfo(jsonData);
        containerInfo.classList.add("fade");
        getElement(".erro-message").innerHTML = "";
        containerInfo.style.display = "flex";
      })
    )
    .catch((erro) => {
      getElement(".erro-message").innerHTML =
        "Verifique se digitou o nome do pokémon corretamente.";
      containerInfo.style.display = "none";
    });
};

const setInfo = (pokemonData) => {
  const image = getElement(".image img"),
    pokeName = getElement(".poke-name"),
    pokeNumber = getElement(".poke-number"),
    pokeType = getElement(".poke-type"),
    pokeWeight = getElement(".poke-Weight"),
    pokeHeight = getElement(".poke-Height"),
    pokeSkills = getElement(".poke-skill");

  image.src = pokemonData.sprites.other.dream_world.front_default;
  pokeName.innerHTML = pokemonData.name;
  pokeNumber.innerHTML = pokemonData.id;
  pokeType.innerHTML = pokemonData.types
    .map((item) => ` ${item.type.name}`)
    .toString();
  pokeWeight.innerHTML = pokemonData.weight / 10;
  pokeHeight.innerHTML = pokemonData.height / 10;
  pokeSkills.innerHTML = pokemonData.moves
    .reduce((acc, item, i) => {
      if (i > 8) {
        return acc;
      } else {
        return (acc += ` ${item.move.name}`);
      }
    }, "")
    .toString();
};
