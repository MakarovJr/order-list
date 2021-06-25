<template>
  <button class="add-btn" @click="openModal">
    <span class="add-btn-name">Добавить</span>
  </button>
</template>

<script>
import { MODAL_DISPLAY } from '../store/mutation-types';

export default {
  name: 'AddButton',
  methods: {
    openModal() {
      this.$store.commit(MODAL_DISPLAY, 'add');
    },
  },
};
</script>

<style lang="scss">
@import "../styles/add-button";
</style>
