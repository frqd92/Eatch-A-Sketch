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
calculateGrid(50);
let gridNodes = drawingGrid.childNodes;
let clickOrHover = document.querySelector(".paintModeBtn");
let clickHover = 0;


// click N drag or hover mode

clickOrHover.addEventListener("click", clickHoverFunc);

function clickHoverFunc(){ 
    clickHover=1;//hover Mode

    if(paintBtn.classList.length===3){ //if while you change mode paint button is on (so it changes mode as your painting)
        drawingGrid.removeEventListener("mouseover",drawMode); 
        drawingGrid.removeEventListener("mousedown", clickNdrag);
        drawingGrid.removeEventListener("mousedown", drawMode);
        drawingGrid.addEventListener("mouseover",drawModeHover); 
        console.log("hello1");
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
    console.log("hello2");
    function clickDragMode(){ //click & drag mode
        clickHover=0;
        if(paintBtn.classList.length===3){
            drawingGrid.removeEventListener("mouseover",drawMode); 
            drawingGrid.removeEventListener("mousedown", clickNdrag);
            drawingGrid.addEventListener("mousedown", clickNdrag);
            drawingGrid.removeEventListener("mouseover",drawModeHover); 
            console.log("hello3");
        }

        if(eraserBtn.classList.length === 3){
            drawingGrid.removeEventListener("mouseover",eraseMode); 
            drawingGrid.removeEventListener("mousedown", eraseClick);
            drawingGrid.addEventListener("mousedown", eraseClick);
        }
        console.log("hello4");
            clickOrHover.removeEventListener("click", clickDragMode);
            clickHoverText.innerHTML=`Click<br>&<br>Drag`;
            clickOrHover.addEventListener("click", clickHoverFunc);
        }
}


/* paint, eraser and refresh buttons*/
let colorBtn = document.querySelector(".colorPicker");

paintBtn.addEventListener("click",paintBtnn);

function paintBtnn(){  
    if(eraserBtn.classList.length === 3){           //in case erase button is on when paint btn is pressed
        drawingGrid.removeEventListener("mouseover",eraseMode);
        eraserBtn.classList.remove("activePaintBtn");
        eraserBtn.addEventListener("click", eraser);
        console.log("hello5");
    }
    paintBtn.classList.add("activePaintBtn");              //add glow effect
    paintBtn.removeEventListener("click",paintBtnn);
   
    if(clickHover===1 && paintBtn.classList.length===3){//hover Mode
        console.log("hello6");
        drawingGrid.addEventListener("mouseover",drawMode); 

    }
    if(clickHover===0 && paintBtn.classList.length===3){ //click N dragmode
        console.log("hello7");
        drawingGrid.addEventListener("mousedown", clickNdrag); //this is where you left off, line 75 doesn't work because of this (when you click on grid while on hover mode it makes it click n drag)

    }
    console.log("hello8");
    paintBtn.addEventListener("click", noDraw);          //click again, no draw 
    }


    //draw function
    function drawMode (e){
        let colorPalette = document.getElementById("colorPalette");
        if(e.target.className === 'box') {
            let palletteVal = colorPalette.value; 
            e.target.style.background=palletteVal;
            }
        
        }
    //no draw function
    function noDraw(){
        console.log("hello9");
        paintBtn.addEventListener("click",paintBtnn);
        paintBtn.classList.remove("activePaintBtn");  
        drawingGrid.removeEventListener("mouseover", drawMode);
        drawingGrid.removeEventListener("mousedown", drawMode);
        drawingGrid.removeEventListener("mousedown", clickNdrag);
        drawingGrid.removeEventListener("mouseover", drawMode);
        drawingGrid.removeEventListener("mousedown", clickNdrag);
        drawingGrid.removeEventListener("mouseover",drawModeHover); 
            }  



    function clickNdrag(){
        console.log("click N Drag");
        if(paintBtn.classList.length === 3){
            drawingGrid.addEventListener("mouseover",drawMode); //click and drag mode
            drawingGrid.addEventListener("mouseup",removeClickNDrag);
        }

            }

    function drawModeHover(){
        console.log("hello11");
        drawingGrid.addEventListener("mouseover",drawMode);
    }
    function removeClickNDrag(){
        console.log("remove click and drag");
        drawingGrid.addEventListener("mousedown", clickNdrag);
        drawingGrid.removeEventListener("mouseover",drawMode);
        drawingGrid.addEventListener("mousedown", clickNdrag);

            }
    





















eraserBtn.addEventListener("click", eraser);

    //erasefunction

function eraser(){  
    if(paintBtn.classList.length === 3){
        drawingGrid.removeEventListener("mouseover",drawMode); 
        paintBtn.classList.remove("activePaintBtn");
        paintBtn.addEventListener("click",paintBtnn);
 
    }
    eraserBtn.removeEventListener("click", eraser);
    eraserBtn.classList.add("activePaintBtn");    //add glow effect



    if(clickHover===1 && eraserBtn.classList.length === 3){//hover Mode
        drawingGrid.addEventListener("mouseover",eraseMode); 

    }
    if(clickHover===0 && eraserBtn.classList.length === 3){ //click mode
        drawingGrid.addEventListener("mousedown", eraseClick);

    }

    eraserBtn.addEventListener("click", noEraser);          //click again, no erase
       
    }


    function eraseClick(){
        drawingGrid.addEventListener("mouseover", eraseMode);
        drawingGrid.addEventListener("mouseup", removeEraseClick);
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
        eraserBtn.classList.remove("activePaintBtn");
        drawingGrid.removeEventListener("mouseover",eraseMode);
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
                if(gridSlider.value>=70){
                    warningText.classList.add("warningText");
                    warningText.innerText = "Going above 70x70 might slow down your browser!";  
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

