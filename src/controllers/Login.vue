<template>
  <v-container fill-height>
    <v-layout align-center>
      <v-flex text-xs-center xs6 offset-xs3>
        <v-card>
          <div v-show="type === 'message'">
            <br/>
            Sign the following message to verify your address
            <v-chip label>{{ msg }}</v-chip>
          </div>
          <v-form>
            <v-text-field
              v-model.trim="address"
              label="Address"
              required
            ></v-text-field>
            <v-text-field
              v-model.trim="privKey"
              label="Wif/Private Key"
              type="password"
              required
              v-show="type === 'wif'"
            ></v-text-field>
            <v-textarea
              v-model.trim="signedMessage"
              label="Signed Message"
              required
              v-show="type === 'message'"
            ></v-textarea>
            <v-subheader v-show="type === 'message'">Or you can login by &nbsp;<a @click="changeType('wif')">address & wif</a>
            </v-subheader>
            <v-subheader v-show="type === 'wif'">Or you can login by &nbsp;<a @click="changeType('message')">address & signed message</a>
            </v-subheader>
            <v-btn color="primary" @click="submit">
              LOGIN
            </v-btn>
          </v-form>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import utils from '@/libs/utils';
  import qtumJs from 'qtumjs-lib';
  import bmessage from 'bitcoinjs-message';

  export default {
    name: 'Login',
    data() {
      return {
        msg: null,
        sid: null,
        type: 'message',
        address: '',
        signedMessage: '',
        privKey: '',
      };
    },
    methods: {
      changeType(type) {
        this.type = type;
      },
      signMessage() {
          const keyPair = qtumJs.ECPair.fromWIF(this.privKey);
          const res = bmessage.sign(this.msg, keyPair.d.toBuffer(32), keyPair.compressed, qtumJs.networks.qtum.messagePrefix);
          return res.toString('base64');
      },
      async submit() {
        if (!this.address) {
          alert('Address is required');
          return false;
        }
        let signedMessage;
        if (this.type === 'wif') {
          if (!this.privKey) {
            alert('Wif is required');
            return false;
          }
          try {
            signedMessage = this.signMessage();
          } catch (e) {
            alert('Wif cannot decode to private key');
            return false;
          }
        } else if (this.type === 'message') {
          if (!this.signedMessage) {
            alert('Signed message is required');
            return false;
          }
          signedMessage = this.signedMessage;
        }
        const res = await utils.postData('/api/passport/login', {
          address: this.address,
          signedMessage,
          sid: this.sid,
        });
        if (res) {
          this.$cookie.set('user', JSON.stringify(res));
          this.$router.push({ name: 'Index' });
        }
      },
    },
    async mounted() {
      const res = await utils.getData('/api/passport/nonce');
      this.msg = res.msg;
      this.sid = res.sid;
    },
  };
</script>
<style lang="stylus" scoped>
  form
    background #fff
    border-radius 5px
    padding 5px 15px
</style>
