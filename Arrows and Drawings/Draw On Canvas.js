
var iAmDrawingAnArrowNow = false;

// Mouse Move!
window.addEventListener('mousemove', 
    function(event){
        setMouseXY(event);
        ask_IsMouseOverCanvas(event)
        if (activeTool != undefined){ //if there is an active mouse tool
            requestAnimationFrame(updateMouseDisplay);
        }
        ask_isCanvasDrifting();
        if (iAmDrawingAnArrowNow){
            requestAnimationFrame(arrowMath)
        }
    })


var theoreticalShape = undefined; //paintbrush

var drawMouse = true;

var mouseOnCanvas = {x:undefined, y:undefined,
    canvasX:undefined, canvasY:undefined,
    fileX:undefined, fileY:undefined}


// Click!
display.addEventListener('mouseup',
    function(event){
        setMouseXY(event);
        if (activeTool != undefined){
            drawTheoreticalShapeOnClick(event);
            unselectAllTools();
        }
    })

function setMouseXY(event){
    mouseOnCanvas.x = event.x - canvas.getBoundingClientRect().left;
    mouseOnCanvas.y = event.y - canvas.getBoundingClientRect().top;
    [mouseOnCanvas.canvasX, mouseOnCanvas.canvasY] = [mouseOnCanvas.x *scale, mouseOnCanvas.y * scale];
    [mouseOnCanvas.fileX, mouseOnCanvas.fileY] = convertCanvasXYintoFileXY(mouseOnCanvas.canvasX, mouseOnCanvas.canvasY);
}
// ! Draws the selected tool at the current mouse position




function createTheoreticalShape(){
    console.log('theorising')
    let [x, y] = convertCanvasXYintoFileXY(mouseOnCanvas.canvasX, mouseOnCanvas.canvasY);
    theoreticalShape = new BasicShape(activeTool.src, x, y,activeTool.naturalWidth ,activeTool.naturalHeight,[]);
    theoreticalShape.identify();
    console.log(theoreticalShape);
}

function ask_IsMouseOverCanvas(event){
        drawMouse = true; //will draw on canvas
        if (event.path[0].id != 'float over'){ //wont drawmouse if mouse if off canvas
            drawMouse = false;
        }
    }
function updateMouseDisplay(){
    clearMouseDisplay()
    if (drawMouse){
        drawTheoreticalShapeOnMouseMove()
    }
}




function drawTheoreticalShapeOnMouseMove(event){
    [theoreticalShape.x, theoreticalShape.y] = convertCanvasXYintoFileXY(mouseOnCanvas.canvasX, mouseOnCanvas.canvasY);
    theoreticalShape.drawTemp();
}
// Paint and unselect the tool
function drawTheoreticalShapeOnClick(event){
    [theoreticalShape.x, theoreticalShape.y] = convertCanvasXYintoFileXY(mouseOnCanvas.canvasX, mouseOnCanvas.canvasY);
    theoreticalShape.draw();
    drawnScreenShapes.push(theoreticalShape);
    unselectAllTools();
}
