import produce from 'immer';
import { ActionType } from '../action-types';
import { Action } from '../actions';
import { Cell } from '../cell';
import { randomId } from '../../utils';

interface CellsState {
  loading: boolean;
  error: string | null;
  order: string[];
  data: {
    [key: string]: Cell;
  };
}

const initialState: CellsState = {
  loading: false,
  error: null,
  order: [],
  data: {},
};

const reducer = (state: CellsState = initialState, action: Action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case ActionType.MOVE_CELL:
        const { direction, id } = action.payload;
        const index = draft.order.findIndex((item) => item === id);
        const targetIndex = direction === 'up' ? index - 1 : index + 1;
        if (targetIndex < 0) return draft;
        if (targetIndex > draft?.order?.length - 1) return draft;
        draft.order[index] = draft?.order?.[targetIndex];
        draft.order[targetIndex] = id;
        return draft;

      case ActionType.DELETE_CELL:
        delete draft.data[action.payload];
        draft.order = draft.order.filter((item) => item !== action.payload);
        return draft;

      case ActionType.UPDATE_CELL:
        draft.data[action.payload.id].content = action.payload.content;
        return draft;

      case ActionType.INSERT_CELL_AFTER:
        const cell: Cell = {
          content: '',
          type: action.payload.type,
          id: randomId(),
        };
        const foundIndex = draft.order.findIndex(
          (item) => item === action.payload.id
        );

        draft.data[cell.id] = cell;
        if (foundIndex < 0) {
          draft.order.unshift(cell.id);
        } else {
          draft.order.splice(foundIndex + 1, 0, cell.id);
        }

        return draft;

      default:
        return draft;
    }
  });

export default reducer;
