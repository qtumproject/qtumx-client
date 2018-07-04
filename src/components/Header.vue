<template>
  <div>
    <v-toolbar color="grey darken-3" dark fixed>
      <v-toolbar-title @click="jumpTo('Index')">QTUMX </v-toolbar-title>
      <v-subheader>One Click Launch Chain</v-subheader>
      <v-spacer></v-spacer>
      <template v-if="user">
        <v-subheader>Hello, {{ user.address }}</v-subheader>
        <v-btn color="red" @click="logout">Logout</v-btn>
      </template>
      <template v-else>
        <v-btn color="primary" @click="jumpTo('Login')">Login</v-btn>
      </template>
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
