import "bulmaswatch/superhero/bulmaswatch.min.css";
import { useState } from 'react';
import ReactDOM from 'react-dom';
import CodeEditor from "./components/code-editor";
import Preview from "./components/preview";
import bundle from "./bundler";

const App = () => {
  const [input, setInput] = useState('');
  const [code, setCode] = useState('');




  const onClick = async () => {
    // console.log(0, input);

    const output = await bundle(input)
    // console.log(1, output);

    setCode(output)
  };



  return (
    <div>

      <CodeEditor
        onChange={setInput}
        initialValue="import React from 'react';" />
      <div>
        <button onClick={onClick}>Submit</button>
      </div>
      <Preview code={code} />
    </div>
  );
};

ReactDOM.render(<App />, document.querySelector('#root'));
