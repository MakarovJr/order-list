<template>
  <th>
    <div :title="getMessageByKey(header.title)" @click="sorting">
      {{ getMessageByKey(header.title) }}<br />
    </div>
  </th>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'TableCustomHeader',

  props: {
    header: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      sortParams: {
        sortIdx: 0,
        sortValue: ['ascending', 'descending', 'nosort'],
      },
    };
  },
  methods: {
    ...mapActions(['sortList']),
    sorting() {
      console.log(this.sortParams.sortValue[this.sortParams.sortIdx]);
      this.sortList({
        paramSort: this.sortParams.sortValue[this.sortParams.sortIdx],
        field: 'orderNumber',
      });
      this.sortParams.sortIdx = this.sortParams.sortIdx < 2 ? this.sortParams.sortIdx + 1 : 0;
    },
  },
};
</script>
