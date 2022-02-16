import produce from 'immer';
import { ActionType } from '../action-types';
import { Action } from '../actions';

interface BundlesState {
  [key: string]: {
    loading: boolean;
    success: boolean;
    code: string;
    message: string;
  };
}

const initialState: BundlesState = {};

const reducer = (state: BundlesState = initialState, action: Action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case ActionType.BUNDLE_START:
        draft[action.payload.cellId] = {
          loading: true,
          success: false,
          code: '',
          message: '',
        };
        return draft;

      case ActionType.BUNDLE_COMPLETE:
        draft[action.payload.cellId] = {
          loading: false,
          success: action.payload.bundle.success,
          code: action.payload.bundle.code,
          message: action.payload.bundle.message,
        };
        return draft;

      default:
        return draft;
    }
  });

export default reducer;
