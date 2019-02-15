<template>
  <div class="home">
    <img alt="Vue logo" src="@/assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
    <router-link :to="{ name: 'login' }">login</router-link>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/other/HelloWorld.vue";

export default {
  name: "home",
  components: {
    HelloWorld
  },
  mounted() {
    this.axiosText();
  },
  methods: {
    axiosText() {
      console.log("axios>>>", this);
    }
  }
};
</script>
<style lang="scss" scoped></style>
