<template>
  <div>
    <v-toolbar color="grey darken-3" dark fixed>
      <v-toolbar-title @click="jumpTo('Index')">QTUMX</v-toolbar-title>
      <v-subheader>One Click One Chain</v-subheader>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn flat href="https://github.com/qtumproject/qtum-enterprise/releases" target="_blank">Download</v-btn>
        <v-btn flat href="https://docs.qtum.org/zh/One-Click-Launch-Chain/" target="_blank">Document(Chinese)</v-btn>
        <v-btn flat href="mailto:x@qtum.org" target="_blank">Email</v-btn>
        <template v-if="user">
          <!--v-subheader>Hello, {{ user.address }}</v-subheader-->
          <v-btn flat color="red" @click="logout">Logout</v-btn>
        </template>
        <template v-else>
          <v-btn flat @click="jumpTo('Login')" color="green">Login</v-btn>
        </template>
      </v-toolbar-items>
    </v-toolbar>
  </div>
</template>

<script>
  import utils from '@/libs/utils';

  export default {
    name: 'Header',
    data() {
      return {
        user: utils.getUser(),
      };
    },
    methods: {
      jumpTo(name) {
        this.$router.push({ name });
      },
      logout() {
        this.$cookie.delete('user');
        this.user = utils.getUser();
        this.$router.replace({ name: 'Index' });
      },
    },
    watch: {
      $route(to, from) {
        this.user = utils.getUser();
      },
    },
  };
</script>
