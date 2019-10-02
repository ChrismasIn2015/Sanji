import { AnyAction, Reducer } from 'redux';

import { EffectsCommandMap } from 'dva';
import { CommunityType, MerchantType } from './data.d'
import { fakeRegister, getCommunities, getMerchantTypes, sendSMS } from './service';

export interface StateType {
  status?: 'ok' | 'error';
  currentAuthority?: 'user' | 'guest' | 'admin';
  communities?: CommunityType[];
  merchants?: MerchantType[]
}

export type Effect = (
  action: AnyAction,
  effects: EffectsCommandMap & { select: <T>(func: (state: StateType) => T) => T },
) => void;

export interface ModelType {
  namespace: string;
  state: StateType;
  effects: {
    submit: Effect;
    fetchCommunities: Effect;
    fetchMerchants: Effect;
    getCaptcha: Effect;
  };
  reducers: {
    registerHandle: Reducer<StateType>;
    setCommunityOptions: Reducer<StateType>;
    setMerchantOptions: Reducer<StateType>;
  };
}

const Model: ModelType = {
  namespace: 'userRegister',

  state: {
    status: undefined,
    communities: [],
    merchants: [],
  },

  effects: {
    *submit({ payload }, { call, put }) {
      const response = yield call(fakeRegister, payload);
      yield put({
        type: 'registerHandle',
        payload: response,
      });
    },
    *fetchCommunities(_, { call, put }) {
      const response = yield call(getCommunities);
      yield put({
        type: 'setCommunityOptions',
        payload: response.data,
      });
    },
    *fetchMerchants(_, { call, put }) {
      const response = yield call(getMerchantTypes);
      yield put({
        type: 'setMerchantOptions',
        payload: response.data,
      });
    },
    *getCaptcha({ payload }, { call }) {
      yield call(sendSMS, payload);
    },
  },

  reducers: {
    registerHandle(state, { payload }) {
      return {
        ...state,
        status: payload.success,
      };
    },
    setCommunityOptions(state, { payload }) {
      return {
        ...state,
        communities: payload,
      };
    },
    setMerchantOptions(state, { payload }) {
      return {
        ...state,
        merchants: payload,
      };
    },
  },
};

export default Model;
