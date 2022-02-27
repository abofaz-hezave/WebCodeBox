import { Cell } from '../state';
import { useTypedSelector } from './use-typed-selector';

export const useCumulativeCode = (cellId: string) => {
  return useTypedSelector((state) => {
    const { data, order } = state.cells;
    const orderedCells = order.map((id) => data[id]);
    const isCodeCell = (selectedCell: Cell) => selectedCell.type === 'code';
    const isCurrentCell = (selectedCell: Cell) => selectedCell.id === cellId;

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
      if (isCodeCell(cumulatingCell) && isCurrentCell(cumulatingCell))
        cumulativeCode.push(actionShow);

      if (isCodeCell(cumulatingCell))
        cumulativeCode.push(cumulatingCell.content);

      if (isCurrentCell(cumulatingCell)) break;
    }
    return cumulativeCode;
  })?.join('\n');
};
