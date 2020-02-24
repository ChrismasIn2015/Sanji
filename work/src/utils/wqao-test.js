/*
    2020/02/22 17:02
    wqao-test 用于在开发/测试/生产环境下在控制台打印指定的测试语句
*/

export class WqaoTest {
    // 变量
    LOG_SWITCH = false;

    // 构造函数
    constructor(logState) {
        this.LOG_SWITCH = logState ? true : false;
        console.log("wqao-test is running ?", this.LOG_SWITCH);
    }

    // 打印语句
    log(...statement) {
        console.log("run", this.LOG_SWITCH);
        if (this.LOG_SWITCH) {
            console.log(...statement);
        }
    }
}
