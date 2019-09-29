import request from '@/utils/request';

export async function fakeSubmitForm(params: any) {
  return request('/api/forms', {
    method: 'POST',
    data: params,
  });
}

export async function getMerchantInfo() {
  return request('/api/Merchants/info', {
    method: 'GET',
  });
}
