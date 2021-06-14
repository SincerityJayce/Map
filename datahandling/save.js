var idKeys={};
saveBtn = document.getElementById('save-btn');
saveBtn.addEventListener('click', function(){
    saveProject();
})
const infodump = document.getElementById('save-infodump');
infodump.remove();
var importedShape = undefined;



function saveProject(){
    let save = createJSON();
    document.body.appendChild(infodump);
    infodump.value = save;
    infodump.select();
    // infodump.setSelectionRange(0, 99999);
    document.execCommand("copy");
    infodump.remove();
    alert("The Map was saved to your clipboard. Paste it somewhere safe.");
}

function createJSON(){
    jsonableArray = []
    for(var i in drawnScreenShapes){
        jsonableArray.push(makeSaveableObj(drawnScreenShapes[i]));
    }
    let savefile = JSON.stringify(jsonableArray);

    return savefile;
}
function makeSaveableObj(shape){

    let object = {  
        id:shape.id, x: shape.x, y:shape.y, 
        src:shape.src, w:shape.w, h:shape.h,

        selfScale: shape.selfScale,
        arrows:makeArrowsSaveable(shape.arrows),
        text:getTextFrom(shape), 
        videoStart:shape.videoStart,
        videoFinish:shape.videoFinish, 
        textboxBackgroundColor:shape.textboxBackgroundColor
    }

    return object;
    }

function makeArrowsSaveable(arrows){
    let newArrows = [];
    for(var i in arrows){
        newArrows.push(arrows[i].target.id);
    }    
    return newArrows;
}
function getTextFrom(shape){
    if (shape.textBox){
        console.log(shape.textBox)
        console.log(shape.textBox.textContent)
        return shape.textBox.textContent
    }
}












// load


function onPasteMapLink(e){
    e.preventDefault();
    document.getElementById('loadmap').value = "";
    savefile = JSON.parse(e.clipboardData.getData('text'));
    generateObjects(savefile);
}
var importedShapes =  [];
function generateObjects(savefile){
    importedShapes =  []
    for(var i in savefile){
        let o = savefile[i];
        importedShape = (new BasicShape(o));
        importedShape.identify();
        importedShape.onFirstDraw();
        drawShape(importedShape)
        loadTextBox(importedShape, o.text);

        drawnScreenShapes.push(importedShape);

        importedShapes.push(importedShape);
    }
    for(var i in importedShapes){
        initialiseObjectsArrows(importedShapes[i]);
    }
}






function loadTextBox(box, txt){
    if(box.textBox){
        box.textBox.textContent = txt;
    }

}

function initialiseObjectsArrows(shape){
    console.log('arrows in text form', shape.arrowcodes)
    for(var i=0; i<shape.arrowcodes.length; i++){
        console.log('initialising arrow pointing at this id', shape.arrowcodes[i])
        if(shape.arrowcodes[i]){
            iAmDrawingAnArrowNow = true;
            arrowObj = shape;
            targetsOldID = shape.arrowcodes[i];
            targetsNewID=idKeys[targetsOldID]
            FoundShape(targetsNewID).clickDiv.dispatchEvent(new Event('mouseup'));
            iAmDrawingAnArrowNow = false;
        }
    }
}








