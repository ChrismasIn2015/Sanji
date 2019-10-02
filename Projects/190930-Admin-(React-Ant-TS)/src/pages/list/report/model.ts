import { AnyAction, Reducer } from 'redux';

import { EffectsCommandMap } from 'dva';
import { ReportType } from './data.d';
import { queryReports } from './service';

export interface StateType {
  list: ReportType[];
}

export type Effect = (
  action: AnyAction,
  effects: EffectsCommandMap & { select: <T>(func: (state: StateType) => T) => T },
) => void;

export interface ModelType {
  namespace: string;
  state: StateType;
  effects: {
    fetchReports: Effect;
  };
  reducers: {
    getReports: Reducer<StateType>;
  };
}

const Model: ModelType = {
  namespace: 'reportList',

  state: {
    list: [],
  },

  effects: {
    *fetchReports({ payload }, { call, put }) {
      const response = yield call(queryReports, payload);
      yield put({
        type: 'getReports',
        payload: Array.isArray(response) ? response : [],
      });
    },
  },

  reducers: {
    getReports(state, action) {
      return {
        ...state,
        list: action.payload,
      };
    },
  },
};

export default Model;
