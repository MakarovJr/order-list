<template>
  <div class="filters">
    <h3 class="filters__title">Filters</h3>
    <div class="filters__content">
      <InputText
        :label="'Invoice number'"
        :placeholder="'Enter value'"
        :inputValue="''"
        @changeValue="filterList"
      />
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import InputText from './InputText.vue';

export default {
  name: 'Filters',
  components: {
    InputText,
  },
  methods: {
    ...mapActions({
      filtration: 'filterList',
    }),
    filterList(params) {
      this.filtration({ paramFilter: params.value });
    },
  },
};
</script>

<style lang="scss">
@import "../styles/filters";
</style>
