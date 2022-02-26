import './code-cell.css';
import { useEffect } from 'react';
import CodeEditor from './code-editor';
import Preview from './preview';
import Resizable from './resizable';
import { Cell } from '../state';
import { useActions } from '../hooks/use-actions';
import { useTypedSelector } from '../hooks/use-typed-selector';

interface CodeCellProps {
  cell: Cell;
}

const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {
  const { updateCell, createBundle } = useActions();
  const bundle = useTypedSelector((state) => state.bundles[cell.id]);
  const cumulativeCode = useTypedSelector((state) => {
    const { data, order } = state.cells;
    const orderedCells = order.map((id) => data[id]);
    const isCodeCell = (selectedCell: Cell) => selectedCell.type === 'code';
    const isCurrentCell = (selectedCell: Cell) => selectedCell.id === cell.id;

    const actionShow = `
    import Cell_React from 'react';
    import Cell_ReactDOM from 'react-dom';

     show = (value) => {
      const root = document.querySelector('#root');
      if (typeof value !== 'object') return (root.innerHTML = value);
      if (value.$$typeof && value.props) return Cell_ReactDOM.render(value, root);
      return (root.innerHTML = JSON.stringify(value));
    };
    `;
    const cumulativeCode = ['let show = (value) => {}'];

    for (let cumulatingCell of orderedCells) {
      if (isCodeCell(cumulatingCell))
        cumulativeCode.push(cumulatingCell.content);

      if (isCodeCell(cumulatingCell) && isCurrentCell(cumulatingCell))
        cumulativeCode.push(actionShow);

      if (isCurrentCell(cumulatingCell)) break;
    }
    return cumulativeCode;
  });

  const getCumulativeCode = () => (cumulativeCode as any).join('\n');

  const createNewBundle = () => createBundle(cell.id, getCumulativeCode());

  useEffect(() => {
    if (!bundle) {
      createNewBundle();
      return;
    }
    const bundleTimer = setTimeout(async () => {
      createNewBundle();
    }, 1000);
    return () => {
      clearTimeout(bundleTimer);
    };
  }, [getCumulativeCode(), cell.id]);

  const bundleView = () => {
    if (!bundle || bundle.loading)
      return (
        <div className="progress-cover">
          <progress className="progress is-small is-primary">Loading</progress>
        </div>
      );

    return <Preview code={bundle.code} message={bundle.message} />;
  };

  return (
    <Resizable direction="vertical">
      <div
        style={{
          height: 'calc(100% - 10px)',
          display: 'flex',
          flexDirection: 'row',
        }}
      >
        <Resizable direction="horizontal">
          <CodeEditor
            onChange={(value) => updateCell(cell.id, value)}
            initialValue={cell.content}
          />
        </Resizable>
        <div className="bundle-view-wrapper">{bundleView()}</div>
      </div>
    </Resizable>
  );
};

export default CodeCell;
