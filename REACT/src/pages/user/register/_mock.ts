import { Request, Response } from 'express';

const communities = [{ id: 1, name: '1号小区' }, { id: 2, name: '2号小区' }, { id: 3, name: '3号小区' }]

const merchanttype = [{ type: 1, name: '餐饮美食' }, { type: 2, name: '蔬菜水果' }, { type: 3, name: '医药' }]

export default {
  'POST  /api/register': (_: Request, res: Response) => {
    res.send({ status: 'ok', currentAuthority: 'user' });
  },
  'GET  /api/global/communities': (_: Request, res: Response) => {
    res.send({ success: true, data: communities });
  },
  'GET  /api/global/merchanttype': (_: Request, res: Response) => {
    res.send({ success: true, data: merchanttype });
  },
};
