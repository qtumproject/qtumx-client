<template>
  <div class="content">
    <div class="container-box">
      <router-view />
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Content',
    data() {
      return {};
    },
  };
</script>

<style lang="stylus" scoped>
  .content
    height 100%
    background-color #f5f6f8
    padding-top 64px
</style>
