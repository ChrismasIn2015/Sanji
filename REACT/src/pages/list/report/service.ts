import request from '@/utils/request';

export async function queryReports(params: { limit: number, skip: number }) {
  return request('/api/reports', {
    params,
  });
}
