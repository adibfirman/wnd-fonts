"use strict";

// -- constant --
var BASE_CLASS_NAME = "__wnd__"; // --
// -- setup container --

var container = document.createElement("div");
container.className = BASE_CLASS_NAME;
var styles = {
  position: "fixed",
  zIndex: 2147483647,
  width: "max-content",
  height: "max-content",
  right: 0,
  top: 0
};

for (var key in styles) {
  if (styles.hasOwnProperty(key)) {
    var style = styles[key];
    container.style[key] = style;
  }
} // --
// -- the button --


var button = document.createElement("button");
button.innerText = "Exit WnD Font";
button.addEventListener("click", function (e) {
  container.remove();
}); // --

container.append(button);
document.body.append(container);