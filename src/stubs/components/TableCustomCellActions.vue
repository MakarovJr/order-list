<template>
  <td>
    <div class="table-settings">
      <button class="table-settings__btn" v-click-outside="editHide" @click="changeSeen">
        <span class="table-settings__btn-icon"/>
      </button>
      <ul class="table-settings__list" v-if="seen">
        <li class="table-settings__item">
          <button
            class="table-settings__item-btn table-settings__item-btn_edit"
            @click="editItem(item)"
          >
            <span
              class="table-settings__item-btn-icon table-settings__item-btn-icon_edit"
            />
          </button>
        </li>
        <li class="table-settings__item">
          <button
            class="table-settings__item-btn table-settings__item-btn_remove"
            @click="rmItem(item)"
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
  </td>
</template>

<script>
import ClickOutside from 'vue-click-outside';
import { mapActions } from 'vuex';
import { MODAL_DISPLAY } from '../../store/mutation-types';

export default {
  name: 'TableCustomCellActions',

  props: {
    item: {
      type: Object,
      default() {
        return {};
      },
    },
    rowHovered: {
      type: Boolean,
      default: false,
    },
    toggleRowHover: {
      type: Function,
      default: () => null,
    },
  },

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
    changeSeen() {
      this.seen = !this.seen;
    },
    editHide() {
      this.seen = false;
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
@import "../../styles/my-table";
</style>
