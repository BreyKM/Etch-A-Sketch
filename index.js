// Variables //
const DEFAULT_MODE = "color";
const DEFAULT_COLOR = "#000000";
const DEFAULT_SIZE = 16;

const colorPicker = document.getElementById("color-picker");
const colorBtn = document.getElementById("colorBtn");
const rainbowBtn = document.getElementById("rainbowBtn");
const shaderBtn = document.getElementById("shaderBtn");
const eraserBtn = document.getElementById("eraserBtn");
const clearBtn = document.getElementById("clearBtn");
const sizeValue = document.getElementById("sizeValue");
const sizeSlider = document.getElementById("sizeSlider");
const canvasGrid = document.getElementById("canvas-grid");

let currentColor = DEFAULT_COLOR;
let currentMode = DEFAULT_MODE;
let currentSize = DEFAULT_SIZE;

let mouseDown = false;

// Functions //
function setCurrentColor(newColor) {
  currentColor = newColor;
}

function setCurrentMode(newMode) {
  activateButton(newMode);
  console.log("currentmode: " + currentMode);
  currentMode = newMode;
}

function setCurrentSize(newSize) {
  currentSize = newSize;
}

function clearGrid() {
  canvasGrid.innerHTML = "";
}

document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);

function reloadGrid() {
  clearGrid();
  setupGrid(currentSize);
}

function updateSizeValue(value) {
  sizeValue.innerHTML = `${value} x ${value}`;
}

function changeSize(value) {
  setCurrentSize(value);
  updateSizeValue(value);
  reloadGrid();
}

colorPicker.oninput = function (e) {
  setCurrentColor(e.target.value);
  console.log(e.target.value);
};

colorBtn.onclick = function () {
  setCurrentMode("color");
  console.log(currentMode);
};

rainbowBtn.onclick = function () {
  setCurrentMode("rainbow");
  console.log(currentMode);
};

shaderBtn.onclick = function () {
  setCurrentMode("shader");
  console.log(currentMode);
};

eraserBtn.onclick = function () {
  setCurrentMode("eraser");
  console.log(currentMode);
};

clearBtn.onclick = function () {
  reloadGrid();
};

sizeSlider.onmousemove = function (e) {
  updateSizeValue(e.target.value);
  console.log(e.target.value);
};

sizeSlider.onchange = function (e) {
  changeSize(e.target.value);
  console.log(e.target.value);
};
function setupGrid(size) {
  canvasGrid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
  canvasGrid.style.gridTemplateRows = `repeat(${size}, 1fr)`;

  for (let i = 0; i < size * size; i++) {
    const gridElement = document.createElement("div");
    gridElement.classList.add("grid-element");
    gridElement.addEventListener("mousedown", changeColor);
    gridElement.addEventListener("mouseover", changeColor);
    
    canvasGrid.appendChild(gridElement);
  }
}

function changeColor(e) {
  if (e.type === "mouseover" && !mouseDown) return;
  if (currentMode === "rainbow") {
    const randomR = Math.floor(Math.random() * 256);
    const randomG = Math.floor(Math.random() * 256);
    const randomB = Math.floor(Math.random() * 256);
    e.target.style.backgroundColor = `rgb(${randomR}, ${randomG}, ${randomB})`;
  } else if (currentMode === "color") {
    e.target.style.backgroundColor = currentColor;
  } else if (currentMode === "eraser") {
    e.target.style.backgroundColor = "#FFFFFF";
    
  } else if (currentMode === 'shader') {
    if (e.target.style.backgroundColor.match(/rgba/)) {
        let currentOpacity = Number(e.target.style.backgroundColor.slice(-4, -1));
        if (currentOpacity <= 0.9) {
            e.target.style.backgroundColor = `rgba(0, 0, 0, ${currentOpacity + 0.1})`;
        }
    } else if (e.target.style.backgroundColor == 'rgb(0, 0, 0)') {
        return;
    } else {
        e.target.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';  
    }
  }
}

function activateButton(newMode) {
  if (currentMode === "rainbow") {
    rainbowBtn.classList.remove("activeBtn");
  } else if (currentMode === "color") {
    colorBtn.classList.remove("activeBtn");
  } else if (currentMode === "eraser") {
    eraserBtn.classList.remove("activeBtn");
  } else if (currentMode === "shader") {
    shaderBtn.classList.remove("activeBtn");
  }

  if (newMode === "rainbow") {
    rainbowBtn.classList.add("activeBtn");
  } else if (newMode === "color") {
    colorBtn.classList.add("activeBtn");
  } else if (newMode === "eraser") {
    eraserBtn.classList.add("activeBtn");
  } else if (newMode == "shader") {
    shaderBtn.classList.add("activeBtn");
  }
}

window.onload = () => {
  setupGrid(DEFAULT_SIZE);
  activateButton(DEFAULT_MODE);
};
