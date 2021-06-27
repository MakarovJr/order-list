<template>
  <tr
    :class="['a-table-row', {'hovered': hovered}]"
    @click.stop="actionClick(item)"
    @mouseleave="toggleRowHover(false)"
  >
    <a-table-td
      :key="header.id"
      :header="header"
      :item="item"
      :rowHovered="hovered"
      :toggleRowHover="toggleRowHover"
      v-for="header in headers"
    ></a-table-td>
  </tr>
</template>

<script>
import ATableTd from './ATableTd';

export default {
  name: 'ATableRow',

  components: {
    ATableTd,
  },

  props: {
    item: {
      type: Object,
      default: () => {},
    },
    headers: {
      type: Array,
      default: () => [],
    },
    actionClick: {
      type: Function,
      default() {},
    },
  },

  data() {
    return {
      hovered: false,
    };
  },

  methods: {
    toggleRowHover(flag) {
      this.hovered = flag || false;
    },
  },
};
</script>
