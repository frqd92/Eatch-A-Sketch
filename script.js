let drawingGrid = document.querySelector(".drawing-grid"); 

let settingsContainer = document.getElementById("settings-container");
let settingsBtn = document.querySelector(".settings");
let settingsCloseBtn = document.getElementById("setting-close-button")
let currentGridSize;
let settingsWindow = document.getElementById("settings");
window.onload=calculateGrid(50);




function drag({movementX, movementY}){
/* Makes the settings box draggable*/
    let getPos = window.getComputedStyle(settingsWindow);

    let leftPos = parseInt(getPos.left);
    let topPos = parseInt(getPos.top);
    settingsWindow .style.left = ` ${leftPos + movementX}px `
    settingsWindow .style.top = ` ${topPos + movementY}px `
}
settingsWindow.addEventListener("mousedown",()=>{
    settingsWindow.addEventListener("mousemove", drag);
    } )
document.addEventListener("mouseup", ()=>{
    settingsWindow.removeEventListener("mousemove", drag);
    })


settingsBtn.addEventListener("click", ()=>{
    settingsContainer.style.display="block";
    gridSlider();
    gridOpacity();
    })

    
window.addEventListener("click", (e)=>{
    if(e.target === settingsContainer){
        settingsContainer.style.display="none";
        settingsContainer.style.top="0";
        settingsContainer.style.left="0";
        settingsWindow.style.top="50%";
        settingsWindow.style.left="50%";
     
    }
})
settingsCloseBtn.addEventListener("click", ()=>{
   settingsContainer.style.display="none";
   settingsContainer.style.top="0";
   settingsContainer.style.left="0";
   settingsWindow.style.top="50%";
   settingsWindow.style.left="50%";

})    


function calculateGrid(x){
    let gridCalc = 600 / x ; 
    drawingGrid.style.gridTemplateColumns =`repeat(auto-fit, ${gridCalc}px)`;
    drawingGrid.style.gridTemplateRows =` repeat(auto-fit, ${gridCalc}px) `;
    drawingGrid.style.gridAutoRows = `${gridCalc}px`

    for ( let z=0 ; z<(x*x) ; z++ ){
        let box = document.createElement("div");
        box.setAttribute("class", "box");
        drawingGrid.appendChild(box);
    }
    currentGridSize=x;
}
function gridSlider(){
    let gridSlider = document.getElementById("gridRange");
    let gridSliderText = document.querySelector("#gridRangeValue");
    let warningText = document.getElementById("warning-msg");

    gridSlider.addEventListener("mousedown", ()=>{   /* mousemove inside mousedown so range slider value text changes as slider moves */
        gridSlider.addEventListener("mousemove", ()=>{
        settingsWindow.removeEventListener("mousemove", drag);   /* settings window was being dragged with the slider*/
        refreshGrid()
        gridSliderText.textContent=gridSlider.value + " x " + gridSlider.value;

        calculateGrid(gridSlider.value);
            if(gridSlider.value>=70){
                warningText.classList.add("warningText");
                warningText.innerText = "Going above 70x70 might slow down your browser!";
 
            }
            else{
                warningText.textContent ="";
            }
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






