<template>
  <div class="home">
    <img alt="Vue logo" src="@/assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
    <router-link :to="{ name: 'login' }">login</router-link>
    <div class="mixin">mixin style</div>
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
  data() {
    return {};
  },
  mounted() {
    this.axiosText();
  },
  methods: {
    axiosText() {}
  }
};
</script>
<style lang="scss" scoped>
.mixin {
  @include sexy-border(blue, 1px);
}
</style>
