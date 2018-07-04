<template>
  <v-app>
    <Header/>
    <Content/>
  </v-app>
</template>

<script>
  import Header from '@/components/Header';
  import Content from '@/components/Content';
  import config from '@/libs/config';

  export default {
    name: 'App',
    components: {
      Header,
      Content,
    },
  };
</script>
