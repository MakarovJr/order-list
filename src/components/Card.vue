<template>
  <div class="card">
    <div class="card__header">
      <h3 class="card__header-title">{{ title }}</h3>
      <div class="card__settings">
        <button class="card__settings-btn" @click="showSettings" v-click-outside="onClickOutside">
          <span class="card__settings-btn-icon" />
        </button>
        <ul class="card__settings-list" v-if="seen">
          <li class="card__settings-item">
            <button class="card__settings-item-btn" @click="editItem(orderItem)">
              <span
                class="
                  card__settings-item-btn-icon card__settings-item-btn-icon_edit
                "
              />
              редактировать
            </button>
          </li>
          <li class="card__settings-item">
            <button class="card__settings-item-btn" @click="rmItem(orderItem)">
              <span
                class="
                  card__settings-item-btn-icon
                  card__settings-item-btn-icon_remove
                "
              />
              удалить
            </button>
          </li>
        </ul>
      </div>
    </div>
    <div class="card__content">
      <ul class="card__content-list">
        <li
          class="card__content-item"
          v-for="order in orderItem"
          :key="order.id"
        >
          {{ order }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import ClickOutside from 'vue-click-outside';
import { mapActions } from 'vuex';
import { MODAL_DISPLAY } from '../store/mutation-types';

export default {
  name: 'Card',
  props: ['title', 'orderItem'],
  data() {
    return {
      seen: false,
    };
  },
  directives: {
    ClickOutside,
  },
  methods: {
    ...mapActions(['removeItem']),
    showSettings() {
      this.seen = !this.seen;
    },
    editItem(order) {
      this.$store.commit(MODAL_DISPLAY, order);
      this.showSettings();
    },
    rmItem(order) {
      this.removeItem(order.id);
      this.showSettings();
    },
    onClickOutside() {
      this.seen = false;
    },
  },
};
</script>

<style lang="scss">
@import "../styles/card";
</style>
