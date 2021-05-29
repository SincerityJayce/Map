// Opening ///////////

const canvas = document.getElementById('canvas');
const container = document.getElementById('container');
const display = document.getElementById('float over');
const storedImages = document.getElementById('storedImages');
var c = canvas.getContext('2d');
var cDisplay = display.getContext('2d');
var canvasAreaW = undefined;
var canvasAreaH = undefined;
var scale = 4; //resolution


// Set these variables:
const topPalletHeight = 30; //custom pallet
const leftPalletWidth = 0; //toolbox
var viewScale = 1; //zoom

var totalScale = scale * viewScale;

// Sidebar Images:
// var toolImgs = ['images/12-078L_eg.jpg', 'images/back.png', 'images/84630286-12f2-4a40-82fc-d3d8cc316fb4.jpg', 'images/square_PNG22.png'];//All Tool Images
var toolImgs = ['images/Gbez/005.jpg', 'images/Gbez/035.jpg', 'images/Gbez/035_7908949a-a158-48c2-b861-2b3bef5bbae7.jpg', 'images/Gbez/047_dcfc424b-b4a6-43ed-8a6d-853766a89489.jpg']
var storedImagesTools = [];
var activeTool = undefined;

// Libraries ///////////////
// ! Objects on screen
// ...

// ! Objects on screen
var drawnScreenShapes = [];

















                    

// Tool select
function selectActiveTool(event){
    if (activeTool != event.srcElement){
        activeTool = event.srcElement;
        activeTool.classList.add('selectedTool');
        addDisplayToDOM();
        turnTheCanvasCursorInvisible();
        unstyleAllUnactiveTools();
        createTheoreticalShape();
    } else {
        unselectAllTools();
    }

}





function addDisplayToDOM(){
    container.appendChild(display);
    display.classList.remove('pointerEventsNone')
}
function turnTheCanvasCursorInvisible(){
    display.classList.add('cursorNone');
    canvas.classList.add('cursorNone');
}
function unstyleAllUnactiveTools(){
    for (var i = 0; i < storedImagesTools.length; i++){
        if (storedImagesTools[i] != activeTool){
            storedImagesTools[i].classList.remove('selectedTool');
        }
    }
}

// ! Unselects any currently selected tool
function unselectAllTools(){
    activeTool = undefined;

    unstyleAllTools();
    clearMouseDisplay();
    turnTheCanvasCursorVisible();
    removeDisplayFromDOM();
}

function unstyleAllTools(){
    for (var i = 0; i < storedImagesTools.length; i++){
        storedImagesTools[i].classList.remove('selectedTool');
    }
}
function clearMouseDisplay(){
    cDisplay.clearRect(0, 0, canvasAreaW, canvasAreaH);
}
function turnTheCanvasCursorVisible(){
    display.classList.remove('cursorNone');
    canvas.classList.remove('cursorNone'); //restores cursor
}
function removeDisplayFromDOM(){
    display.remove();
}