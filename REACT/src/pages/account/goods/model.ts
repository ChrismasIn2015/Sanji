import { AnyAction, Reducer } from 'redux';

import { EffectsCommandMap } from 'dva';
import { listStateType } from './data.d';
import { getGoodsList } from './service';



const Model: ModelType = {
  namespace: 'goodsList', // 名称

  state: {
    // 表格【更新后】的渲染数据 StateType: { list: listStateType<单元>[] }
    list: [],
  },

  effects: {
    // 异步处理
    *fetchReports({ payload }, { call, put }) {
      const response = yield call(getGoodsList, payload);
      yield put({
        type: 'getReports',
        payload: Array.isArray(response) ? response : [],
      });
    },
  },

  reducers: {
    // 同步处理
    getReports(state, action) {
      return {
        ...state,
        list: action.payload,
      };
    },
  },
};


export interface ModelType {
  // 限定 Model 的数据结构
  namespace: string; // 名称
  state: StateType; // 数据域
  effects: {
    // 异步处理
    fetchReports: Effect;
  };
  reducers: {
    // 同步处理
    getReports: Reducer<StateType>;
  };
}

export interface StateType {
  list: listStateType[];
}

export type Effect = (
  action: AnyAction,
  effects: EffectsCommandMap & { select: <T>(func: (state: StateType) => T) => T },
) => void;

export default Model;
