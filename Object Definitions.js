// ! Canvas Shapes
var lastId = 0001;
var arrowObj = undefined;
var pointsICouldStartMyArrowFrom = undefined;
var arrow = new Image();
var arrowStart = undefined;
arrow.src = 'images/arrow.png';
var allCreatedObjects = [];
var shapeBeingDragged = undefined;
var mouseStarteDraggingFrom = undefined;
var projectId = createUUID();

function createUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
       var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
       return v.toString(16);
    });
 }


function createShapeId(){
    id = projectId + lastId;
    lastId += 1;
    return id;
}

function BasicShape(shape, x, y, w, h, arrows, selfScale = 1, id){
    this.id = id


    this.src = shape;
    this.selfScale = selfScale;

    this.alive = true;

    this.shape = new Image();
    this.shape.draggable = false;
    this.shape.classList.add('drawnshape');
    let thisShape = this

    this.htmlBox = document.createElement('div');
    container.appendChild(this.htmlBox);
    this.htmlBox.id = this.id;
    this.htmlBox.classList.add('drawnshape');
    this.shape.src = shape;

    this.shape.classList.add('FFDecks');

    // this.shape.id = this.id;
    this.x = x;
    this.y = y;
    this.width = this.shape.naturalWidth;
    this.height = this.shape.naturalHeight;
    this.draggedfrom = {x:undefined, y:undefined};
    this.shape.addEventListener('mousedown', 
    function(event){
        if (event.shiftKey){
            startArrow(thisShape);
        } else {
            thisShape.draggedfrom = {x:thisShape.x, y:thisShape.y};
            mouseStarteDraggingFrom = {x:mouseOnCanvas.x, y:mouseOnCanvas.y}
            shapeBeingDragged = thisShape;
        }

    })

    this.shape.addEventListener('mouseup',
        function(e){
            if(iAmDrawingAnArrowNow){
                thisShape.recieveArrow()
                resize()
            }
        })

    this.recieveArrow = function(e){
        let a = new Arrow(arrowObj, thisShape);
        }

    this.corners = function(){
        let [x, y] = convertFileXYintoCanvasXY(this.x, this.y);
        let [w, h] = convertFileWHintoCanvasWH(this.width, this.height);
    
        points= [{x: x,      y: y},{x: x+w/2,  y:y},{x: x+w,    y:y},//top
            {x: x+w,    y:y+h/2},   //right
            {x: x+w,    y:y+h},{x: x+w/2,  y:y+h},{x: x,      y:y+h},//bottom
            {x: x,      y:y+h/2} ];
    return points;
    }
    this.contextEvent = contextualClick;

    
    //Draws image onto canvas
    this.draw = function(){
        this.width = this.shape.naturalWidth;
        this.height = this.shape.naturalHeight;
        let [x, y] = convertFileXYintoCanvasXY(this.x, this.y);
        // //uncomment this to draw onto canvas
        let [w, h] = convertFileWHintoCanvasWH(this.width, this.height);
        // c.drawImage(shape, x, y, w, h);


        this.shape.remove();
        this.htmlBox.style = (
            'margin-left:'+((x-w/2)/scale)+
            ';margin-top:'+((y-h/2)/scale)+
            ';position: absolute'+
            ';max-width:'+((canvasAreaW-x+w/2)/scale)+
            ';max-height:'+((canvasAreaH-y+h/2)/scale)+
            ';overflow:hidden;');
        let aspect = this.shape.naturalWidth/this.shape.naturalHeight;
        this.shape.height = this.shape.naturalHeight/ totalScale; // JUST BY CHANGING THIS TO SCALE RATHER THAN TOTAL SCALE, YOU GET COOL EFFECT

        this.shape.width = this.shape.height*aspect;

        if(ask_isTheShapeInitialisingOnscreen(this, x-w/2, y-h/2)){
            this.htmlBox.appendChild(this.shape);
            
        }
    }

    this.arrowcodes = arrows
    this.arrows = [];
    this.drawarrows = function(){
        for(var i = 0; i < thisShape.arrows.length; i++){
            console.log('drawing this arrow', thisShape.arrows[i])
            thisShape.arrows[i].draw();
        }
    
    }

    this.drawTemp = function(){
        let [x, y] = convertFileXYintoCanvasXY(this.x, this.y);
        let [w, h] = convertFileWHintoCanvasWH(this.width, this.height);
        cDisplay.drawImage(this.shape, x-w/2, y-h/2, w, h);
    }   

    this.delete = function (){
        thisShape.shape.remove();
        thisShape.alive = false;
        thisShape.htmlBox.remove()
        delete thisShape.shape;
        delete thisShape.htmlBox;
        delete thisShape;
    }

    this.identify=function (){
        let newID = createShapeId()
        idKeys[thisShape.id] = newID
        thisShape.id = newID;
        thisShape.htmlBox.id = thisShape.id;
        thisShape.shape.id = thisShape.id;
    }

    allCreatedObjects.push(this);







}




function ask_isTheShapeInitialisingOnscreen(object, x, y){
    let xn = (x/scale + object.shape.width);
    let yn = (y/scale + object.shape.height);
    x = x/scale;
    y = y/scale;
    if (xn > 0 && x < window.innerWidth &&
        yn > 0 && y < window.innerHeight){
        return true;
    } else {return false;}
}


function contextualClick(obj){
    if(iAmDrawingAnArrowNow){
        let a = Arrow(arrowObj, obj);
        a.draw()
    }
}

function findShapeFromId(id){
    let o = undefined;
    for (var i=0; i<drawnScreenShapes.length;i+=1){
        if (id == drawnScreenShapes[i].id){
            o = drawnScreenShapes[i];
            console.log(o, 'shape from id');
        }
    }
return o
}

function FoundShape(id){
    let o = undefined;
    for (var i=0; i<drawnScreenShapes.length;i+=1){
        if (id == drawnScreenShapes[i].id){
            o = drawnScreenShapes[i];
            console.log(o, 'shape from id');
        }
    }
    return o;
}

const bin = document.getElementById('bin');
bin.addEventListener('mouseup',
    function(){
        if (shapeBeingDragged){
            deleteDrawnShape(shapeBeingDragged);

        }
        if (activeTool){
            unselectAllTools()
        }
    })

function deleteDrawnShape(shape){
    drawnScreenShapes = drawnScreenShapes.filter(
        function(ele){return ele != shape;})
    shape.delete();
    drawCanvas();
}
