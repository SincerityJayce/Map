window.addEventListener('wheel', scaleObjectWithWheel);

const arbitraryZoomRatio = 0.9;
const zoomDrift = 2/(1-arbitraryZoomRatio);

function scaleObjectWithWheel(e){
    let s;
    if(shapeBeingDragged){
        s=shapeBeingDragged
    }
    if(theoreticalShape){
        s=theoreticalShape
    }
    if(e.deltaY > 0){
        s.scaleUp();
    }
    if(e.deltaY < 0){
        s.scaleDown();
    }
    if(shapeBeingDragged){
        drawShape(s)
    }
    if(theoreticalShape){
        requestAnimationFrame(updateMouseDisplay)
    }
}





canvas.addEventListener('wheel', zoomCanvas);

var mousePercent
var mouseXRatio = 1;
var mouseYRatio = 1;


function zoomCanvas(e){
    if (mouseDownOnCanvas && activeTool == undefined){
        mouseXratio = e.clientX*2/window.innerWidth;
        mouseYratio = e.clientY*2/window.innerHeight;
        if(e.deltaY > 0){
            zoomOut();
        }
        if(e.deltaY < 0){
            zoomIn();
        }
    }
}

function zoomIn(){
    viewScale *= arbitraryZoomRatio;
    totalScale = scale * viewScale;
    canvasDrift.x += (canvasAreaW/zoomDrift*viewScale);
    canvasDrift.y += (canvasAreaH/zoomDrift*viewScale);
    draggedFrom.canvasX = mouseOnCanvas.canvasX;
    draggedFrom.canvasY = mouseOnCanvas.canvasY;
    draggedFrom.driftX = canvasDrift.x;
    draggedFrom.driftY = canvasDrift.y;

    

    resize();
}




function zoomOut(){
    canvasDrift.x -= canvasAreaW/zoomDrift*viewScale;
    canvasDrift.y -= canvasAreaH/zoomDrift*viewScale;
    viewScale /= arbitraryZoomRatio;
    totalScale = scale * viewScale;
    draggedFrom.canvasX = mouseOnCanvas.canvasX;
    draggedFrom.canvasY = mouseOnCanvas.canvasY;
    draggedFrom.driftX = canvasDrift.x;
    draggedFrom.driftY = canvasDrift.y;

    resize();
}

//click and drag events
var mouseDownOnCanvas = false;

var draggedFrom = {canvasX: undefined, canvasY: undefined, driftX: undefined, driftY:undefined};

canvas.addEventListener('mousedown',
    function(event){
        setMouseXY(event)
        setDraggedFromPoint(event);
        mouseDownOnCanvas = true;
    })
function setDraggedFromPoint(event){
    draggedFrom.canvasX = mouseOnCanvas.canvasX;
    draggedFrom.canvasY = mouseOnCanvas.canvasY;
    draggedFrom.driftX = canvasDrift.x;
    draggedFrom.driftY = canvasDrift.y;
}

canvas.addEventListener('mouseleave', 
    function(event){
        mouseDownOnCanvas = false;
    })

canvas.addEventListener('mouseup',
    function(event){
        mouseDownOnCanvas = false;
    })

function ask_isCanvasDrifting(event){
    if (activeTool == undefined && mouseDownOnCanvas){
        requestAnimationFrame(updateCanvasDrift);
    }
}

function updateCanvasDrift() {
    canvasDrift.x = draggedFrom.driftX + (draggedFrom.canvasX - mouseOnCanvas.canvasX)*viewScale;
    canvasDrift.y = draggedFrom.driftY + (draggedFrom.canvasY - mouseOnCanvas.canvasY)*viewScale;
    resize();
}