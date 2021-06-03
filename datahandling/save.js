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

    let object = {  id:shape.id, x: shape.x, y:shape.y, 
                    src:shape.src, w:shape.w, h:shape.h, 
                    selfScale: shape.selfScale,
                    arrows:makeArrowsSaveable(shape.arrows)};

    return object;
    }

function makeArrowsSaveable(arrows){
    let newArrows = [];
    for(var i in arrows){
        newArrows.push(arrows[i].target.id);
    }    
    return newArrows;
}











// load
var idKeys={}

function onPasteMapLink(e){
    savefile = JSON.parse(e.clipboardData.getData('text'));
    generateObjects(savefile);
}
function generateObjects(savefile){
    for(var i in savefile){
        let o = savefile[i];
        importedShape = (new BasicShape(o.src, o.x, o.y, o.w, o.h, o.arrows, o.selfScale, o.id));
        importedShape.identify();
        importedShape.draw();

        drawnScreenShapes.push(importedShape);
    }
    for(var i in drawnScreenShapes){
        console.log(drawnScreenShapes[i], 'making arrows')
        initialiseObjectsArrows(drawnScreenShapes[i]);
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
            FoundShape(targetsNewID).shape.dispatchEvent(new Event('mouseup'));
            iAmDrawingAnArrowNow = false;
        }
    }
}








