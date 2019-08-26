var url = "https://pokeapi.co/api/v2/pokedex/1/";

function openDetail() {
    var character_div = document.getElementsByClassName("PokemonCard")
    for (i=0;i<character_div.length;i++) {
        var character = character_div[i]
        character.addEventListener("click",function (e) {
            var div_clicked = e.target.parentNode
            var id = div_clicked.id 
            window.open(`detail.html?id=${id}`,"_self")         
        }) 
    }
}


function renderPokemons(Pokemons) {
    var content = document.getElementsByClassName("content")[0]
    content.textContent=""
    for (var i = 0; i <Pokemons.length; i++){
        var Pokemon = Pokemons[i];
        var pokemon_ID = Pokemon.entry_number;
        var pokemonname = Pokemon.pokemon_species.name;
        var imgSrc = 'https://img.pokemondb.net/sprites/omega-ruby-alpha-sapphire/dex/normal/'+pokemonname+'.png';
        var pokemonHTML=`
        <div id="${pokemon_ID}" class="PokemonCard">
          
                    <img id="img" src="${imgSrc}">
               
                    <small id="PokemonID">#${pokemon_ID}</small>
                    <br>
                    <small id="PokemonName">${pokemonname}</small>
                    <br>
     
        </div>
        
            `;
            content.insertAdjacentHTML("beforeend", pokemonHTML);

        }
        openDetail()
    }


  
function fetchPokemons(){
    var pokedexfullURL = `${url}`;
    sendGetRequest(pokedexfullURL, function(Pokemonss) {
        var Pokemons = Pokemonss.pokemon_entries;
        // console.log(Pokemons);
        renderPokemons(Pokemons)
    });
}

// function setUpEvents() {
//     var btnSearch = document.getElementById("btn_search");
//     btnSearch.addEventListener("click", function(e){
//     var searchBar = document.getElementById("search_bar");
//     var searchString = searchBar.value;
//     var key = marvelKey(privateKey, publicKey);
//     var fullURL=`${url}?${key}&nameStartsWith=${searchString}`;
//     sendGetRequest(fullURL, function(responseData){
//         var Pokemons = responseData.data.results;
//         renderPokemons(Pokemons)
//     })
// });      
// }

fetchPokemons();
// setUpEvents();
