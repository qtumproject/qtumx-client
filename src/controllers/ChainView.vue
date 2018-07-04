<template>
  <v-card class="view" v-if="chain">
    <v-card-title>
      <h1>View chain {{ chain.chainId }}</h1>
    </v-card-title>

    <v-container>
      <v-layout>
        <v-flex xs12>
          <h2>Basic Info</h2>
        </v-flex>
      </v-layout>
      <v-layout>
        <v-flex xs3>
          <h4>Created By</h4>
        </v-flex>
        <v-flex xs9>
          <p>{{ chain.createdBy }}</p>
        </v-flex>
      </v-layout>
      <v-layout>
        <v-flex xs3>
          <h4>Created At</h4>
        </v-flex>
        <v-flex xs9>
          <p>{{ new Date(chain.createdAt*1000).toString() }}</p>
        </v-flex>
      </v-layout>
      <v-layout>
        <v-flex xs3>
          <h4>Chain id</h4>
        </v-flex>
        <v-flex xs9>
          <p>{{ chain.chainId }}</p>
        </v-flex>
      </v-layout>
      <v-layout>
        <v-flex xs3>
          <h4>Token name</h4>
        </v-flex>
        <v-flex xs9>
          <p>{{ chain.tokenName }}</p>
        </v-flex>
      </v-layout>
      <v-layout>
        <v-flex xs3>
          <h4>Description</h4>
        </v-flex>
        <v-flex xs9>
          <p>{{ chain.description }}</p>
        </v-flex>
      </v-layout>
      <v-layout>
        <v-flex xs3>
          <h4>Message Header</h4>
        </v-flex>
        <v-flex xs9>
          <p>{{ chain.messageHeader }}</p>
        </v-flex>
      </v-layout>
      <v-layout>
        <v-flex xs12>
          <h2>Consensus</h2>
        </v-flex>
      </v-layout>
      <v-layout>
        <v-flex xs3>
          <h4>Algorithm</h4>
        </v-flex>
        <v-flex xs9>
          <p>PoA</p>
        </v-flex>
      </v-layout>
      <v-layout>
        <v-flex xs3>
          <h4>Miner list</h4>
        </v-flex>
        <v-flex xs9>
          <p>{{ chain.minerList }}</p>
        </v-flex>
      </v-layout>
      <v-layout>
        <v-flex xs3>
          <h4>Block interval</h4>
        </v-flex>
        <v-flex xs9>
          <p>{{ chain.blockInterval }}</p>
        </v-flex>
      </v-layout>
      <v-layout>
        <v-flex xs3>
          <h4>Timeout</h4>
        </v-flex>
        <v-flex xs9>
          <p>{{ chain.blockTimeout }}</p>
        </v-flex>
      </v-layout>
      <v-layout>
        <v-flex xs12>
          <h2>Seed Node</h2>
        </v-flex>
      </v-layout>
      <v-layout>
        <v-flex xs3>
          <h4>Default port</h4>
        </v-flex>
        <v-flex xs9>
          <p>{{ chain.defaultPort }}</p>
        </v-flex>
      </v-layout>
      <v-layout>
        <v-flex xs3>
          <h4>Dns seed</h4>
        </v-flex>
        <v-flex xs9>
          <p>{{ chain.dnsSeed }}&nbsp;</p>
        </v-flex>
      </v-layout>
      <v-layout>
        <v-flex xs3>
          <h4>Ip seed</h4>
        </v-flex>
        <v-flex xs9>
          <p>{{ chain.ipSeed }}&nbsp;</p>
        </v-flex>
      </v-layout>
      <v-layout>
        <v-flex xs12>
          <h2>Block Reward</h2>
        </v-flex>
      </v-layout>
      <v-layout>
        <v-flex xs3>
          <h4>Init Reward</h4>
        </v-flex>
        <v-flex xs9>
          <p>{{ chain.initReward }}</p>
        </v-flex>
      </v-layout>
      <v-layout>
        <v-flex xs3>
          <h4>Halving interval</h4>
        </v-flex>
        <v-flex xs9>
          <p>{{ chain.halvingInterval }}</p>
        </v-flex>
      </v-layout>
      <v-layout>
        <v-flex xs3>
          <h4>Halving times</h4>
        </v-flex>
        <v-flex xs9>
          <p>{{ chain.halvingTimes }}</p>
        </v-flex>
      </v-layout>
    </v-container>
  </v-card>
</template>

<script>
  import utils from '@/libs/utils';

  export default {
    data() {
      return {
        chain: null,
      };
    },
    methods: {
      async getChain(chainId) {
        const chain = await utils.getData('/api/chain/info', { chainId });
        if (!chain) {
          this.$router.push({ name: 'Index' });
        }
        this.chain = chain;
      },
    },
    async beforeMount() {
      const chainId = this.$router.currentRoute.query.chainId;
      if (!chainId) {
        this.$router.push({ name: 'Index' });
      } else {
        await this.getChain(chainId);
      }
    },
  };
</script>

<style lang="stylus" scoped>
  .view
    padding 20px
</style>
