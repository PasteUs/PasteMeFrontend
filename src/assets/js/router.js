import Vue from "vue"
import Router from "vue-router"
import Index from "../../views/Index";
// eslint-disable-next-line no-unused-vars
const emptyFunc = (arg) => {};
// warn if in developing env
// eslint-disable-next-line no-console
const warn = process.env.NODE_ENV !== "production" ? (console && console.warn || emptyFunc) : emptyFunc;
const originalPush = Router.prototype.push;
Router.prototype.push = function push(location, onResolve, onReject) {
    if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject);
    return originalPush.call(this, location).catch(warn);
};

Vue.use(Router);

export default new Router({
    mode: "history",
    base: "/",
    routes: [
        {
            path: "/:key(0{0}|[a-zA-Z0-9]{3,8})",
            name: "index",
            component: Index
        },
        {
            path: "/What_are_you_nong_sha_lei?",
            name: "NotFound",
            component: () => import(/* webpackChunkName: "not_found" */ "../../views/NotFound")
        },
        {
            path: "*",
            redirect: "/What_are_you_nong_sha_lei?"
        },
        /* TODO
        {
            path: "pasteme-admin",
            name: "pasteme-admin"
        },
         */
    ]
})
