
function orders(){

    let ordersDB = {};//用户的订单数据{user:【...】}
    ordersDB['admin']=[];

    return {
        changeState(userName,index,stateNum){//改变订单状态
            if(userName=="")return false;
            switch(stateNum){
                case 0:{ordersDB[userName][index][1][4]=3;break;}
                // case 1:{ordersDB[userName][index][1][4]=3;break;}
            }
        },
        delOrder(userName,index){//删除某条数据-长度改变
            if(userName=="")return false;
            ordersDB[userName].splice(index,1); //arr.splice(2,1,"")用""替换2,删除之后的1个元素
        },
        addOrder(userName,orders){//添加订单数据orders = [['单品名称',[价格/图片/数量/分类/状态],....]
            for(let i=0;i<orders.length;i++){
                // window.console.log(orders[i]);
                orders[i][1][4]=0;
                ordersDB[userName].push(orders[i]);//在数组最末尾添加
            }
        },
        queryOrders(userName){
            return ordersDB[userName];//普通用户
        },
        getOrders(){//返回所有用户订单
            return ordersDB;
        },
    }
}
export default orders;