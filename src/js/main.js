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

  setTimeout(() => containerInfo.classList.remove("fade"), 3000);
});

const pokeInfoRequest = (url, pokeName) => {
  const options = {
    method: "GET",
    mode: "cors",
    cache: "default",
  };

  fetch(`${url}/${pokeName}`, options)
    .then((pokeInfo) =>
      pokeInfo.json().then((jsonData) => {
        setInfo(jsonData);
      })
    )
    .catch((erro) => {
      showMessageError(erro);
    });
};

const getElementsCard = () => {
  const pokeImage = getElement(".image img"),
    pokeName = getElement(".poke-name"),
    pokeNumber = getElement(".poke-number"),
    pokeType = getElement(".poke-type"),
    pokeWeight = getElement(".poke-Weight"),
    pokeHeight = getElement(".poke-Height"),
    pokeSkills = getElement(".poke-skill");

  return [
    pokeImage,
    pokeName,
    pokeNumber,
    pokeType,
    pokeWeight,
    pokeHeight,
    pokeSkills,
  ];
};

const setInfo = (pokemonData) => {
  showDisplayCard();

  const elementsDisplay = getElementsCard();

  const types = pokemonData.types
    .map((item) => ` ${item.type.name}`)
    .toString();
  const weight = pokemonData.weight / 10;
  const height = pokemonData.height / 10;
  const skills = pokemonData.moves
    .reduce((acc, item, i) => {
      if (i > 15) {
        return acc;
      } else {
        return (acc += ` ${item.move.name}`);
      }
    }, "")
    .toString();

  const data = [
    pokemonData.sprites.other.dream_world.front_default,
    pokemonData.name,
    pokemonData.id,
    types,
    weight,
    height,
    skills,
  ];

  elementsDisplay.forEach((element, index) => {
    if (index == 0) {
      element.src = data[index];
    }
    element.innerHTML = data[index];
  });
};

const showDisplayCard = () => {
  getElement(".erro-message").innerHTML = "";
  containerInfo.classList.add("fade");
  containerInfo.style.display = "flex";
};

const showMessageError = (erro) => {
  getElement(".erro-message").innerHTML =
    "Verifique se digitou o nome do pokémon corretamente ( em inglês )";
  containerInfo.style.display = "none";
  console.log(erro);
};
