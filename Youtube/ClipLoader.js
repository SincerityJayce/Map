const ytClipList = document.getElementById('YTClips');
const ytPaste = document.getElementById('YoutubeClipLoad');

ytPaste.addEventListener('paste', function(e){
    e.preventDefault();
    ytPaste.value = "";
    buildYTToolImage(e.clipboardData.getData('text'));
})


function buildYTToolImage(link){
    let img = document.createElement('img');
    img.YTid=unpackYTLink(link)[0];
    img.src=ytThumbnailFromId(img.YTid);
    img.id=img.src;
    img.draggable=false
    img.extraFunction='video';
    

    console.log(img.extraFunction, img.YTid, unpackYTLink(link))
    styleToolImage(img);

    ytClipList.appendChild(img);
    storedImagesTools.push(img);
    img.addEventListener('mousedown', selectActiveTool); //event: Select Tool on tool Clicked
}
function ytThumbnailFromId(id){
    return ('https://img.youtube.com/vi/'+ id +'/hqdefault.jpg')
}
function unpackYTLink(link) {
    return link.match(/[\w\-_]{11}/);
  }



function exampleVideoTool(){
    buildYTToolImage('https://www.youtube.com/watch?v=D-ya6U-pbWo');
}



