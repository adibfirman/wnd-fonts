"use strict";

// ====================== CONSTANT VARIABLE =======================
var zIndex = 2147483647;
var fontSize = "font-size: 0.7rem;";
var baseClassName = "__WnD__";
var container = createContainer();
var overlayText = createOverlayText();
var exitButton = createExitButton();
var reqAnim, longFontName, boxResult; // ================================================================
// ====================== GENERATE CONTAINER ======================

function createContainer() {
  var container = document.createElement("div");
  container.style.cssText = "\n    position: fixed;\n    z-index: ".concat(zIndex, ";\n    width: max-content;\n    height: max-content;\n    right: 0;\n    top: 0;\n  ");
  return container;
} // ================================================================
// ====================== CREATE OVERLAY TEXT =====================


function createOverlayText() {
  var span = document.createElement("span");
  span.style.cssText = "\n    ".concat(fontSize, "\n    position: fixed;\n    z-index: ").concat(zIndex, ";\n    top: 0;\n    left: 0;\n    background-color: #4A5568;\n    color: #fff;\n    font-weight: 600;\n    padding: 4px 20px;\n    border-radius: 6px;\n    font-family: system-ui;\n    letter-spacing: 0.3px;\n    text-transform: lowercase;\n  ");
  return span;
} // ================================================================
// ====================== GENERAL FUNCTION ========================


function handleMouseMove(e) {
  var hoverableDOM = e.target;
  var getFontName = window.getComputedStyle(hoverableDOM).getPropertyValue("font-family");
  var x = e.clientX;
  var y = e.clientY;
  reqAnim = window.requestAnimationFrame(function () {
    return updatePositionFontInfo({
      fontFamily: getFontName,
      position: {
        x: x,
        y: y
      }
    });
  });
}

function updatePositionFontInfo(_ref) {
  var fontFamily = _ref.fontFamily,
      position = _ref.position;
  var filterFontName = fontFamily.split(", ").filter(function (font) {
    return font.search(/x-/gi) < 0;
  });
  overlayText.style.transform = "translate3d(".concat(position.x, "px, ").concat(position.y + 17, "px, 0)");
  overlayText.innerText = filterFontName[0];
}

function handleWindowClick(e) {
  e.stopPropagation();
  var x = e.clientX;
  var y = e.clientY;
  var fontName = window.getComputedStyle(e.target).getPropertyValue("font-family");
  longFontName = fontName;
  var createBox = createBoxResult();
  createBox.style.transform = "translate3d(".concat(x, "px, ").concat(y, "px, 0)");
  createBox.setAttribute("data-font-name", fontName);
  boxResult = createBox;
  if (e.target !== exitButton) document.body.append(createBox);
} // ================================================================
// ====================== CREATE RESULT FONT ======================


var classNameResultBox = "".concat(baseClassName, "result");

function removeBoxResults() {
  document.querySelectorAll(".".concat(classNameResultBox)).forEach(function (ele) {
    ele.remove();
  });
}

function createBoxResult() {
  removeBoxResults();
  var Container = document.createElement("div");
  Container.className = classNameResultBox;
  Container.style.cssText = "\n    position: fixed;\n    z-index: ".concat(zIndex, ";\n    top: 0;\n    left: 0;\n    background-color: #4a5568f2;\n    color: #fff;\n    font-weight: 600;\n    padding: 4px 20px;\n    border-radius: 6px;\n    font-family: system-ui;\n    letter-spacing: 0.3px;\n    text-transform: lowercase;\n  ");
  var HeaderContainer = document.createElement("div");
  HeaderContainer.style.cssText = "\n    max-width: 22rem;\n    font-family: system-ui;\n  ";
  var HeaderText = document.createElement("p");
  HeaderText.innerText = "Font family";
  HeaderText.style.cssText = "\n    ".concat(fontSize, "\n    text-transform: capitalize;\n    color: #ccc;\n    margin: 0px;\n    font-weight: bold;\n    margin-bottom: -3px;\n  ");
  var TextName = document.createElement("span");
  TextName.innerText = longFontName;
  TextName.style.cssText = "\n    font-size: 0.85rem;\n    font-family: system-ui;\n  ";
  HeaderContainer.append(HeaderText);
  HeaderContainer.append(TextName);
  Container.append(HeaderContainer);
  return Container;
} // ================================================================
// ====================== CREATE EXIT BUTTON ======================


function createExitButton() {
  var button = document.createElement("button");
  button.innerText = "Exit WnD Font";
  button.style.cssText = "\n    ".concat(fontSize, "\n    margin: 16px;\n    background-color: #4A5568;\n    color: #fff;\n    border: none;\n    border-radius: 4px;\n    font-family: system-ui;\n    box-shadow: 4px 7px 5px 0px #4a556882;\n  ");
  return button;
} // ================================================================


exitButton.addEventListener("click", function (e) {
  window.removeEventListener("mousemove", handleMouseMove);
  window.removeEventListener("click", handleWindowClick);
  window.cancelAnimationFrame(reqAnim);
  overlayText.remove();
  container.remove();
  document.body.style.cursor = "unset";
  removeBoxResults();
});
window.addEventListener("mousemove", handleMouseMove);
window.addEventListener("click", handleWindowClick);
container.append(exitButton);
document.body.append(container);
document.body.append(overlayText);
document.body.style.cursor = "pointer";