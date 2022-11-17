import React, {Component, useEffect, useRef, useState} from 'react';
import { Select, } from 'antd';
import { PROGRAM_LANGUAGE, PROGRAM_THEME } from '../constants';
// import { Client, TextOperation,  } from 'ot';
// import { getCookie, nowTime } from 'src/common/utils';

// 查找控件
// import 'monaco-editor/esm/vs/editor/contrib/find/findController.js';
// 只支持以下几种语言：'cpp', 'java', 'python', 'javascript', 'ruby', 'swift', 'go', 'rust', 'php', 'typescript'
// import 'monaco-editor/esm/vs/basic-languages/cpp/cpp.contribution';
// import 'monaco-editor/esm/vs/basic-languages/java/java.contribution';
// import 'monaco-editor/esm/vs/basic-languages/python/python.contribution';
import 'monaco-editor/esm/vs/basic-languages/javascript/javascript.contribution';
// import 'monaco-editor/esm/vs/basic-languages/ruby/ruby.contribution';
// import 'monaco-editor/esm/vs/basic-languages/swift/swift.contribution';
// import 'monaco-editor/esm/vs/basic-languages/go/go.contribution';
// import 'monaco-editor/esm/vs/basic-languages/rust/rust.contribution';
// import 'monaco-editor/esm/vs/basic-languages/php/php.contribution';
// import 'monaco-editor/esm/vs/basic-languages/typescript/typescript.contribution';
// import * as monaco from 'monaco-editor/esm/vs/editor/editor.main.js';
// const monaco = require('monaco-editor/esm/vs/editor/editor.api');
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api.js';

let monacoInstance = null;

function App(props) {
  const {
    style = { // dom节点样式
      height: '300px',
      width: '95%',
      border: '1px solid #eee',
    },
    value, // 代码文本
    onChange = () => { // 改变的事件
    },
    fontSize = 14, // 代码字体大小
    monacoOptions = {}, // monaco 自定义属性
    language, // 语言 支持 js ts sql css json html等
    getProgramCode,
    sendCode,
    codeObj
  } = props;
  const editOrRef = useRef();
  const ThisEditor = useRef();
  useEffect(() => {
    monacoInstance  = monaco.editor.create(document.getElementById("container"), {
      value: value,
      contextmenu: true,
      language: language || "javascript",
      theme: 'vs',
      minimap: {
        enabled: false
      },
    });
    // ThisEditor.current = monaco.editor.create(editOrRef.current, {
    //   value: value || '',
    //   language,
    //   theme: "vs",
    //   fontSize: fontSize + 'px',
    //   minimap: { // 关闭代码缩略图
    //     enabled: false,
    //   },
    //   ...monacoOptions,
    // });

    // 获取编辑器的内容
    monacoInstance.onDidChangeModelContent((e) => {
      let newValue = monacoInstance.getValue();
      // console.log(newValue)
      // const cookie = getCookie();
      getProgramCode && getProgramCode(newValue);
    });
    // ThisEditor.current.onDidChangeModelContent((e) => {
    //   let newValue = ThisEditor.current.getValue();
    //   onChange(newValue);
    // });
    return () => {
      monacoInstance.dispose();
      monacoInstance = undefined; // 清除编辑器对象
      // ThisEditor.current.dispose();
      // ThisEditor.current = undefined; // 清除编辑器对象
    }
  }, []);
  // useEffect(() => {
  //   if (ThisEditor.current) {
  //     ThisEditor.current.updateOptions({
  //       fontSize: fontSize + 'px',
  //     })
  //   }
  //
  // }, [fontSize]);

  return (
    <div style={style}
         ref={editOrRef}
         id="container"
    >

    </div>
  );
}

export default App;




// let monacoInstance = null;
//
// export default class CodeEditor extends React.Component {
//   // 组件挂载后加载编辑器
//   componentDidMount() {
//     monacoInstance  = monaco.editor.create(document.getElementById("container"), {
//       value: "输入要运行的 JS 代码",
//       contextmenu: true,
//       language:"javascript",
//       theme: 'vs',
//       minimap: {
//         enabled: false
//       },
//     });
//
//     // 获取编辑器的内容
//     monacoInstance.onDidChangeModelContent((e) => {
//       let newValue = monacoInstance.getValue();
//       console.log(newValue)
//       const { getProgramCode, sendCode, codeObj } = this.props;
//       // const cookie = getCookie();
//       getProgramCode && getProgramCode(newValue);
//       if (sendCode) {
//         const { changes } = e;
//         let docLength = monacoInstance.getModel().getValueLength(); // 文档长度
//         // let operationDoc = new TextOperation().retain(docLength); // 初始化一个operation，并保留文档原始内容
//         // for (let i = changes.length - 1; i >= 0; i--) {
//         //   const change = changes[i];
//         //   const restLength = docLength - change.rangeOffset - change.text.length; // 文档
//         //   operationDoc = new TextOperation()
//         //     .retain(change.rangeOffset) // 保留光标位置前的所有字符
//         //     .delete(change.rangeLength) // 删除N个字符（如为0这个操作无效）
//         //     .insert(change.text) // 插入字符
//         //     .retain(restLength) // 保留剩余字符
//         //     .compose(operationDoc); // 与初始operation组合为一个操作
//         // }
//         //
//         // const operation = operationDoc.toString();
//         // const time = nowTime();
//         // const operationObj = { operation, cookie, time };
//
//         //怎么发送？
//         //怎么接收？
//         //怎么更新？
//         // sendCode(operationObj);
//       }
//     })
//
//   }
//
//   // componentDidUpdate() {
//   //   monacoInstance.onDidChangeModelContent((e) => {
//   //     const { codeObj } = this.props;
//   //     console.log('要修改其他用户的代码了')
//   //     console.log(codeObj)
//   //     console.log(codeObj.code)
//   //     monacoInstance.setValue('nihao')
//   //     // monacoInstance.setValue(codeObj.code);
//   //     // monacoInstance.setValue(this.props.codeObj.code);
//   //   })
//   // }
//
//   // 组件卸载后销毁编辑器
//   componentWillUnmount() {
//     monacoInstance.dispose();
//   }
//
//   render() {
//     return(
//       // <CodeMirror
//       //   value='<h1>I ♥ react-codemirror2</h1>'
//       //   options={{
//       //     mode: 'xml',
//       //     theme: 'material',
//       //     lineNumbers: true
//       //   }}
//       //   onChange={(editor, data, value) => {
//       //   }}
//       // />
//
//       <div id="container" style={{ width: '100%', height: '560px' }}></div>
//     )
//   }
// }
