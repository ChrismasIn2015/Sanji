// 1.  导入变换组件
import login from "../views/login/login";
import index from "../views/Index";
import qrCode from "../views/qrCodes/qrCode";
import qrCodeCreate from "../views/qrCodes/qrCode-create";

// 2.  创建路由明细
const myRoutes = {
    mode: "history",
    routes: [
        {
            path: "/",
            name: "login",
            component: login
        },
        {
            path: "/index",
            name: "index",
            component: index
        },
        {
            path: "/qrCode",
            name: "qrCode",
            component: qrCode
        },
        {
            path: "/qrCodeCreate",
            name: "qrCodeCreate",
            component: qrCodeCreate
        }
    ]
};
export default myRoutes;
