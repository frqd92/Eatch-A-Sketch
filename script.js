let drawingGrid = document.querySelector(".drawing-grid"); 

let settingsContainer = document.getElementById("settings-container");
let settingsBtn = document.querySelector(".settings");
let settingsCloseBtn = document.getElementById("setting-close-button")
let currentGridSize;
window.onload=calculateGrid(50);

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

function gridSlider(){
    let gridSlider = document.getElementById("gridRange");
    let gridSliderText = document.querySelector("#gridRangeValue");
    let warningText = document.getElementById("warning-msg");

    gridSlider.addEventListener("mousedown", ()=>{   /* mousemove inside mousedown so range slider value text changes as slider moves */
        gridSlider.addEventListener("mousemove", ()=>{
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
