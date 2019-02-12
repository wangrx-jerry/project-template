export default [
  {
    path: "/about",
    name: "about",
    component: () => import(/* webpackChunkName: "news" */ "@/views/About.vue")
  }
];
