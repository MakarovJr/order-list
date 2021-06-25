<template>
  <div class="table__item">
    <template v-for="order in orderItem">
      <div class="table__item-cell" :key="order.id">{{ order }}</div>
    </template>
    <div class="table-settings">
      <button class="table-settings__btn" @click="changeSeen">
        <span class="table-settings__btn-icon"/>
      </button>
      <ul class="table-settings__list" v-if="seen">
        <li class="table-settings__item">
          <button
            class="table-settings__item-btn table-settings__item-btn_edit"
            @click="editItem(orderItem)"
          >
            <span
              class="table-settings__item-btn-icon table-settings__item-btn-icon_edit"
            />
          </button>
        </li>
        <li class="table-settings__item">
          <button
            class="table-settings__item-btn table-settings__item-btn_remove"
            @click="rmItem(orderItem)"
          >
            <span
              class="
                table-settings__item-btn-icon
                table-settings__item-btn-icon_remove
              "
            />
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import { MODAL_DISPLAY } from '../store/mutation-types';

export default {
  name: 'TableItem',
  props: ['orderItem'],
  data() {
    return {
      seen: false,
    };
  },
  methods: {
    ...mapActions(['removeItem']),
    changeSeen() {
      this.seen = !this.seen;
    },
    editItem(order) {
      this.$store.commit(MODAL_DISPLAY, order);
      this.changeSeen();
    },
    rmItem(order) {
      this.removeItem(order.id);
      this.changeSeen();
    },
    onClickOutside() {
      this.seen = false;
    },
  },
};
</script>

<style lang="scss">
@import "../styles/my-table";
</style>
