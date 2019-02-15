import Vue from "vue";
import ElementUI from "element-ui";
import axios from "axios";
import store from "../store/vuex";
import router from "../router";

let service = axios.create({
  baseURL: window.location.protocol + "//" + window.location.host + "/",
  timeout: 60000,
  contentType: "application/json"
});

let loading = null,
  setTime = null,
  tid = null,
  delay = 50,
  options = {
    lock: true,
    text: "加载中～",
    background: "rgba(0, 0, 0, 0.7)"
  };

service.interceptors.request.use(config => {
  if (store.state.global.useGlobalAxios) {
    clearTimeout(setTime);
    clearTimeout(tid);
    // 请求时间如果在500毫秒内则不需要显示loading
    setTime = setTimeout(() => {
      loading = ElementUI.Loading.service(options);
    }, delay * 10);
  }
  return config;
});

service.interceptors.response.use(
  response => {
    // 保证200毫秒内发起再次发起请求不会关闭loading
    tid = setTimeout(() => {
      clearTimeout(setTime);
      loading && loading.close();
    }, 200);
    try {
      //使用try catch是因为：后台服务器挂掉返回的并不是一个object并不能正确捕捉到错误信息
      if (response.data && response.data.Code !== 0) {
        ElementUI.Message({
          message: response.data.Message,
          type: "warning",
          showClose: true
        });
      }
    } catch (e) {
      console.log(e);
    }
    return response.data;
  },
  error => {
    // 保证200毫秒内发起再次发起请求不会关闭loading
    tid = setTimeout(() => {
      clearTimeout(setTime);
      loading && loading.close();
    }, 200);
    try {
      if (/Network Error|504/.test(error.message)) {
        //网络错误/504
        ElementUI.Message({
          message: "暂无网络连接，请连接后重新尝试",
          type: "warning",
          showClose: true
        });
        //待完成： 这里写一个断网的组件
        return;
      }
      if (error.response.data.Code !== 0) {
        let msg =
          typeof error.response.data === "string"
            ? error.response.data
            : error.response.data.Message;
        if (msg !== "对不起,您没有配置权限菜单！") {
          //有疑问
          ElementUI.Message({
            message: msg,
            type: "warning",
            showClose: true
          });
        }
      }
      // 请求授权失败则重新跳转到登陆页
      if (error.response.data.Code === 401) {
        setTimeout(() => {
          debugger;
          let env = process.env.NODE_ENV;
          if (env === "development") {
            router.push({
              name: "login"
            });
          } else {
            window.location.href =
              "http://" + window.location.host + "/Login.html";
          }
        }, 2000);
      }
    } catch (e) {
      console.log(e);
    }
    return Promise.reject(error);
  }
);
Vue.prototype.axios = service;
