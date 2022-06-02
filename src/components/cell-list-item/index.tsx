import './cell-list-item.scss';
import { Cell } from '../../state';
import CodeCell from '../code-cell';
import TextEditor from '../text-editor';
import ActionBar from '../action-bar';

interface CellListItemProps {
  cell: Cell;
}

const CellListItem: React.FC<CellListItemProps> = ({ cell }) => {
  let cellItem: JSX.Element;
  if (cell.type === 'code') {
    cellItem = (
      <>
        <div className="action-bar-wrapper">
          <ActionBar id={cell.id} />
        </div>
        <CodeCell cell={cell} />
      </>
    );
  } else {
    cellItem = (
      <>
        <TextEditor cell={cell} />
        <ActionBar id={cell.id} />
      </>
    );
  }

  return <div className="cell-list-item">{cellItem}</div>;
};

export default CellListItem;
