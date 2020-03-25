import Vue from "vue";
import VueRouter from "vue-router";
import index from "../views/index/index.vue";
// import library from "../views/library/library.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "index",
    component: index
  },
  {
    path: "/library",
    name: "library",
    // component: library
    component: () => import("../views/library/library.vue")
  }
];

const router = new VueRouter({
  routes
});

export default router;
