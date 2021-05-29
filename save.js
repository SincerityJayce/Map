saveBtn = document.getElementById('save-btn');
saveBtn.addEventListener('click', function(){



    saveProject();
})
const infodump = document.getElementById('save-infodump');
infodump.remove();
var importedShape = undefined



function saveProject(){
    let save = createJSON();
    console.log(save);
    document.body.appendChild(infodump);
    infodump.value = save;
    console.log(infodump.value)
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

function onPasteMapLink(e){
    savefile = JSON.parse(e.clipboardData.getData('text'));
    generateObjects(savefile);
}
function generateObjects(savefile){
    for(var i in savefile){
        let o = savefile[i];
        console.log(o.arrows)
        importedShape = (new BasicShape(o.src, o.x, o.y, o.w, o.h, o.arrows, o.selfScale));
        importedShape.draw();
        drawnScreenShapes.push(importedShape);
        console.log(drawnScreenShapes);
    }
    for(var i in drawnScreenShapes){
        console.log(drawnScreenShapes[i])
        initialiseObjectsArrows(drawnScreenShapes[i]);
    }
}

function initialiseObjectsArrows(shape){
    console.log(shape.arrows)
    for(var i in shape.arrows){
        console.log(shape.arrows[i])
        shape.arrows[i] = new Arrow(shape, findShapeFromId(shape.arrows[i]));
        shape.arrows[i].draw();
    }
}







