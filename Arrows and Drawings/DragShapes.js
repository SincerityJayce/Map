

window.addEventListener('mousemove',
    function(e){
        if (shapeBeingDragged && notFullScreen){
            objectUnmoved = false;
            let [x,y] = [(mouseStarteDraggingFrom.x - mouseOnCanvas.x)*totalScale, (mouseStarteDraggingFrom.y - mouseOnCanvas.y)*totalScale]
            shapeBeingDragged.x = shapeBeingDragged.draggedfrom.x - x;
            shapeBeingDragged.y = shapeBeingDragged.draggedfrom.y - y;
            requestAnimationFrame(redrawShapeBeingDragged);
        }
    })

function redrawShapeBeingDragged(){
    drawCanvas()
}


window.addEventListener('mouseup',
    function(e){
        shapeBeingDragged = undefined;   
    }
)

function startDraggingShape(thisShape){
    if(checkIfNotFullScreen()){
        thisShape.draggedfrom = {x:thisShape.x, y:thisShape.y};
        mouseStarteDraggingFrom = {x:mouseOnCanvas.x, y:mouseOnCanvas.y}
        shapeBeingDragged = thisShape;
    }
}



// resize shapes


function resizeAShape(){
    if(shapeBeingResized && checkIfNotFullScreen()){
        shapeBeingResized.w = shapeBeingResized.shapeDiv?.offsetWidth/shapeBeingResized.selfScale*totalScale;
        shapeBeingResized.h = shapeBeingResized.shapeDiv?.offsetHeight/shapeBeingResized.selfScale*totalScale;
        drawShape(shapeBeingResized);
        console.log(shapeBeingResized)
    }}




window.addEventListener('mousemove',function(e){
    if(shapeBeingResized && checkIfNotFullScreen()){
        objectUnmoved = false;
        requestAnimationFrame(resizeAShape)
    }
})



function makeShapeResiazble(thisShape){
    thisShape.shapeDiv.classList.add('resizable');

    thisShape.shapeDiv.addEventListener('mousedown',function(e){
        shapeBeingResized = thisShape;
        console.log(shapeBeingResized)
    })
}
function makeShapeNotResiazble(thisShape){
    thisShape.shapeDiv.classList.remove('resizable');

    thisShape.shapeDiv.removeEventListener('mousedown',function(e){
        shapeBeingResized = thisShape;
        console.log(shapeBeingResized)
    })
}