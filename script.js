const body = document.querySelector("body");
let n = 16;
const SIZE_LIMIT = 34;
// helper function
function split_rgb_string(rgb_string){
    const result = [];
    const subString = rgb_string.slice(4,-1);
    const rgbArr = subString.split(",");
    rgbArr.forEach(numString => {
        result.push(parseInt(numString));
    });
    return result;
}

function change_color(e){
    let r, g, b;
    if (e.target.style["background-color"] === "" ){
        r = Math.floor(Math.random()*256);
        g = Math.floor(Math.random()*256);
        b = Math.floor(Math.random()*256);
        e.target.setAttribute("style",`background-color: rgb(${r}, ${g}, ${b})`);
    }
    [r, g, b] = split_rgb_string(e.target.style["background-color"]);
    console.log(r,g,b);
    if((225-r)<10) r += (225-r)%10;
    else r += Math.floor((225-r)/10);

    if((225-g)<10) g += (225-g)%10;
    else g += Math.floor((225-g)/10);

    if((225-b)<10) b += (225-b)%10;
    else b += Math.floor((225-b)/10);

    e.target.setAttribute("style",`background-color: rgb(${r}, ${g}, ${b})`);
    console.log(r,g,b)
    // e.target.setAttribute("style","background-color: white");
}

function createGrid(n){
    const gridContainer = document.createElement("div");
    gridContainer.classList.add("grid-container");
    
    // crete row and col 
    let itemSizeLimit = SIZE_LIMIT/n;
    let style_string_for_grid = ""; 
    for(let i = 0;i<n;i++){
        style_string_for_grid += ` ${itemSizeLimit}rem`;
    }
    let style_string = `grid-template-columns:${style_string_for_grid};`+
    `grid-template-rows:${style_string_for_grid};`;
    
    gridContainer.setAttribute("style",style_string);
    
    // create n by n grid (div)
    for(let i = 0 ; i < n*n; i++){
        const grid_item = document.createElement("div");
        grid_item.classList.add("grid-item");
        grid_item.addEventListener("mouseenter",change_color);
        gridContainer.appendChild(grid_item);
    }
    body.appendChild(gridContainer);
    return gridContainer;
}

let gridContainer = createGrid(n);
let button = document.querySelector(".button button");
button.addEventListener("click",()=>{
    let invalid = false;
    do{
        n = prompt("enter the # of dimension(n): ");
        if (n>100 || n<=0) {
            invalid = true;
            alert("Invalid number! Please enter again(0-100).");
        }
        else invalid = false;
    }while(invalid)

    const newGridContainer = createGrid(n);
    body.replaceChild(newGridContainer,gridContainer);
    gridContainer = newGridContainer;
})

