function doOneThing(){
    hideRightClickMenu();
    clearSelection()
    editNoTextBox();
    dragNoShape();
}

function clearSelection()
{
 if (window.getSelection) {window.getSelection().removeAllRanges();}
 else if (document.selection) {document.selection.empty();}
}

function dragNoShape(){
    shapeBeingDragged = undefined;
}
function editNoTextBox(){
    textBoxBeingEdited?.setAttribute('contenteditable', false);
    textBoxBeingEdited = undefined;
}

window.addEventListener('mousedown', 
    function (e){
        if (e.path.some(i => i === textBoxBeingEdited)==false) {
            editNoTextBox();
          }
    })

window.addEventListener('click', function(){
    console.log(lastShape.w, lastShape.h);
})


function removeObjectFromList(obj, list){
    for(var i =0;i<list.length; i++){
        if(list[i] == obj){
            list.splice(i, 1);}}}





function checkIfClickWasIntededToAlterObjectOrOperateIt(){
    let checker = this;
    this.clickstarted;
    this.objectUnmoved;
    this.startAssessing = function(){
        objectUnmoved = true;
        clickstarted = new Date();
    }

    this.isToOperate = function thisClickWasFast(){
        let now = new Date();
        if(now-clickstarted < 300 && objectUnmoved){
            return true
        }
    }
    window.addEventListener('mousedown', checker.startAssessing);
} 
const purposeOfClick = new checkIfClickWasIntededToAlterObjectOrOperateIt();