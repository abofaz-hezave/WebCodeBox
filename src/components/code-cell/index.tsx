import './code-cell.scss';
import { useEffect } from 'react';
import CodeEditor from '../code-editor';
import Preview from '../preview';
import Resizable from '../resizable';
import { Cell } from '../../state';
import { useActions } from '../../hooks/use-actions';
import { useTypedSelector } from '../../hooks/use-typed-selector';
import { useCumulativeCode } from '../../hooks/use-cumulative-code';

interface CodeCellProps {
  cell: Cell;
}

const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {
  const { updateCell, createBundle } = useActions();
  const bundle = useTypedSelector((state) => state.bundles[cell.id]);
  const cumulativeCode = useCumulativeCode(cell.id);

  const createNewBundle = () => createBundle(cell.id, cumulativeCode);

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
  }, [cumulativeCode, cell.id]);

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
