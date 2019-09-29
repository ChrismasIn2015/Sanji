const lists = [
  {
    key: 1,
    goodsId: 1,
    goodsName: '一颗小白菜',
    purchasePrice: 1,
    offerPrice: 1,
    goodsCount: 1,
    goodsNorms: 1,
    status: 1,
    createdAt: '2019-09-30  08:50:08',
    updatedAt: '2019-09-30  08:50:08',
  },
  {
    key: 2,
    goodsId: 2,
    goodsName: '一颗小白菜',
    purchasePrice: 1,
    offerPrice: 1,
    goodsCount: 1,
    goodsNorms: 1,
    status: 1,
    createdAt: '2019-09-30  08:50:08',
    updatedAt: '2019-09-30  08:50:08',
  },
  {
    key: 3,
    goodsId: 3,
    goodsName: '一颗小白菜',
    purchasePrice: 1,
    offerPrice: 1,
    goodsCount: 1,
    goodsNorms: 1,
    status: 0,
    createdAt: '2019-09-30  08:50:08',
    updatedAt: '2019-09-30  08:50:08',
  },
]

export default { // 如果请求这个GET 就返回lists
  'GET /api/getGoodsList': lists,
};
