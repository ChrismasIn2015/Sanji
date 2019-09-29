export interface listStateType {
  // 这个接口用于限定 商品表格的 一条渲染数据
  key: number;
  goodsId: number;
  goodsName: string;
  purchasePrice: number;
  offerPrice: number;
  goodsCount: number;
  goodsNorms: number;
  status: boolean;
  createdAt: string;
  updatedAt: string;
}
