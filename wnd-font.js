// ====================== CONSTANT VARIABLE =======================
const zIndex = 2147483647;
const fontSize = "font-size: 0.7rem;";
const baseClassName = "__WnD__";
const container = createContainer();
const overlayText = createOverlayText();
const exitButton = createExitButton();
let reqAnim, longFontName, boxResult;
// ================================================================

// ====================== GENERATE CONTAINER ======================
function createContainer() {
  const container = document.createElement("div");
  container.style.cssText = `
    position: fixed;
    z-index: ${zIndex};
    width: max-content;
    height: max-content;
    right: 0;
    top: 0;
  `;

  return container;
}
// ================================================================

// ====================== CREATE OVERLAY TEXT =====================
function createOverlayText() {
  const span = document.createElement("span");
  span.style.cssText = `
    ${fontSize}
    position: fixed;
    z-index: ${zIndex};
    top: 0;
    left: 0;
    background-color: #4A5568;
    color: #fff;
    font-weight: 600;
    padding: 4px 20px;
    border-radius: 6px;
    font-family: system-ui;
    letter-spacing: 0.3px;
    text-transform: lowercase;
  `;
  return span;
}
// ================================================================

// ====================== GENERAL FUNCTION ========================
function handleMouseMove(e) {
  const hoverableDOM = e.target;
  const getFontName = window
    .getComputedStyle(hoverableDOM)
    .getPropertyValue("font-family");

  const x = e.clientX;
  const y = e.clientY;

  reqAnim = window.requestAnimationFrame(() =>
    updatePositionFontInfo({ fontFamily: getFontName, position: { x, y } })
  );
}

function updatePositionFontInfo({ fontFamily, position }) {
  const filterFontName = fontFamily.split(", ").filter((font) => {
    return font.search(/x-/gi) < 0;
  });

  overlayText.style.transform = `translate3d(${position.x}px, ${
    position.y + 17
  }px, 0)`;
  overlayText.innerText = filterFontName[0];
}

function handleWindowClick(e) {
  e.stopPropagation();
  const x = e.clientX;
  const y = e.clientY;
  const fontName = window
    .getComputedStyle(e.target)
    .getPropertyValue("font-family");

  longFontName = fontName;

  const createBox = createBoxResult();
  createBox.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  createBox.setAttribute("data-font-name", fontName);

  boxResult = createBox;

  if (e.target !== exitButton) document.body.append(createBox);
}
// ================================================================

// ====================== CREATE RESULT FONT ======================
const classNameResultBox = `${baseClassName}result`;

function removeBoxResults() {
  document.querySelectorAll(`.${classNameResultBox}`).forEach((ele) => {
    ele.remove();
  });
}

function createBoxResult() {
  removeBoxResults();
  const Container = document.createElement("div");
  Container.className = classNameResultBox;

  Container.style.cssText = `
    position: fixed;
    z-index: ${zIndex};
    top: 0;
    left: 0;
    background-color: #4a5568f2;
    color: #fff;
    font-weight: 600;
    padding: 4px 20px;
    border-radius: 6px;
    font-family: system-ui;
    letter-spacing: 0.3px;
    text-transform: lowercase;
  `;

  const HeaderContainer = document.createElement("div");
  HeaderContainer.style.cssText = `
    max-width: 22rem;
    font-family: system-ui;
  `;

  const HeaderText = document.createElement("p");
  HeaderText.innerText = "Font family";
  HeaderText.style.cssText = `
    ${fontSize}
    text-transform: capitalize;
    color: #ccc;
    margin: 0px;
    font-weight: bold;
    margin-bottom: -3px;
  `;

  const TextName = document.createElement("span");
  TextName.innerText = longFontName;
  TextName.style.cssText = `
    font-size: 0.85rem;
    font-family: system-ui;
  `;

  HeaderContainer.append(HeaderText);
  HeaderContainer.append(TextName);
  Container.append(HeaderContainer);

  return Container;
}
// ================================================================

// ====================== CREATE EXIT BUTTON ======================
function createExitButton() {
  const button = document.createElement("button");
  button.innerText = "Exit WnD Font";
  button.style.cssText = `
    ${fontSize}
    margin: 16px;
    background-color: #4A5568;
    color: #fff;
    border: none;
    border-radius: 4px;
    font-family: system-ui;
    box-shadow: 4px 7px 5px 0px #4a556882;
  `;

  return button;
}
// ================================================================

exitButton.addEventListener("click", (e) => {
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
