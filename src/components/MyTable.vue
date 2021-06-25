<template>
  <div class="table">
    <template v-if="orderList === null || orderList.length === 0">
      <div class="table__empty">Список пуст</div>
    </template>
    <template v-else>
      <div class="table__header">
        <div class="table__header-title">ID</div>
        <div class="table__header-title">Номер накладной</div>
        <div class="table__header-title">Тип заказа</div>
        <div class="table__header-title">Дата создания</div>
        <div class="table__header-title"></div>
      </div>
      <template v-for="(order, idx) in orderList" :key="idx">
        <TableItem :orderItem="order" />
      </template>
    </template>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import TableItem from './TableItem.vue';

export default {
  name: 'Table',
  components: {
    TableItem,
  },
  computed: {
    ...mapGetters(['orderList']),
  },
};
</script>

<style lang="scss">
@import "../styles/table";
</style>
