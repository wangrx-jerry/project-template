export default [
  {
    path: "/",
    name: "home",
    component: () => import(/* webpackChunkName: "news" */ "@/views/home")
  }
];
