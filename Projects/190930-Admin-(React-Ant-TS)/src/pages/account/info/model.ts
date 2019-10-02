import { AnyAction, Reducer } from 'redux';
import { EffectsCommandMap } from 'dva';
import { message } from 'antd';
import { fakeSubmitForm, getMerchantInfo } from './service';
import { MerchantInfo } from './data.d';

export interface StateType {
  merchant: MerchantInfo;
}

export type Effect = (
  action: AnyAction,
  effects: EffectsCommandMap & { select: <T>(func: (state: {}) => T) => T },
) => void;

export interface ModelType {
  namespace: string;
  state: StateType;
  effects: {
    submitAdvancedForm: Effect;
    fetchMerchantInfo: Effect;
  };
  reducers: {
    saveMerchantInfo: Reducer<StateType>
  }
}

const Model: ModelType = {
  namespace: 'merchantInfo',

  state: {
    merchant: {},
  },

  effects: {
    *submitAdvancedForm({ payload }, { call }) {
      yield call(fakeSubmitForm, payload);
      message.success('提交成功');
    },
    *fetchMerchantInfo(_, { call, put }) {
      // const response = yield select(state => state.user);
      const response = yield call(getMerchantInfo)
      yield put({
        type: 'saveMerchantInfo',
        payload: response,
      })
    },
  },

  reducers: {
    saveMerchantInfo(state, action) {
      return {
        ...state,
        merchant: action.payload.data,
      };
    },
  },
};

export default Model;
