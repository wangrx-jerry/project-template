<template>
  <button class="cc-button cc-button-primary">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: "search",
  data() {
    return {
      test: "this is test mes"
    };
  }
};
</script>

<style lang="scss" scoped>
.cc-button {
  color: green;
}
</style>
