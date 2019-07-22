<template>
  <div class="menu">
    <header class="tc">
      <h3 class="green">衣链</h3>
      {{ util.getDate() }}
    </header>
    <main>
      <div class="login-form auto">
        <el-input
          class="mb10"
          placeholder="登陆人"
          v-model="loginForm.userName"
          @keyup.enter.native="onSubmit"
        ></el-input>
        <el-input
          class="mb10"
          placeholder="密码"
          type="password"
          v-model="loginForm.passWord"
          @keyup.enter.native="onSubmit"
        ></el-input>
        <el-button
          type="primary"
          @click="onSubmit"
          @keyup.enter.native="onSubmit"
          >登陆</el-button
        >
      </div>
      <section class="tc">
        <el-button type="primary" size="mini" @click="quickLogin('sheji1')"
          >sheji1</el-button
        >
        <el-button type="primary" size="mini" @click="quickLogin('zjmy')"
          >zjmy</el-button
        >
        <el-button type="primary" size="mini" @click="quickLogin('gylmy')"
          >gylmy</el-button
        >
        <el-button
          type="primary"
          size="mini"
          @click="quickLogin('ppqfcymyadmin')"
          >ppqfcymyadmin</el-button
        >
        <el-button type="primary" size="mini" @click="quickLogin('gylwxmy')"
          >gylwxmy</el-button
        >
        <el-button type="primary" size="mini" @click="quickLogin('gylgs')"
          >gylgs</el-button
        >
        <el-button type="primary" size="mini" @click="quickLogin('ppmy')"
          >ppmy</el-button
        >
      </section>
    </main>
  </div>
</template>
<script>
export default {
  data() {
    return {
      loginForm: {
        userName: "sheji1", // 用户名
        passWord: "191919", //密码：要把原始密码转成md5值
        captcha: "" // 验证码（留空）
      }
    };
  },
  created() {},

  methods: {
    onSubmit() {
      let data = {
        UserNo: this.loginForm.userName,
        Pwd: "",
        // Pwd: MD5(this.loginForm.passWord),
        VerifyCode: this.loginForm.captcha
      };
      this.axios({
        url: "api/Login/LoginAction",
        method: "post",
        data
      })
        .then(result => {
          console.log("re>>>", result);
          //   this.$setSessionStorageByName("user", result.Data);
          //   this.$message({
          //     type: "success",
          //     showClose: true,
          //     message: "登陆成功",
          //     duration: 800,
          //     onClose: () => {
          //       this.$router.push({
          //         name: "menu"
          //       });
          //     }
          //   });
        })
        .catch(() => {});
    },
    quickLogin(name) {
      this.loginForm.userName = name;
      this.onSubmit();
    }
  },
  watch: {},
  components: {}
};
</script>
<style scoped lang="scss">
.menu {
  header {
    padding: 30px 0 40px;
  }
  main {
    .login-form {
      width: 300px;
      padding-bottom: 30px;
      .el-input {
        width: 100%;
      }
      .el-button {
        width: 100%;
      }
    }
  }
}
</style>
