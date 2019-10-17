import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import(/* webpackChunkName: "home" */ "./views/Home.vue")
    },
    {
      path: "/add",
      name: "add",
      component: () =>
        import(/* webpackChunkName: "home" */ "./views/AddPage.vue")
    }
  ]
});
