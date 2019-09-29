import request from '@/utils/request';

export async function getGoodsList() { // 通过统一的request 访问到了mock里的GET
  return request('/api/getGoodsList', { method: 'GET', });
}
