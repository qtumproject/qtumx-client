<template>
  <div>
    <div>
      <v-btn color="green" dark @click="jumpTo('Chain/Launch')">Launch a new chain</v-btn>
    </div>
    <v-card>
      <v-data-table
        :headers="headers"
        :items="items"
        :pagination.sync="pagination"
        :total-items="totalItems"
        :loading="loading"
        hide-actions
      >
        <template slot="items" slot-scope="props">
          <td>{{ props.item.chainId }}</td>
          <td class="text-xs-left">
            {{ props.item.desc }}
          </td>
          <td class="text-xs-left">
            {{ props.item.msgHeader }}
          </td>
          <td class="text-xs-left">
            {{ props.item.defaultPort }}
          </td>
          <td class="text-xs-left">
            {{ props.item.createdBy }}
          </td>
          <td class="text-xs-left">
            {{ new Date(props.item.createdAt*1000).toString() }}
          </td>
          <td class="text-xs-right">
            <v-btn icon class="mx-0" @click="jumpToChain(props.item.chainId)">
              <v-icon color="blue">search</v-icon>
            </v-btn>
          </td>
        </template>
      </v-data-table>
      <div class="text-xs-center pt-2" v-show="pages > 1">
        <v-pagination v-model="pagination.page" :length="pages"></v-pagination>
      </div>
    </v-card>
  </div>
</template>

<script>
  import utils from '@/libs/utils';

  const PER_PAGE = 20;

  export default {
    name: 'Index',
    data() {
      return {
        headers: [
          { text: 'Chain Id', align: 'left', sortable: false },
          { text: 'Desc', sortable: false },
          { text: 'Message Header', sortable: false },
          { text: 'Default Port', sortable: false },
          { text: 'Created By', sortable: false },
          { text: 'Created At', sortable: false },
          { text: '', sortable: false },
        ],
        items: [],
        totalItems: 0,
        loading: false,
        pagination: {
          page: 1,
          rowsPerPage: PER_PAGE,
        },
        pages: 0,
      };
    },
    methods: {
      jumpTo(name) {
        this.$router.push({ name });
      },
      jumpToChain(chainId) {
        this.$router.push({ name: 'Chain/View', query: { chainId } });
      },
      async getChainList(start, length = PER_PAGE) {
        this.loading = true;
        const res = await utils.getData('/api/chain/list', { start, length });
        this.loading = false;
        this.pages = Math.ceil(res.total / PER_PAGE);
        this.items = res.list;
        this.totalItems = res.total;
      },
    },
    mounted() {
      this.getChainList(0);
    },
    watch: {
      pagination: {
        handler() {
          const { page } = this.pagination;
          this.getChainList((page - 1) * PER_PAGE);
        },
        deep: true,
      },
    },
  };
</script>

