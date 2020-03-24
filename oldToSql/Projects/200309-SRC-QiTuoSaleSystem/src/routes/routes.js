// 1.  导入变换组件
import index from "../views/Index";
import steelLog from "../views/steelLog";

// 2.  创建路由明细
const myRoutes = {
    // mode: "history",
    routes: [
        {
            path: "/",
            name: "index",
            component: index
        },
        {
            path: "/steelLog",
            name: "steelLog",
            component: steelLog
        }
    ]
};
export default myRoutes;
