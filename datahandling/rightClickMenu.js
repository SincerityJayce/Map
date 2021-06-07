const shapemMenuDiv = document.getElementById('shapemMenuDiv');


function hideRightClickMenu(){
    shapemMenuDiv.remove();
    contextShape = undefined;
}


function showRightClickMenu(){
    container.appendChild(shapemMenuDiv);
}

function formatRightClickMenu(){
    shapemMenuDiv.style = "left:"+ contextShape.divStyleMath.left 
        + "px;top:" + contextShape.divStyleMath.top
        +"px; width:" +contextShape.shape.width
        +"; height"+contextShape.shape.height;
}
var contextShape;
// window.addEventListener('contextmenu', openShapeMenu); on shape object;
// shapemMenuDiv.addEventListener('mouseleave', hideRightClickMenu);

function openShapeMenu(e){
    console.log(e);
    e.preventDefault();
    formatRightClickMenu()
    showRightClickMenu();
}

hideRightClickMenu();

