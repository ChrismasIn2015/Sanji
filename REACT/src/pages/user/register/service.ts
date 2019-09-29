import request from '@/utils/request';
import { UserRegisterParams, SendValidateCodeParams } from './index';

export async function fakeRegister(params: UserRegisterParams) {
  return request('/api/auth/register', {
    method: 'POST',
    data: params,
  });
}

export async function getCommunities() {
  return request('/api/global/communities', {
    method: 'GET',
  });
}

export async function getMerchantTypes() {
  return request('/api/global/merchanttype', {
    method: 'GET',
  });
}

export async function sendSMS (params: SendValidateCodeParams) {
  return request('/api/Auth/SendValidateCode', {
    method: 'POST',
    data: params,
  })
}
