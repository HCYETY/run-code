alert('ddd')
Array.prototype.push = function() {
  console.log('调用了 arr 的 push')
  for (let argument of arguments) {
    if (argument !== null) {
      this[this.length] = argument;
    }
  }
  return this.length;
}

function doubleClick() {
  console.log('@@@')
  var text = "";
  if (chrome.windows.getSelection) {
    text = chrome.windows.getSelection().toString();
  }
  if ("" != text) {
    console.log(text);
  }
}

function mouseUp() {
  console.log('###')
  var text = "";
  if (chrome.window.getSelection) {
    text = chrome.window.getSelection().toString();
  }
  if ("" != text) {
    console.log(text);
  }
}


chrome.runtime.onInstalled.addListener(function () {
  console.log("插件已被安装");
  console.log('chrome', chrome)
  console.log('chrome.windows', chrome.windows)
});

window.addEventListener("dblclick", doubleClick, true);

window.addEventListener("mouseup", mouseUp, true);
window.addEventListener("mousemove", mouseUp, true);
