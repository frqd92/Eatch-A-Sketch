let drawingGrid = document.querySelector(".drawing-grid"); 
let paintBtn = document.querySelector(".paint");
let clearBtn = document.querySelector(".clearAll");
let eraserBtn = document.querySelector(".eraser");
let settingsContainer = document.getElementById("settings-container");
let settingsBtn = document.querySelector(".settings");
let settingsCloseBtn = document.getElementById("setting-close-button")
let currentGridSize;
let settingsWindow = document.getElementById("settings");
let lineSlider = document.getElementById("lineRange");
calculateGrid(100);
let gridNodes = drawingGrid.childNodes;
let clickOrHover = document.querySelector(".paintModeBtn");
let clickHover = 0, lightenB =0; randomColorB=0;
let randomColorBtn = document.getElementById("acidCheckBox")
let currentColor;







randomColorBtn.addEventListener("click",randomColorFunc)
function randomColorFunc(){


    if(eraserBtn.classList.length === 3 ){
        eraserBtn.classList.remove("activePaintBtn");
    }
    if (randomColorBtn.checked){
        console.log("checked");
        randomColorB=1;

    }
    else{
        console.log("not checked");
        randomColorB=0;
    }
}

// click N drag or hover mode
clickOrHover.addEventListener("click", clickHoverFunc);
function clickHoverFunc(){ 
    clickHover=1;//hover Mode
    if(paintBtn.classList.length===3){ //if while you change mode paint button is on (so it changes mode as your painting)
        drawingGrid.removeEventListener("mouseover",drawMode); 
        drawingGrid.removeEventListener("mousedown", clickNdrag);
        drawingGrid.removeEventListener("mousedown", drawMode);
        drawingGrid.addEventListener("mouseover",drawModeHover); 
    }
    if (eraserBtn.classList.length === 3){
        drawingGrid.removeEventListener("mouseover",eraseMode); 
        drawingGrid.removeEventListener("mousedown", eraseClick);
        drawingGrid.addEventListener("mouseover",eraseMode); 
    }
    let clickHoverText = document.querySelector(".paintModeText");
    clickOrHover.removeEventListener("click", clickHoverFunc);
    clickHoverText.textContent="Hover";
    clickOrHover.addEventListener("click", clickDragMode);
    function clickDragMode(){ //click & drag mode
        clickHover=0;
        if(paintBtn.classList.length===3){
            drawingGrid.removeEventListener("mouseover",drawMode); 
            drawingGrid.removeEventListener("mousedown", clickNdrag);
            drawingGrid.addEventListener("mousedown", clickNdrag);
            drawingGrid.removeEventListener("mouseover",drawModeHover); 
        }
        if(eraserBtn.classList.length === 3){
            drawingGrid.removeEventListener("mouseover",eraseMode); 
            drawingGrid.removeEventListener("mousedown", eraseClick);
            drawingGrid.addEventListener("mousedown", eraseClick);
        }
        clickOrHover.removeEventListener("click", clickDragMode);
        clickHoverText.innerHTML=`Click<br>&<br>Drag`;
        clickOrHover.addEventListener("click", clickHoverFunc);
        }
}
/* paint, eraser and refresh buttons*/
let colorBtn = document.querySelector(".colorPicker");
paintBtn.addEventListener("click",paintBtnn);
function paintBtnn(){  
    drawingGrid.removeEventListener("mousedown", paintMessage);
    if(eraserBtn.classList.length === 3){           //in case erase button is on when paint btn is pressed
        drawingGrid.removeEventListener("mouseover",eraseMode);
        drawingGrid.removeEventListener("mousedown", eraseClick);
        eraserBtn.classList.remove("activePaintBtn");
        eraserBtn.addEventListener("click", eraser);
    }
    paintBtn.classList.add("activePaintBtn");              //add glow effect
    paintBtn.removeEventListener("click",paintBtnn);
   
    if(clickHover===1){//hover Mode
        drawingGrid.addEventListener("mouseover",drawMode); 
    }
    if(clickHover===0){ //click N dragmode
        drawingGrid.addEventListener("mousedown", clickNdrag);
    }
    paintBtn.addEventListener("click", noDraw);          //click again, no draw 
    }




  let shadeMode = (val) => {
    let color = `rgba(`;
    val = parseInt(val.substr(4, val.indexOf(',') -4));
    if(val === 255){
       val = 100;
    }
    else if ( val > 0){
        val = val - 5;
    }
    for (let y = 0; y<3; y++){
        color = color + val + ",";
    }
    return color + `1)`;
  }

