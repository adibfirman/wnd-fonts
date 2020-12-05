// -- constant --
const BASE_CLASS_NAME = "__wnd__";

// -- setup container --
const container = document.createElement("div");
container.className = BASE_CLASS_NAME;
const styles = {
  position: "fixed",
  zIndex: 2147483647,
  width: "max-content",
  height: "max-content",
  right: 0,
  top: 0,
};

for (const key in styles) {
  if (styles.hasOwnProperty(key)) {
    const style = styles[key];
    container.style[key] = style;
  }
}

// -- the button --
const button = document.createElement("button");
button.innerText = "Exit WnD Font";
button.addEventListener("click", (e) => container.remove());

container.append(button);
document.body.append(container);
