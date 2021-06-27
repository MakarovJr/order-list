<template>
  <td>
    {{item[header.key]}}<br/>
    (some custom cell logic)
  </td>
</template>

<script>
export default {
  name: 'TableCustomCell',

  props: {
    item: {
      type: Object,
      default() {
        return {};
      },
    },
    header: {
      type: Object,
      default() {
        return {};
      },
    },
  },
};
</script>
