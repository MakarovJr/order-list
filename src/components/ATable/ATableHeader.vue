<template>
  <tr class="a-header">
    <a-table-th
      :key="header.id"
      :header="header"
      :sortParams="sortParams"
      :sortParamsDefault="sortParamsDefault"
      @onChangeSort="onChangeSort"
      v-for="header in headers"
    ></a-table-th>
  </tr>
</template>

<script>
import ATableTh from './ATableTh';

export default {
  name: 'ATableHeader',

  components: {
    ATableTh,
  },

  props: {
    headers: {
      type: Array,
      default() {
        return [];
      },
    },
    sortParams: {
      type: Object,
      default() {
        return {};
      },
    },
    sortParamsDefault: {
      type: Object,
      default() {
        return {};
      },
    },
  },

  methods: {
    onChangeSort(data) {
      this.$emit('onChangeSort', data);
    },
  },
};
</script>
