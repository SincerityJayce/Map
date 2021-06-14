const shapemMenuDiv = document.getElementById('shapemMenuDiv');
const menuList = document.getElementById('menuList');
var contextShape;

function menuLogic(){
    let m = this;

    function makeMenu_ClipStart(){
        let cs = document.createElement('li');

            let input = document.createElement('input');
            cs.appendChild(input);

            let title = document.createElement('a');
            cs.appendChild(title);

        cs.classList.add('menu-clipstart');-
        cs.classList.add('fancyInputOuter');

        input.setAttribute('required', true);
        input.maxLength='6';

        title.innerHTML="Start...";


        function apply(){
            let seconds = convertMinSecStringToSeconds(input.value);
            if(seconds){
                contextShape.videoStart = seconds;
            } else {
                // contextShape.videoStart = contextShape.vidPlayer.getDuration()
            }
            input.placeholder = convertSecondsToMinSecString(contextShape.videoStart);
            input.value ="";}
        input.addEventListener('keydown',function(e){
            if(e.key == "Enter"){apply();}})
        input.addEventListener('blur', apply);


        input.addEventListener('focus',function(e){
            input.placeholder = convertSecondsToMinSecString(contextShape.videoStart);
            input.value ="";})

        return cs
    }

    function makeMenu_ClipFinish(){
        let cs = document.createElement('li');

            let input = document.createElement('input');
            cs.appendChild(input);

            let title = document.createElement('a');
            cs.appendChild(title);

        cs.classList.add('menu-clipFinish');-
        cs.classList.add('fancyInputOuter');

        input.setAttribute('required', true);
        input.maxLength='6';    

        title.innerHTML="Finish...";


        function apply(){
            let seconds = convertMinSecStringToSeconds(input.value);
            if(seconds){
                contextShape.videoFinish = seconds;
            } else {
                // contextShape.videoFinish = contextShape.vidPlayer.getDuration()
            }
            input.placeholder = convertSecondsToMinSecString(contextShape.videoFinish);
            input.value ="";}
        input.addEventListener('keydown',function(e){
            if(e.key == "Enter"){apply();}})
        input.addEventListener('blur', apply);

        input.addEventListener('focus',function(e){
            input.placeholder = convertSecondsToMinSecString(contextShape.videoFinish);
            input.value ="";})

        return cs
    }


    function makeMenu_TextThumbnail(){
        let cs = document.createElement('li');
        
            let title = document.createElement('a');
            cs.appendChild(title);

        cs.classList.add('menu-clipFinish');-
        cs.classList.add('menu-simplebutton');



        let toggleOn;
        cs.loadEvent = function(){
            if(thisShapeHasAVisibleTextbox(contextShape)){
                toggleOn = false;
                title.innerHTML = "Text-ThumbnailOff"
            }else{
                toggleOn = true;
                title.innerHTML = "Text-ThumbnailOn";
            }
        }



        function toggleTextBoxOnVidShape(){
            function addTextBoxToVidShape(){
                contextShape.InitialiseTextBox();
                contextShape.textBox.innerHTML = "Thumbnail";
                startEditingTextBox(contextShape.textBox);}

            if(toggleOn){
                addTextBoxToVidShape();
            }else{
                editNoTextBox();
                contextShape.HideTextBox();}
            hideRightClickMenu();
            
        }

        cs.addEventListener('click', toggleTextBoxOnVidShape)
            
        return cs
    }


    function makeMenu_SetTextboxColor(){
        let cs = document.createElement('li');

            let input = document.createElement('input');
            cs.appendChild(input);

            let title = document.createElement('a');
            cs.appendChild(title);

        cs.classList.add('menu-textBoxBGColor');-
        cs.classList.add('fancyInputOuter');

        input.setAttribute('required', true);
        input.maxLength='9';

        title.innerHTML="BGColor...";


        function setBackgrounColorContextualShape(hex){
            contextShape.textBox.style.backgroundColor = hex;
            contextShape.textboxBackgroundColor = contextShape.textBox.style.backgroundColor;
            
        }
        input.addEventListener('keydown',function(e){
            console.log(e);
            if(e.key == "Enter"){
                console.log(input.value)
                setBackgrounColorContextualShape(input.value);
                input.placeholder = contextShape.textboxBackgroundColor;}})


        input.addEventListener('focus',function(e){
            input.placeholder = contextShape.textboxBackgroundColor;
            input.value ="";})

        return cs
    }
    function makeMenu_ColorPicker(){
        let cs = document.createElement('li');

            let title = document.createElement('a');
            cs.appendChild(title);

        cs.classList.add('menu-ColorPicker');-
        cs.classList.add('menu-simplebutton');

        title.innerHTML="ColorPicker";

        title.addEventListener('click', function(){
            window.open('https://colorpicker.me', '_blank');
        })

        return cs
    }


    // table of contents
    this.ClipStart = makeMenu_ClipStart();
    this.ClipFinish = makeMenu_ClipFinish();
    this.TextThumbnail = makeMenu_TextThumbnail()

    this.SetBackgroundColor = makeMenu_SetTextboxColor();
    this.ColorPickerLink = makeMenu_ColorPicker();


    this.optionTypes = ["generic", "video", "textbox"];
    this.optionType = { "":[],
    "generic":[],

    "video":[m.ClipStart, m.ClipFinish, m.TextThumbnail],

    "textbox":[m.SetBackgroundColor, m.SetBorderStyle, m.SetFont, m.ColorPickerLink]}

    console.log(this)
    return this
}









const potentialMenuObjects = new menuLogic();
console.log(potentialMenuObjects)

function formatRightClickMenu(){
    shapemMenuDiv.style = "left:"+ contextShape.divStyleMath.left 
        + "px;top:" + contextShape.divStyleMath.top
        
        +"px; width:" +contextShape.shape.width+";";
        // +"; height"+contextShape.shapeDiv.height; +";"
}
function openShapeMenu(e){

    function updateMenuDisplay(){

        function emptyMenu(){
            while(menuList.lastChild){menuList.removeChild(menuList.lastChild);}
        }
    
    
        
        function populateMenu(){
    
            function appendOptionToContextMenu(option){
                if(option){menuList.appendChild(option);
                if(option.loadEvent){
                    option.loadEvent();
                }}}
    
            function appendValidOptionSets(t){
                if(contextShape.shapeFunctions[t]){
                    potentialMenuObjects.optionType[t].forEach(appendOptionToContextMenu);}}
    
            potentialMenuObjects.optionTypes.forEach(appendValidOptionSets);
        }
    
    
        emptyMenu();
        populateMenu();
    }


    function showRightClickMenu(){
        container.appendChild(shapemMenuDiv);
    }


    e.preventDefault();
    formatRightClickMenu();
    updateMenuDisplay();
    showRightClickMenu();
}












function hideRightClickMenu(){
    shapemMenuDiv.remove();
    contextShape?.shapeDiv?.classList.remove('contextShape');
    contextShape = undefined;
} hideRightClickMenu();

window.addEventListener('mouseup', function(e){
    if (e.path.some(i => i === shapemMenuDiv)==false) {
        hideRightClickMenu()
      }
});

