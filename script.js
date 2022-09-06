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
let btnSwitch=0;
let eraserSwitch=0;
let gridNodes = drawingGrid.childNodes;



let colorBtn = document.querySelector(".colorPicker");




paintBtn.addEventListener("click",paintBtnn);

function paintBtnn(){  
    let colorPalette = document.getElementById("colorPalette");
    
    paintBtn.classList.add("activePaintBtn");              //add glow effect
    drawingGrid.addEventListener("mouseover",drawMode); //click once, draw mode
    paintBtn.removeEventListener("click",paintBtnn);

    paintBtn.addEventListener("click", noDraw);          //click again, no draw


    //draw function
    function drawMode (e){
        if(e.target.className === 'box') {
            console.log("draw mode");
            let palletteVal = colorPalette.value; 
            e.target.style.background=palletteVal;
            }
        
        }
    //no draw function
    function noDraw(){
        console.log("no draw mode");
        paintBtn.addEventListener("click",paintBtnn);
        paintBtn.classList.remove("activePaintBtn");  
        drawingGrid.removeEventListener("mouseover", drawMode);
            }           
    }




/* paint, eraser and refresh buttons*/


eraserBtn.addEventListener("click", eraser);

function eraser(){  

    eraserBtn.removeEventListener("click", eraser);
    eraserBtn.classList.add("activePaintBtn");              //add glow effect
    drawingGrid.addEventListener("mouseover",eraseMode);

    eraserBtn.addEventListener("click", noEraser);          //click again, no erase


    //erasefunction
    function eraseMode (e){
        if(e.target.className === 'box') {

            e.target.style.background="none";
            }
            console.log(e.target.className);
        }
    //no erase
    function noEraser(){
        eraserBtn.classList.remove("activePaintBtn");
        console.log("no erase mode");
        drawingGrid.removeEventListener("mouseover",eraseMode);
        eraserBtn.addEventListener("click", eraser); 

            }           
    }









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
                btnSwitch=0;
                paintBtn.classList.remove("activePaintBtn");
                eraserSwitch=0;
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

