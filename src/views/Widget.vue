<template>
  <div class="widget">
    <template v-if="orderList === null || orderList.length === 0">
      <div class="widget__empty">Список пуст</div>
    </template>
    <template v-else>
      <ul class="widget__list">
        <li
          class="widget__list-item"
          v-for="(order, idx) in orderList"
          :key="idx"
        >
          <Card :title="`Card ${idx + 1}`" :orderItem="order"/>
        </li>
      </ul>
    </template>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Card from '../components/Card.vue';

export default {
  name: 'Widget',
  components: {
    Card,
  },
  computed: {
    ...mapGetters(['orderList']),
  },
};
</script>

<style lang="scss">
@import "../styles/widget";
</style>
