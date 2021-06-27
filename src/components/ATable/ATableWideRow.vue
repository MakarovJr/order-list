<template>
  <tr
    @mouseover="addExtRowHoverClass"
    @mouseleave="removeExtRowHoverClass"
    class="a-table-row-wide"
  >
    <td
      :colspan="headers.length"
      class="no-info"
      v-if="component"
    >
      <component
        :is="component"
        :extData="extData"
      ></component>
    </td>
  </tr>
</template>

<script>
export default {
  name: 'ATableWideRow',

  props: {
    component: {
      type: Object,
      default() {
        return null;
      },
    },
    extData: {
      type: Object,
      default() {
        return {};
      },
    },
    id: {
      type: [String, Number],
    },
    headers: {
      type: Array,
      default() {
        return [];
      },
    },
  },

  methods: {
    addExtRowHoverClass() {
      this.$emit('onChangeHovered', { id: this.id, hovered: true });
    },

    removeExtRowHoverClass() {
      this.$emit('onChangeHovered', { id: this.id, hovered: false });
    },
  },
};
</script>
