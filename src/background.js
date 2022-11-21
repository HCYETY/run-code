import {
  CodeFilled
} from '@ant-design/icons';
import './App.css';
import App from './App';

function doubleClick() {

}

function throttle () {

}
function mouseUp(e) {
  const bodyObj = document.getElementsByTagName("body")[0];
  const judgeDiv = document.getElementsByClassName("iconfont");
  if (judgeDiv.length > 0) {
    bodyObj.removeChild(judgeDiv[0]);
  }

  const selection = document.getSelection();
  const oRange = selection.getRangeAt(0)
  const oRect = oRange.getBoundingClientRect()
  const text = selection.toString()
  if (text.length > 0 && text !== '\n') {
    const x = oRect.x, y = oRect.y;
    create(x, y);
  }
}

// 原生js创建一个div层
function create(x, y){
  const bodyObj = document.getElementsByTagName("body")[0];


  //创建一个div
  // var div = document.createElement("link");
  // div.type = 'image/x-icon';
  // div.rel = 'shortcut icon';
  // div.href = '/favicon.ico';
  let div = document.createElement("span");
  div.setAttribute("class", "iconfont");
  div.innerHTML = '&#xecc3;';
  // 为div添加样式
  // var style = document.createAttribute("style");
  // div.setAttributeNode(style);
  div.style.position = 'absolute'
  div.style.left = x - 30 + 'px';
  div.style.top = y - 50 + 'px';
  // 将添加的 div 元素，添加在body 元素最后
  bodyObj.appendChild(div);

  div.onmouseover = event;
  div.onclick = event;

  function event () {
    console.log('ddd')
    let newApp = App();
    // let card = document.createElement(App());
    bodyObj.appendChild(newApp);
  }
  div.onmouseout = function excute () {
    bodyObj.removeChild(div);
  }


  // // mouseup 结束后解绑 mousemove
  // window.removeEventListener('mousemove', dragMousemoveEvent);
  // // mouseup 结束后解绑 mouseup
  // window.removeEventListener('mouseup', dragMouseupEvent);
  // function dragMouseupEvent(e) {
  //   // mouseup结束后解绑mousemove
  //   // $(document).off("mousemove", dragMousemoveEvent);
  //   // mouseup结束后解绑mouseup
  //   // $(document).off("mouseup", dragMouseupEvent);
  //   bodyObj.removeChild(div);
  // }
  // // 鼠标移动的时候，设置元素的坐标与鼠标坐标保持一致
  // function dragMousemoveEvent(e) {
  //   div.css({ left: e.pageX, top: e.pageY });
  // }
}


window.addEventListener("dblclick", doubleClick, true);
window.addEventListener("selectionchange", mouseUp, true);
