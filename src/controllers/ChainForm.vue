<template>
  <v-card class="form">
    <v-card-title>
      <h1>Launch a new chain</h1>
    </v-card-title>
    <v-form v-model="valid">
      <h2>Basic</h2>
      <label>Chain id (only a-z 0-9 allowed) *</label>
      <v-text-field
        v-model="chainId"
        :rules="chainIdRules"
      ></v-text-field>
      <label>Token name (only A-Z 0-9 allowed) *</label>
      <v-text-field
        v-model="tokenName"
        :rules="tokenNameRules"
      ></v-text-field>
      <label>Description (recorded in genesis block) *</label>
      <v-text-field
        v-model="description"
        :rules="[this.fieldRequired]"
      ></v-text-field>
      <label>Message Header (4 bytes in hex format) *</label>
      <v-text-field
        v-model="messageHeader"
        :rules="messageHeaderRules"
      ></v-text-field>
      <h2>Consensus</h2>
      <label>Algorithm(only support PoA now) *</label>
      <v-select
        v-model="alg"
        :items="[{text: 'PoA', value: 'PoA'}]"
      ></v-select>
      <label>Miner list *</label>
      <v-text-field
        v-model="minerList"
        :rules="[this.fieldRequired]"
      ></v-text-field>
      <label>Block interval(an integer > 0) *</label>
      <v-text-field
        v-model="blockInterval"
        :rules="[this.fieldRequired,this.isPositiveInt]"
      ></v-text-field>
      <label>Timeout (an integer > 0) *</label>
      <v-text-field
        v-model="blockTimeout"
        :rules="[this.fieldRequired,this.isPositiveInt]"
      ></v-text-field>
      <h2>Seed Node</h2>
      <label>Default port *</label>
      <v-text-field
        v-model="defaultPort"
        :rules="[this.fieldRequired,this.isPositiveInt]"
      ></v-text-field>
      <label>Dns seed</label>
      <v-text-field
        v-model="dnsSeed"
      ></v-text-field>
      <label>Ip seed</label>
      <v-text-field
        v-model="ipSeed"
      ></v-text-field>
      <h2>Block Reward</h2>
      <label>Init Reward (an integer > 0) * </label>
      <v-text-field
        v-model="initReward"
        :rules="[this.fieldRequired,this.isPositiveInt]"
      ></v-text-field>
      <label>Halving interval (an integer > 0) * </label>
      <v-text-field
        v-model="halvingInterval"
        :rules="[this.fieldRequired,this.isPositiveInt]"
      ></v-text-field>
      <label>Halving times (an integer > 0) * </label>
      <v-text-field
        v-model="halvingTimes"
        :rules="[this.fieldRequired,this.isPositiveInt]"
      ></v-text-field>
    </v-form>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="success" @click="submit" :disabledx="!valid">Submit</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
  import utils from '@/libs/utils';

  export default {
    data() {
      return {
        valid: false,
        chainId: '',
        tokenName: '',
        description: '',
        messageHeader: '',
        alg: 'PoA',
        minerList: '',
        blockInterval: 10,
        blockTimeout: 5,
        defaultPort: '',
        dnsSeed: '',
        ipSeed: '',
        initReward: 2000000,
        halvingInterval: 15000,
        halvingTimes: 8,
        chainIdRules: [
          this.fieldRequired,
          v => /^[a-z0-9]+$/.test(v) || 'Chain id only a-z 0-9 allowed',
        ],
        tokenNameRules: [
          this.fieldRequired,
          v => /^[A-Z0-9]+$/.test(v) || 'Token name only A-Z 0-9 allowed',
        ],
        messageHeaderRules: [
          this.fieldRequired,
          v => /^[0-9a-fA-F]{8}$/.test(v) || 'Message header is 4 bytes in hex format',
        ],
      };
    },
    methods: {
      fieldRequired(v) {
        return !!v || 'This field is required';
      },
      isPositiveInt(v) {
        return /^[1-9][0-9]*$/.test(v) || 'This field must be a positive integer';
      },
      async submit() {
        const res = (await utils.postData('/api/chain/launch', {
          chainId: this.chainId,
          tokenName: this.tokenName,
          description: this.description,
          messageHeader: this.messageHeader,
          minerList: this.minerList,
          blockInterval: this.blockInterval,
          blockTimeout: this.blockTimeout,
          defaultPort: this.defaultPort,
          dnsSeed: this.dnsSeed,
          ipSeed: this.ipSeed,
          initReward: this.initReward,
          halvingInterval: this.halvingInterval,
          halvingTimes: this.halvingTimes,
        }));
        if (res && res.chainId) {
          this.$router.push({ name: 'Chain/View', query: { chainId: res.chainId } });
        }
      },
    },
    beforeMount() {
      const user = utils.getUser();
      if (user) {
        this.minerList = utils.getUser().address;
      } else {
        this.$router.push({ name: 'Login' });
      }
    },
  };
</script>

<style lang="stylus" scoped>
  .form
    padding 20px
</style>
