import { Fragment } from 'react';
import { useTypedSelector } from '../hooks/use-typed-selector';
import CellListItem from './cell-list-item';
import AddCell from './add-cell';

const CellList: React.FC = () => {
  const cells = useTypedSelector(({ cells: { order, data } }) =>
    order.map((item) => data[item])
  );

  const cellsMap = () =>
    cells?.map((cell) => (
      <Fragment key={cell?.id}>
        <AddCell previousCellId={cell.id} />
        <CellListItem cell={cell} />
      </Fragment>
    ));

  return (
    <div>
      <AddCell forceVisible={!cells?.length} previousCellId={null} />
      {cellsMap()}
    </div>
  );
};

export default CellList;
