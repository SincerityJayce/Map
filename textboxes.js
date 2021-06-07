const textBoxShelf = document.getElementById('Text Box Shelf');

function buildTextBoxToolImage(path){
    let img = document.createElement('img');
    img.src=path;
    img.id=img.src;
    img.draggable=false;
    img.extraFunction='textbox';
    

    styleToolImage(img);

    textBoxShelf.appendChild(img);
    storedImagesTools.push(img);
    img.addEventListener('mousedown', selectActiveTool); //event: Select Tool on tool Clicked
}


const textBoxPath = 'images/box.png'
function textBoxToolsLoad(){
    buildTextBoxToolImage(textBoxPath);
}
