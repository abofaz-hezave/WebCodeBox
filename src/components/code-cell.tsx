import { useState, useEffect } from 'react';
import CodeEditor from './code-editor';
import Preview from './preview';
import Resizable from './resizable';
import bundle from '../bundler';
import { Cell } from '../state';
import { useActions } from '../hooks/use-actions';

interface CodeCellProps {
  cell: Cell;
}

const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {
  const { updateCell } = useActions();
  const [code, setCode] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const bundleTimer = setTimeout(async () => {
      const output = await bundle(cell.content);
      setCode(output.code);
      setMessage(output.message);
    }, 1000);
    return () => {
      clearTimeout(bundleTimer);
    };
  }, [cell.content]);

  return (
    <Resizable direction="vertical">
      <div style={{ height: '100%', display: 'flex', flexDirection: 'row' }}>
        <Resizable direction="horizontal">
          <CodeEditor
            onChange={(value) => updateCell(cell.id, value)}
            initialValue={cell.content}
          />
        </Resizable>

        <Preview code={code} message={message} />
      </div>
    </Resizable>
  );
};

export default CodeCell;
