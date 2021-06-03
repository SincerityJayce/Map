

var arrowObj;
var arrow = new Image();
arrow.src = 'images/arrow.png';
var arrowStart;
var allCreatedObjects = [];
var shapeBeingDragged;
var mouseStarteDraggingFrom;

function createUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);});}
var projectId = createUUID();

var lastId = 0001;
function createShapeId(){
    id = projectId + lastId;lastId += 1;
    return id;}
/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////
// ! Canvas Shapes


function BasicShape(shape, x, y, w, h, arrows, selfScale = 1, id){
    let thisShape = this;
    this.src = shape
    this.id = id;
    this.src = shape;
    this.selfScale = selfScale;
    this.x = x;
    this.y = y;

    this.alive = true;




    this.shapeDiv = initialiseShapeDiv();
    this.shape =makeShape();
    this.shape.src = this.src;


    this.w = this.shape.naturalWidth;
    this.h = this.shape.naturalHeight;
    this.width = this.w*selfScale;
    this.height = this.h*selfScale;





    // dragging and arrows
    this.draggedfrom = {x:undefined, y:undefined};

    
    this.shapeDiv.addEventListener('mousedown', 
    function(event){
        if (event.shiftKey){
            startArrow(thisShape);
        } else {
            thisShape.draggedfrom = {x:thisShape.x, y:thisShape.y};
            mouseStarteDraggingFrom = {x:mouseOnCanvas.x, y:mouseOnCanvas.y}
            shapeBeingDragged = thisShape;
        }
    })
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


    this.scaleUp = function(){
        this.selfScale*= 0.75;
        this.width = this.w*this.selfScale;
        this.height = this.h*this.selfScale;
    }
    this.scaleDown = function(){
        this.selfScale/= 0.75;
        this.width = this.w*this.selfScale;
        this.height = this.h*this.selfScale;
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


    this.aspect;
    //Draws image onto canvas
    this.draw = function(){
        let [x, y] = convertFileXYintoCanvasXY(this.x, this.y);
        let [w, h] = convertFileWHintoCanvasWH(this.width, this.height);
        // //uncomment this to draw onto canvas
        // c.drawImage(shape, x, y, w, h);


        this.shapeDiv.style = ( 
            'left:'+((x-w/2)/scale)+
            ';top:'+((y-h/2)/scale)+
            ';position: absolute'+
            ';max-width:'+((canvasAreaW-x+w/2)/scale)+
            ';max-height:'+((canvasAreaH-y+h/2)/scale)+
            ';overflow:hidden;');
        this.aspect = this.shape.naturalWidth/this.shape.naturalHeight;
        this.shape.height = this.height/ totalScale; // JUST BY CHANGING THIS TO SCALE RATHER THAN TOTAL SCALE, YOU GET COOL EFFECT
        this.shape.width = this.shape.height*this.aspect;

        this.shape.remove();
        if(ask_isTheShapeInitialisingOnscreen(this, x-w/2, y-h/2)){
            if(thisShape.vidPlayer){
                let v = this.vidPlayer.getIframe()
                v.height=this.shape.height;
                v.width=this.shape.width;
            }else{this.shapeDiv.appendChild(this.shape);}
            }
            


        
    }


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




    // connections (arrows)
    this.arrowcodes = arrows
    this.arrows = [];

    this.shape.addEventListener('mouseup',
    function(e){if(iAmDrawingAnArrowNow){
                thisShape.recieveArrow();
                resize(); }})

    this.recieveArrow = function(e){
        let a = new Arrow(arrowObj, thisShape);}

        
    this.connections = {};
    this.addConnection = function addConnection(connection){
        this.connections[connection] = {notes:undefined}
    }
    this.removeConnection = function removeConnection(connection){
        delete this.connections[connection]
    }






    // manage
    this.delete = function (){
        thisShape.shape.remove();
        thisShape.alive = false;
        thisShape.shapeDiv.remove()
        delete thisShape.shape;
        delete thisShape.shapeDiv;
        delete thisShape;
    }

    this.identify=function (){
        let newID = createShapeId()
        idKeys[thisShape.id] = newID
        thisShape.id = newID;
        thisShape.shapeDiv.id = thisShape.id;
        thisShape.shape.id = thisShape.id;
    }




    this.videoStart = 30;
    this.videoEnd = 40;
    this.YTid = determineYouTubeID(shape)?.[0].replace("img.youtube.com/vi/", "");
    this.vidPlayer;




    this.shape.addEventListener('click',
        function(){
            console.log('clickevent', thisShape.shape.YTid)
            if(thisShape.YTid){
                thisShape.createVideo();
            }
        })
    this.createVideo = function(){
        thisShape.vidDiv = document.createElement('div');
        thisShape.vidDiv.height= this.shape.height;
        thisShape.vidDiv.width = this.shape.width;
        thisShape.vidDiv.id = thisShape.id+"YTAPI";
        thisShape.shapeDiv.appendChild(thisShape.vidDiv);
        thisShape.shape.remove();
        console.log(thisShape.YTid[0][-11])
        let newPlayer = new YT.Player(thisShape.vidDiv.id,{
            height: thisShape.shape.height,
            width: thisShape.shape.width,
            videoId: thisShape.YTid,
            playerVars:{
                autoplay:1,
                controls:0,
                modestbranding:1,
                rel:0,
                start: thisShape.videoStart,
                end: thisShape.videoEnd
            },
            events: {
            //   'onReady': thisShape.addListeners
            }});
        thisShape.vidPlayer = newPlayer;
        thisShape.vidPlayer.getIframe().classList.add('pointerEventsNone');
    }

































    // this.notes = document.createElement('div')
    // this.notes.innerHTML = "Testing";
    // this.notes.setAttribute("contenteditable", "true");
    // this.shapeDiv.appendChild(this.notes);   
    allCreatedObjects.push(this);
}


function makeShape(){
    return styleShape(new Image())
}
function styleShape(shape){
    shape.draggable = false;
    shape.classList.add('drawnshape');
    shape.classList.add('FFDecks');
    return shape
}

function initialiseShapeDiv(){
    let sd = document.createElement('div')
    sd.classList.add('drawnshape');
    container.appendChild(sd);
    return sd
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

function determineYouTubeID(link) {
    let f = (link.match(/img.youtube.com\/vi\/[\w\-]{11}/))
    console.log(f);
    return f
  }