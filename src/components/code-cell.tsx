import { useState, useEffect } from 'react';
import CodeEditor from './code-editor';
import Preview from './preview';
import Resizable from './resizable';
import bundle from '../bundler';

const CodeCell = () => {
  const [input, setInput] = useState('');
  const [code, setCode] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const bundleTimer = setTimeout(async () => {
      const output = await bundle(input);
      setCode(output.code);
      setMessage(output.message);
    }, 1000);
    return () => {
      clearTimeout(bundleTimer);
    };
  }, [input]);

  return (
    <Resizable direction="vertical">
      <div style={{ height: '100%', display: 'flex', flexDirection: 'row' }}>
        <Resizable direction="horizontal">
          <CodeEditor
            onChange={setInput}
            initialValue="import React from 'react';"
          />
        </Resizable>

        <Preview code={code} message={message} />
      </div>
    </Resizable>
  );
};

export default CodeCell;
