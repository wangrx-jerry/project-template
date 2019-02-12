export default [
  {
    path: "/login",
    name: "login",
    component: () =>
      import(/* webpackChunkName: "news" */ "@/views/login/index.vue")
  }
];
