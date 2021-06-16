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

function makeTextboxFor(thisShape){
    function makeTextbox(){
        let tb = document.createElement('div');
        tb.type='text'
        tb.innerHTML = "DoubleClick to add text."
        tb.classList.add('textbox');
        tb.style.fontSize = thisShape.fontSize*thisShape.selfScale/viewScale
        tb.style.background = thisShape.textboxBackgroundColor
        return tb
    }

    thisShape.textBox = makeTextbox();
    thisShape.textBox.addEventListener("dblclick", thisShape.editTextBox);
}

function  startEditingTextBox(s){
    textBoxBeingEdited = s;
    textBoxBeingEdited.setAttribute('contenteditable', true);
    selectElementContents(textBoxBeingEdited);
}



function selectElementContents(el) {
    let range = document.createRange();
    range.selectNodeContents(el);
    let sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
}

