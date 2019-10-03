import goodsDBjs from './goodsDB.js';
import cars from './userCar.js';
import ordersJS from './orders.js';


// 1.创建数据库内存/为了产生闭包我们直接执行这块内存
var myDB = function(){

    var userDB = [['admin','0']];// 保存用户数据
    var goodsDB = goodsDBjs;
    var userCar = cars(userDB);//保存每个用户的购物车数据
    var orders = ordersJS();//每个用户的订单数据
    
    return {
        //**********************************************************************返回库
        getUserDB(){//用户数据库
            return userDB;
        },
        getGoodsDB(){//商品数据库
            return goodsDB;
        },
        getCarDB(){//购物车操作库
            return userCar;
        },
        getOrdersDB(){//订单操作库
            return orders;
        },
        

        //**********************************************************************处理用户登录数据
        queryRepeatUser(user){//辅助函数:用户是否存在
            for(let i=0;i<userDB.length;i++){
                if(userDB[i][0]==user) return true;
            }
            return false;//不存在
        },
        addUser:function(user,password){// 增加用户(注册功能)
            if(this.queryRepeatUser(user))return '用户已存在';//禁止添加重复用户
            userDB[userDB.length] = [user,password]//用户库添加
            userCar.getCarDB()[user] = {};//购物车库添加
            return '注册成功'
        },
        examinePsw(user,password){// 验证密码（登录功能）
            let examine = this.queryRepeatUser(user);
            if(examine){//用户存在
                for(let i=0;i<userDB.length;i++){//匹配密码
                    if(userDB[i][0]==user){
                        if(userDB[i][1] == password) return ['登录成功',0];
                        else return ['密码错误',1]; } }
            }else return '用户不存在';
        },
        
        //**********************************************************************处理商品库/数据供给
        getItems(name){//获得某个分类下的所有商品信息
            return goodsDB[name];
        },
        getItem(name,good){//获得单品信息
            return goodsDB[name][good];
        },
        getGoods(){//获得完全分类数据
            return goodsDB;
        },
        get14Goods(num){//获得{}每个分类下的N个数据
            let count = 0;
            let temp1 = {};
            let temp2 = {};
            for(let key in goodsDB){
                for(let i in goodsDB[key]){
                    temp2[i] = goodsDB[key][i];//二级目录拷贝
                    count++;
                    if(count==num){
                        count=0;
                        break;
                    }
                }
                temp1[key]=temp2;//一级目录拷贝
                temp2={};
            }
            return temp1;
        },



    };//final return
}();

// 2.暴露数据库
export default myDB;