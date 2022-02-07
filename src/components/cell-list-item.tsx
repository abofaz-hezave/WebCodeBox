import { Cell } from '../state';
import CodeCell from './code-cell';
import TextEditor from './text-editor';

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

  return <div>{cellItem}</div>;
};

export default CellListItem;
