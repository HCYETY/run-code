// import logo from './logo.svg';
import './App.css';
import { Card, Input, Row, Col, Button, List, Typography, message } from 'antd';
import React, { useState } from 'react';
import CodeEditor from "./codeEditor";
const { TextArea } = Input;
// import MonacoEditor from 'react-monaco-editor';

function App() {
  const [code, setCode] = useState("输入要运行的 JS 代码");
  const [data, setData] = useState([]);
  const editorDidMount = function (editor, monaco) {
    console.log('editorDidMount', editor);
    editor.focus();
  }
  const onChange = function (e) {
    setCode(e.target.value);
  }
  const options = {
    selectOnLineNumbers: true
  };

  // 获取子组件（代码编辑器）的 code
  const getProgramCode = (value) => {
    setCode(value);
  }

  const run = function () {
    let log = console.log;
    let arr = [];
    console.log = function (...args) {
      arr.push(args);
      log(...args);
    }
    log(arr);

    function fn() {
      return code;
    }
    const result = eval(fn());

    if (result) {
      arr.push(result);
    }
    setData(arr);
  }

  return (
    <Card
      title="Run code"
      style={{
        width: '800px',
      }}
      extra={<Button type='primary' onClick={run}>运行</Button>}
    >
      <Row gutter={16}>
        <Col xs={{ span: 13 }} lg={{ span: 13 }}>
          <Card title='Input' bordered={false}>
            <CodeEditor getProgramCode={getProgramCode.bind(this)}/>
          </Card>
          {/*<h3>Input</h3>*/}
        {/*<TextArea*/}
        {/*  rows={4}*/}
        {/*  placeholder="输入要运行的代码"*/}
        {/*  onChange={onChange}*/}
        {/*/>*/}
        </Col>
        {/*<Col xs={{ span: 2 }} lg={{ span: 2 }}>*/}
        {/*  <Button type='primary' onClick={run}>运行</Button>*/}
        {/*</Col>*/}
        <Col xs={{ span: 15}} lg={{ span: 6 }}>
          {/*<h3>Output</h3>*/}
          <Card title='Output' bordered={false}>
            <List
              bordered
              dataSource={data}
              renderItem={(item) => (
                <List.Item>
                  <Typography.Text mark>[ITEM]</Typography.Text> {item}
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>
    </Card>
  );
}

export default App;
