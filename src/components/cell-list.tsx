import { useTypedSelector } from '../hooks/use-typed-selector';
import CellListItem from './cell-list-item';

const CellList: React.FC = () => {
  const cells = useTypedSelector(({ cells: { order, data } }) =>
    order.map((item) => data[item])
  );

  const cellsMap = () =>
    cells?.map((cell) => <CellListItem key={cell?.id} cell={cell} />);

  return <div>{cellsMap()}</div>;
};

export default CellList;
