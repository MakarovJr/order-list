<template>
  <td>
    <div>
      <button
        :title="getMessageByKey('ext-panel')"
        @mouseover="toggleRowHover(true)"
      >
        ext-panel
      </button>
      <div v-if="rowHovered">
        rowHovered
      </div>
    </div>
  </td>
</template>

<script>
export default {
  name: 'TableCustomCellActions',

  props: {
    item: {
      type: Object,
      default() {
        return {};
      },
    },
    rowHovered: {
      type: Boolean,
      default: false,
    },
    toggleRowHover: {
      type: Function,
      default: () => null,
    },
  },
};
</script>
