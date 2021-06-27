export default {
  methods: {
    getMessageByKey(key) {
      return this.$root.messages[key] || key;
    },
  },
};
