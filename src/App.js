// import logo from './logo.svg';
import './App.css';
import {Card, Input, Row, Col, Button, List, Typography, message} from 'antd';
import {
  CloseCircleOutlined,
  CheckCircleOutlined,
} from '@ant-design/icons';

import React, {useState} from 'react';
import CodeEditor from "./components/codeEditor";
import './background';

const { Text } = Typography;
const { TextArea } = Input;
// import MonacoEditor from 'react-monaco-editor';

function App() {
  const [code, setCode] = useState("");
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
      args.map(arg => {
        arr.push({ text: arg, type: 'default' });
      })
    }
    log('arr', arr);

    function fn() {
      try {
        eval(code)
      } catch (e) {
        arr.push({ text: e.message, type: 'danger' })
      }
    }

    const result = fn();

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
        <Col xs={{span: 10}} lg={{span: 13}}>
          <Card title='Input' bordered={false}>
            <TextArea
              rows={14}
              placeholder="输入要运行的代码"
              onChange={onChange}
            />
            {/*<CodeEditor getProgramCode={getProgramCode.bind(this)}/>*/}
          </Card>
        </Col>
        <Col xs={{span: 11}} lg={{span: 11}}>
          <Card title='Output' bordered={false}>
            <List
              bordered
              dataSource={data}
              renderItem={(item) => {
                let {text, type} = item;
                const isDanger = type === 'danger';
                return (
                  <List.Item>
                    <List.Item.Meta
                      avatar={
                        isDanger ?
                        <CloseCircleOutlined style={{ color: 'red' }}/> :
                        <CheckCircleOutlined style={{ color: 'green' }}/>
                      }
                      title={ isDanger ? <Text type='danger'>{text}</Text> : JSON.stringify(text) }
                    />
                  </List.Item>
                )
              }}
            />
          </Card>
        </Col>
      </Row>
    </Card>
  );
}

export default App;
