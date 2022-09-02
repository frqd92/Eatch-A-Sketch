let drawingGrid = document.querySelector(".drawing-grid"); 

let settingsContainer = document.getElementById("settings-container");
let settingsBtn = document.querySelector(".settings");
let settingsCloseBtn = document.getElementById("setting-close-button")
let currentGridSize;


settingsPopup();
calculateGrid(16);
gridSlider();
gridOpacity();


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




function settingsPopup(){

    settingsBtn.addEventListener("click", ()=>{
        settingsContainer.style.display="block";
    })
    window.addEventListener("click", (e)=>{
        if(e.target === settingsContainer){
            settingsContainer.style.display="none";
        }
    })
    settingsCloseBtn.addEventListener("click", ()=>{
       settingsContainer.style.display="none";
    })
}


function gridSlider(){
    let gridSlider = document.getElementById("gridRange");
    let gridSliderText = document.querySelector("#gridRangeValue");

    gridSlider.addEventListener("click", ()=>{
        refreshGrid()
        gridSliderText.textContent=gridSlider.value + " x " + gridSlider.value; /*  fix when sliding doesn't show right format*/
        calculateGrid(gridSlider.value);

    })

}

function gridOpacity(){ 
    let lineSlider = document.getElementById("lineRange");
    let opacitySliderText = document.getElementById("lineRangeValue");
    lineSlider.addEventListener("click", ()=>{
    let insideGrid = drawingGrid.childNodes;
    let lineSliderVal = lineSlider.value / 100;
    let lineSliderValPercent = Math.round(lineSliderVal * 100);
        for(let z=0;z<(currentGridSize*currentGridSize);z++){
            insideGrid[z].style.border= ` 0.2px solid rgba(255, 255, 255, ${lineSliderVal}) `;
            opacitySliderText.textContent = ` ${lineSliderValPercent}% `
        }
    })
}
function refreshGrid(){
    /* everytime a new grid number was chosen it added on top of the old on so had to delete contents before every change*/
    while(drawingGrid.firstChild){
       drawingGrid.removeChild(drawingGrid.firstChild);
   }
}
