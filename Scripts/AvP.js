// Map the names of the animals to the Pokemon that match them.
const animalMap = {
  turtle: ["squirtle", "wartortle", "blastoise", "turtwig", "tirtouga", "drednaw"],
  tortoise: ["torkoal", "turtwig", "grotle", "torterra"],
  fox: ["vulpix", "ninetales", "eevee", "fennekin", "nickit", "zorua"],
  mouse: ["pikachu", "raichu", "sandshrew", "marill", "dedenne", "pawmi"],
  rat: ["rattata", "raticate"],
  cat: ["meowth", "persian", "skitty", "purrloin", "litten", "sprigatito"],
  dog: ["growlithe", "arcanine", "snubbull", "electrike", "yamper", "fidough"],
  wolf: ["lycanroc", "mightyena", "zacian", "zamazenta"],
  bear: ["teddiursa", "ursaring", "beartic", "pancham", "bewear", "kubfu"],
  owl: ["hoothoot", "noctowl", "rowlet", "dartrix", "decidueye"],
  dragon: ["dratini", "dragonair", "dragonite", "gible", "axew", "druddigon"],
  monkey: ["mankey", "primeape", "chimchar", "grookey", "pansear", "pansage"],
  frog: ["poliwag", "croagunk", "froakie", "frogadier", "greninja", "tadbulb"],
  snake: ["ekans", "arbok", "seviper", "silicobra"],
  duck: ["psyduck", "golduck", "farfetchd", "ducklett", "quaxly"],
  bird: ["pidgey", "spearow", "tailow", "starly", "pikipek", "rookidee"],
  rhino: ["rhyhorn", "rhydon", "rhyperior"],
  rabbit: ["buneary", "bunnelby", "scorbunny", "lopunny"],
  lion: ["shinx", "luxio", "luxray", "pyroar", "solgaleo", "litleo"],
  tiger: ["raikou", "incineroar"],
  elephant: ["phanpy", "donphan", "cufant", "copperajah"],
  pig: ["swinub", "tepig", "pignite", "emboar", "lechonk"],
  penguin: ["piplup", "prinplup", "empoleon", "eiscue"],
  horse: ["ponyta", "rapidash", "blitzle", "zebstrika", "spectrier"],
  butterfly: ["butterfree", "beautifly", "vivillon"],
  spider: ["spinarak", "ariados", "joltik", "tarountula"],
  fish: ["magikarp", "goldeen", "feebas", "finneon", "wishiwashi"],
  shark: ["sharpedo", "garchomp"],
  crocodile: ["totodile", "croconaw", "feraligatr", "sandile", "fuecoco"],
  alligator: ["totodile", "sandile", "fuecoco"],
  bat: ["zubat", "golbat", "crobat", "woobat", "noibat"],
  bee: ["beedrill", "combee", "vespiquen"],
  chameleon: ["charmander", "charmeleon", "kecleon"],
  whale: ["wailmer", "wailord", "kyogre"],
  eagle: ["braviary"]
};

const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const resultsGrid = document.getElementById('resultsGrid');


// Handling the search input
async function handleSearch() {
  const query = searchInput.value.toLowerCase().trim();
  resultsGrid.innerHTML = '<p class="message">Searching Pokédex...</p>';
//Error message to be displayed if nothing is entered by the user.
  if (!query) {
    resultsGrid.innerHTML = '<p class="message">Please enter an animal name.</p>';
    return;
  }

  const matchingPokemon = animalMap[query];
//If the user does input something but it does not match any of the animals from the animal map.
  if (!matchingPokemon || matchingPokemon.length === 0) {
    resultsGrid.innerHTML = `<p class="message">No matching Pokémon found for "${query}". Please try again.</p>`;
    return;
  }

  resultsGrid.innerHTML = ''; 

  for (const name of matchingPokemon) {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`); //call the Pokemon API
      if (!response.ok) continue;

      const data = await response.json();
      const types = data.types.map(t => t.type.name).join(' / ');
      const imageUrl = data.sprites.other['official-artwork'].front_default || data.sprites.front_default;

      const card = document.createElement('div');
      card.className = 'pokemon-card';
      card.innerHTML = `
        <img src="${imageUrl}" alt="${data.name}">
        <div class="pokemon-name">${data.name}</div>
        <div class="pokemon-type">${types}</div>
      `;
//In case of error retrieving results.
      resultsGrid.appendChild(card);
    } catch (error) {
      console.error(`Error fetching Pokémon ${name}:`, error);
    }
  }
}


searchBtn.addEventListener('click', handleSearch);
// Function to allow user to press enter in the search bar to send for results.
searchInput.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    handleSearch();
  }
});

/* The following were used to help create this: 
https://emis-stuff.medium.com/creating-a-simple-web-app-with-the-pok%C3%A9mon-api-9b7433d38859
https://medium.com/@sergio13prez/fetching-them-all-poke-api-62ca580981a2
https://pokeapi.co/
Used to help create JS to allow user to press enter in search bar:
https://www.w3schools.com/howto/howto_js_trigger_button_enter.asp */