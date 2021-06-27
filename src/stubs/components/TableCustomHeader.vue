<template>
  <th>
    <div :title="getMessageByKey(header.title)">
      {{getMessageByKey(header.title)}}<br/>
      (some custom logic)
    </div>
  </th>
</template>

<script>
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
};
</script>
