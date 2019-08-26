var id= window.location.search.substring(4)

var url = "https://pokeapi.co/api/v2/pokemon/";
var url2 = "https://pokeapi.co/api/v2/pokemon-species/";
var url3 = "https://pokeapi.co/api/v2/pokemon/";
function renderPokemonsInfor(PokemonCard){
    
    var content = document.getElementsByClassName("content")[0]
    content.textContent = ""
    var pokemonID = PokemonCard.id;
    // console.log(Pokemon)
    var pokemon_name = PokemonCard.forms[0].name;
    console.log(PokemonCard);
    var pokemon_height = (((PokemonCard.height *0.328084)+0.001)*100/100).toFixed(1); 
    var pokemon_weight = (((PokemonCard.weight *0.220462)+0.001)*100/100).toFixed(2);
    var pokemontype = PokemonCard.types;
    var pokemonabi = PokemonCard.abilities;
    var imgSrc = 'https://img.pokemondb.net/artwork/'+pokemon_name+'.jpg'
    var pokemonHTML=`
    <div id='Card'>
        <img id="pokemonIMG" src=${imgSrc}>
        <h1 id="IDContainer">
            <div id="ID">#${pokemonID}.</div>
            <div id="name">${pokemon_name}</div>
            <br>
        </h1>
        <div id="Height">
            <div id="H">Height:</div>
            <div id="HH">${pokemon_height} ft</div>
        </div>
        <div id="Weight">
            <div id="W">Weight:</div>
            <div id="WW">${pokemon_weight} lbs</div>
        </div>
        <div id="T">Type:
        </div>
        <div id="A">Ability:
        </div>
    </div>
    `;
    content.insertAdjacentHTML("afterbegin", pokemonHTML);
    for (var type= 0; type< pokemontype.length; type++){
        var content2 =document.getElementById("T")
        var pokemonTYPE =pokemontype[type].type.name
        var typeHTML=`
        <div id="Type">${pokemonTYPE}</div>
        `
        content2.insertAdjacentHTML("beforeend", typeHTML)
    }
    for (var abi= 0; abi< pokemonabi.length; abi++){
        var content3 =document.getElementById("A")
        var pokemonABI =pokemonabi[abi].ability.name
        var abiHTML=`
        <div id="ABI">${pokemonABI}</div>
        `
        content3.insertAdjacentHTML("beforeend", abiHTML)
//     var pokemonHTML=`
//     <div>
        
//             <img id="img" src="${imgSrc}">
        
//             <small id="PokemonID">#${pokemonID}</small>
//             <br>
//             <small id="PokemonName">${pokemon_name}</small>
//             <br>
 
//     </div>
    
//         `;
//         content.insertAdjacentHTML("beforeend", pokemonHTML);
    }
}
function checkS(ar, astr){
    if(ar.length==0){
        return true
    }else{
        var a = true
        for(var i = 0; i < ar.length; i++){
            if(astr.substring(0,10).toLowerCase()==ar[i].substring(0,10).toLowerCase()){
                a = false
            }
        }
        return a
    }
}
function renderPokemonsDes(Pokemon_des) {
    var content = document.getElementsByClassName("content")[0]
    var pokDes = Pokemon_des.flavor_text_entries
    var pokemonDesList = [];
    var DesString = '';
    var pokemonDesHTML=`
    <div class="Description">
    </div>
    `
    for(var x=0; x<pokDes.length; x++){
        var pokDesToUse = pokDes[x].language.name
        if (pokDesToUse =='en'){
            // console.log('1')
            var pokemonDesToUse = pokDes[x].flavor_text
            pokemonDesList.push(pokemonDesToUse)
        }
    }

    // var pokDesToUse = Pokemon_des.flavor_text_entries[ii].flavor_text
    // console.log(pokemonDesList)
    var arr = []
    for (var y = 0; y<pokemonDesList.length; y++){
        if(!arr.includes(pokemonDesList[y])&&checkS(arr,pokemonDesList[y])){
            arr.push(pokemonDesList[y])
        } 
    }
    for (var z=0; z<arr.length; z++){
        DesString += arr[z]
        // pokemonDesHTML += `<div IDPokemon='pokemonLD'>${arr[z]}</div>`
    }
    // console.log(arr)
    pokemonDesHTML =`<h1>Description</h1><br><div class="Description">${DesString}</div>`
    // console.log(pokemonDesHTML)
    content.insertAdjacentHTML("afterbegin", pokemonDesHTML);
}


function renderPokemonStat(pokemon_stat) {
    for ( var pokemon_stat_count = 0 ; pokemon_stat_count < pokemon_stat.length ; pokemon_stat_count++){
        console.log(pokemon_stat)
        // console.log("Congrats")
        var pokemon_STAT = pokemon_stat[pokemon_stat_count]
        var stat = pokemon_STAT.base_stat
        // var name = pokemon_STAT.stat.name;
        var pokemon_stat_count2 = pokemon_stat_count+=1
        var pokemon_stat_count3 = pokemon_stat_count2.toString();
        var myBarr = "myBar" +pokemon_stat_count3
        var elem = document.getElementById(myBarr); 
        console.log(myBarr)
        var width = 10;
        var stats = stat /1
        for ( var y = 0; y <stats; y++){
            width++; 
            elem.style.width = width + '%'; 
        }
    };
}
function fetchCharacter () {

    var pokemonURL = `${url}${id}`
    sendGetRequest(pokemonURL, function (responseData) {

            var PokemonCard = responseData;
            var pokemon_stat= responseData.stats;
            renderPokemonsInfor(PokemonCard)
            renderPokemonStat(pokemon_stat);
    })
}
function fetchPokemonsDes(){
    var desURL = `${url2}${id}`;
    sendGetRequest(desURL, function(PokemonsDes) {
        var Pokemon_des = PokemonsDes
        renderPokemonsDes(Pokemon_des)
    });
}
// function fetchPokemonsStat() {
//     var statURL = `${url3}${id}`
//     sendGetRequest(statURL, function(pokemonStat){
//         var pokemon_stat= pokemonStat.stats;
//         renderPokemonStat(pokemon_stat);
//     });
// };
fetchCharacter();
fetchPokemonsDes();
// fetchPokemonsStat();