//draw function
function drawMode (e){
    drawingGrid.addEventListener("mousedown", paintMessage);
    //console.log(e.target.classList.length);
    let colorPalette = document.getElementById("colorPalette");
    if(randomColorB ===0){
        if(e.target.className === 'box') {
            let palletteVal = colorPalette.value; 
            e.target.style.background=palletteVal;
           
        }
    }

    if(randomColorB===1){
        let randomVal = Math.floor(Math.random()*16777215).toString(16);
        e.target.style.backgroundColor=`#${randomVal}`;
    }

}
    //no draw function
function noDraw(){
    paintBtn.addEventListener("click",paintBtnn);
    paintBtn.classList.remove("activePaintBtn");  
    drawingGrid.removeEventListener("mouseover", drawMode);
    drawingGrid.removeEventListener("mousedown", clickNdrag);
    drawingGrid.removeEventListener("mouseover", drawMode);
    drawingGrid.removeEventListener("mousedown", drawMode);
    drawingGrid.removeEventListener("mousedown", clickNdrag);
    drawingGrid.removeEventListener("mouseover",drawModeHover); 
}  
function clickNdrag(){
    if(paintBtn.classList.length === 3){
        drawingGrid.addEventListener("mouseover",drawMode); //click and drag mode
        drawingGrid.addEventListener("mouseup",removeClickNDrag);

    }
}

function drawModeHover(){
    drawingGrid.addEventListener("mouseover",drawMode);
}
function removeClickNDrag(){
    drawingGrid.addEventListener("mousedown", clickNdrag);
    drawingGrid.removeEventListener("mouseover",drawMode);
    drawingGrid.addEventListener("mousedown", clickNdrag);
}
    
//erasefunction
eraserBtn.addEventListener("click", eraser);
function eraser(){  

    document.getElementById("acidCheckBox").checked = false;
    randomColorB=0;

    if(paintBtn.classList.length === 3){
        drawingGrid.removeEventListener("mouseover",drawMode);
        drawingGrid.removeEventListener("mousedown", clickNdrag);
        paintBtn.classList.remove("activePaintBtn");
        paintBtn.addEventListener("click",paintBtnn);
    }
    eraserBtn.removeEventListener("click", eraser);
    eraserBtn.classList.add("activePaintBtn");    //add glow effect


    if(clickHover===1){//hover Mode

        drawingGrid.addEventListener("mouseover",eraseMode); 


    }
    if(clickHover===0){ //click mode
        drawingGrid.addEventListener("mousedown", eraseClick);

    }
    eraserBtn.addEventListener("click", noEraser);          //click again, no erase
       
    }
function eraseClick(){
    if(eraserBtn.classList.length === 3){
        drawingGrid.addEventListener("mouseover", eraseMode);
        drawingGrid.addEventListener("mouseup", removeEraseClick);
    }
}
function removeEraseClick(){
   drawingGrid.removeEventListener("mouseover", eraseMode);
}
function eraseMode (e){
    if(e.target.className === 'box') {
        e.target.style.background="none";
    }
}
//no erase
function noEraser(){
    if(paintBtn.classList.length === 2){
        drawingGrid.addEventListener("mousedown", paintMessage);
    }
    eraserBtn.classList.remove("activePaintBtn");
    drawingGrid.removeEventListener("mouseover",eraseMode);
    drawingGrid.removeEventListener("mouseover", eraseMode);
    eraserBtn.addEventListener("click", eraser); 
}    
//clear btn
clearBtn.addEventListener("click", ()=>{
    refreshGrid()
    calculateGrid(currentGridSize);
});

/* Grid Calculations and Settings Button */
settingsBtn.addEventListener("click", ()=>{

    settingsContainer.style.display="block";
    gridSlider();
    gridOpacity();
    draggableWindow()
  settingsCloseBtn.addEventListener("click", ()=>{
        settingsContainer.style.display="none";
        settingsContainer.style.top="0";
        settingsContainer.style.left="0";
        settingsWindow.style.top="50%";
        settingsWindow.style.left="50%";
     })    
     
    }) 

