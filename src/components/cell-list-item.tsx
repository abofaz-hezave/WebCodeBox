import './cell-list-item.css';
import { Cell } from '../state';
import CodeCell from './code-cell';
import TextEditor from './text-editor';
import ActionBar from './action-bar';

interface CellListItemProps {
  cell: Cell;
}

const CellListItem: React.FC<CellListItemProps> = ({ cell }) => {
  let cellItem: JSX.Element;
  if (cell.type === 'code') {
    cellItem = <CodeCell cell={cell} />;
  } else {
    cellItem = <TextEditor cell={cell} />;
  }

  return (
    <div className="cell-list-item">
      {cellItem}
      <ActionBar id={cell.id} />
    </div>
  );
};

export default CellListItem;
