
function onPasteDeckLink(e){
  let link = e.clipboardData.getData('text');
  deckLinkBox.value = "Loading...";
  takeDeckRequest(link);
}

function takeDeckRequest(decklink){
  var deckrequest = 'https://ffdecks.com/api/deck?deck_id=' + decklink.slice(-16)
  var request = new Request(deckrequest);
  fetch(request).then(function(response) {
      return response.json();
  }).then(function(deck){
    console.log(deck)
      importCards(deck);
      loadAllFFDecksTools();
      deckLinkBox.placeholder = "FF: " + deck['name'];
      deckLinkBox.value = "";
  })
}


var ffImages = []
function importCards(deck){
  for(var i = 0; i < deck['cards'].length; i++){
      ffImages.push(deck['cards'][i]['card']['image'])
  }
}

const ffdecksBar = document.getElementById('FFdecks');

function loadAllFFDecksTools(){
  for (var i = 0; i < ffImages.length; i++){
      buildFFDecksToolImage(ffImages[i])
  }
}
function buildFFDecksToolImage(src){
  let img = document.createElement('img');
  img.src = src;
  img.id = src;
  img.classList.add('FFDecks')
  styleToolImage(img);

  ffdecksBar.appendChild(img);
  storedImagesTools.push(img);
  img.addEventListener('click', selectActiveTool); //event: Select Tool on tool Clicked
}
