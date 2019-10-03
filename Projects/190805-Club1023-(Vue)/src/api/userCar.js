

function userCar(){

    let carDB = {};//用来保存用户的购物车数据{user:{...}}
    carDB['admin']={};
    return {
        getCarDB(){//返回整个购物车数据库
            return carDB;
        },
        queryUserCar:function(userName){//返回某用户的购物车数据-渲染页面
            return carDB[userName];
        },
        addItem:function(userName,goodName,arr){//添加一条购物数据//需要商品名称/【价格/图片】数组
            // window.console.log(carDB[userName])
            // window.console.log(carDB)
            if(carDB[userName].hasOwnProperty(goodName)){//如果有添加的商品已存在,数量+1 
                // window.console.log('4 - 商品存在 数量+1 此时的数据库↓')
                // window.console.log(carDB)
                carDB[userName][goodName][2]++;
                return true;
            }
            
            // window.console.log('4 - 商品不存在 数量=1 此时的数据库↓')
            // window.console.log(carDB)
            carDB[userName][goodName] = [];
            carDB[userName][goodName][0] = arr[0];//价格
            carDB[userName][goodName][1] = arr[1];//图片
            carDB[userName][goodName][2] = 1;
            carDB[userName][goodName][3] = arr[2]
            return true;
        },
        delItem:function(userName,goodName){//删除一条购物数据
            if(carDB[userName][goodName][2]==1){//检查目前数量，如果数量为1，就返回空
                delete carDB[userName][goodName];
                return true;
            }
            //商品数量-1
            carDB[userName][goodName][2]--;
            return true;
        },
        delOrderItem:function(userName,goodName){//删除指定用户/单品名购物车数据
            delete carDB[userName][goodName];
        },
    }
}
export default userCar;