function calculateGrid(x){
    refreshGrid()
    let lineSlider = document.getElementById("lineRange");
    let gridCalc = 600 / x ; 
    drawingGrid.style.gridTemplateColumns =`repeat(auto-fit, ${gridCalc}px)`;
    drawingGrid.style.gridTemplateRows =` repeat(auto-fit, ${gridCalc}px) `;
    drawingGrid.style.gridAutoRows = `${gridCalc}px`

    for ( let z=0 ; z<(x*x) ; z++ ){
        let box = document.createElement("div");
        box.setAttribute("class", "box");
        drawingGrid.appendChild(box);
    }
    let boxes = document.querySelectorAll(".box");
    for(let z=0;z<(x*x);z++){

        boxes[z].style.border= ` 0.2px solid rgba(255, 255, 255, ${lineSlider.value/100}) `;
     }
    currentGridSize=x;
}

function gridSlider(){
    let gridSlider = document.getElementById("gridRange");
    let gridSliderText = document.querySelector("#gridRangeValue");
    let warningText = document.getElementById("warning-msg");
    gridSlider.addEventListener("click", ()=>{   /* mousemove inside click so range slider value text changes as slider moves */
        gridSlider.addEventListener("mousemove", testings );
        function testings(){
            settingsWindow.removeEventListener("mousemove", drag);   /* settings window was being dragged with the slider*/
            gridSliderText.textContent=gridSlider.value + " x " + gridSlider.value;
    
            calculateGrid(gridSlider.value);
                if(gridSlider.value>=100){
                    warningText.classList.add("warningText");
                    warningText.innerText = "Going above 100x100 might slow down your browser!";  
                }
                else{
                    warningText.textContent ="";
                }
                paintBtn.classList.remove("activePaintBtn");
                eraserBtn.classList.remove("activePaintBtn");
        }
            gridSlider.addEventListener("mouseup", ()=>{ /* the fix to the problem lol*/
            gridSlider.removeEventListener("mousemove", testings) 
        })
    })
}

function gridOpacity(){ 
    let lineSlider = document.getElementById("lineRange");
    let opacitySliderText = document.getElementById("lineRangeValue");
    lineSlider.addEventListener("mousedown",()=>{
    lineSlider.addEventListener("mousemove", ()=>{
        settingsWindow.removeEventListener("mousemove", drag);
        let insideGrid = drawingGrid.childNodes;
        let lineSliderVal = lineSlider.value / 100;
        let lineSliderValPercent = Math.round(lineSliderVal * 100);
            for(let z=0;z<(currentGridSize*currentGridSize);z++){
              insideGrid[z].style.border= ` 0.2px solid rgba(255, 255, 255, ${lineSliderVal}) `;
               opacitySliderText.textContent = ` ${lineSliderValPercent}% `
           }
     })
})
}

function refreshGrid(){
    /* everytime a new grid number was chosen it added on top of the old on so had to delete contents before every change*/
    while(drawingGrid.firstChild){
       drawingGrid.removeChild(drawingGrid.firstChild);
   }

}

function draggableWindow(){
    settingsWindow.addEventListener("mousedown",()=>{
        settingsWindow.addEventListener("mousemove", drag);
        } )
    
    window.addEventListener("click", (e)=>{
        if(e.target === settingsContainer){
            settingsContainer.style.display="none";
            settingsContainer.style.top="0";
            settingsContainer.style.left="0";
            settingsWindow.style.top="50%";
            settingsWindow.style.left="50%";
         
        }
    })
    
    document.addEventListener("mouseup", ()=>{
        settingsWindow.removeEventListener("mousemove", drag);
    })
}

function drag({movementX, movementY}){ /* Makes the settings box draggable*/
    let getPos = window.getComputedStyle(settingsWindow);
    let leftPos = parseInt(getPos.left);
    let topPos = parseInt(getPos.top);
    settingsWindow .style.left = ` ${leftPos + movementX}px `
    settingsWindow .style.top = ` ${topPos + movementY}px `
}

drawingGrid.addEventListener("mousedown", paintMessage); /* That warning message for paint button*/
function paintMessage(){
    let paintMessageWarning = document.querySelector(".paintMsg");
    if(paintBtn.classList.length===2 && eraserBtn.classList.length ===2){
        paintMessageWarning.style.display="block";
        setTimeout(()=>{
            paintMessageWarning.style.display="none";
        }, 1000)
    }

    else{
        drawingGrid.removeEventListener("mousedown", paintMessage);
    }
}
