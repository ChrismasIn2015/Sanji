/**
 * 这是商品库，主要使用了一个Map存储了板/卷商品，使用Id作为对应Key键
 *
 */
import { getYYMMDD } from "../wqao/wqao-utils";

export class SteelDB {
    // 商品存储
    idCount = -1;
    steelMap = {};
    inList = []; // 入库记录
    outList = []; // 出库记录

    // 构造函数
    constructor() {
        console.log("商品库初始化成功 目前商品Id", this.idCount);
    }

    // 商品入库
    steelAdd(Steel) {
        let id = this.idCount + 1;
        // 商品存储
        this.steelMap[id] = JSON.parse(JSON.stringify(Steel.getInfo()));
        // 入库记录添加
        let info = Steel.getInfo();
        info["time"] = getYYMMDD(new Date().getTime());
        this.inList.push(info);
        //
        this.idCount++;
        console.log("入库成功 目前商品Id", this.idCount);
        window.alert("入库成功！");
    }
    // 商品出库
    steelSale(id, outSteel) {
        // 商品减少
        if (this.steelMap[id]) {
            // 判断是否售尽
            let sellOut =
                // this.steelMap[id].steelLength <= outSteel.steelLength ||
                // this.steelMap[id].steelWidth <= outSteel.steelWidth ||
                this.steelMap[id].count <= outSteel.count ||
                this.steelMap[id].weight <= outSteel.weight;
            if (sellOut) {
                let response = window.confirm("你确定售尽这批商品吗？");
                if (!response) return;
            }
            this.steelMap[id].count -= outSteel.count;
            this.steelMap[id].weight -= outSteel.weight;
            // 出库记录添加
            let info = outSteel.getInfo();
            info["time"] = getYYMMDD(new Date().getTime());
            this.outList.push(info);
            // 删除
            if (sellOut) delete this.steelMap[id];
            window.alert("出库成功！");
        } else {
            window.alert("商品不存在");
        }
        // // 入库记录添加
    }
    // 删除一条商品库存
    steelDelete(id) {
        let response = window.confirm("您确定要删除该商品吗？这个操作不会进行出入库记录");
        if (!response) return;
        if (this.steelMap[id]) {
            delete this.steelMap[id];
        } else {
            window.alert("不存在该商品");
        }
    }

    // *********************************************************************************
    // 获取商品列表
    getSteelMap() {
        let map = JSON.parse(JSON.stringify(this.steelMap));
        console.log("取得库存", map);
        return map;
    }
    // 获取入库记录列表
    getInList() {
        let list = JSON.parse(JSON.stringify(this.inList));
        console.log("取得入库记录", list);
        return list;
    }
    // 获取出库记录列表
    getOutList() {
        let list = JSON.parse(JSON.stringify(this.outList));
        console.log("取得出库记录", list);
        return list;
    }
}

// *********************************************************************************
// 商品-钢材
export class Steel {
    // 商品基本信息
    steelType = 0; // 0 板 1 卷
    steelName = "";
    steelLength = 0;
    steelWidth = 0;
    steelHeight = 0;
    // 库存信息
    count = 0;
    weight = 0;
    price = 0;

    // 构造函数
    constructor(steelType, steelName, steelLength, steelWidth, steelHeight, count, weight, price) {
        this.steelType = steelType; // 0 板 1 卷
        this.steelName = steelName;
        this.steelLength = steelLength;
        this.steelWidth = steelWidth;
        this.steelHeight = steelHeight;
        this.count = count;
        this.weight = weight;
        this.price = price;
    }

    // 获得这个商品的基本信息
    getInfo() {
        return {
            steelType: this.steelType,
            steelName: this.steelName,
            steelLength: this.steelLength,
            steelWidth: this.steelWidth,
            steelHeight: this.steelHeight,
            count: this.count,
            weight: this.weight,
            price: this.price
        };
    }
    // 返回这个商品的入库信息
    getInfo_In(count, weight, cost) {
        return {
            steelType: this.steelType,
            steelName: this.steelName,
            steelLength: this.steelLength,
            steelWidth: this.steelWidth,
            steelHeight: this.steelHeight,
            //
            count: count,
            weight: weight,
            cost: cost
        };
    }
    // 返回这个商品的出库信息
    getInfo_Out(count, weight, income) {
        return {
            steelType: this.steelType,
            steelName: this.steelName,
            steelLength: this.steelLength,
            steelWidth: this.steelWidth,
            steelHeight: this.steelHeight,
            //
            count: count,
            weight: weight,
            income: income,
            time: getYYMMDD(new Date().getTime())
        };
    }
}
