<template>
  <transition name="modal-transition">
    <div class="modal" v-if="modalParams.display">
      <div class="modal__background" @click="modalClose"></div>
      <div class="modal__card">
        <h3 class="modal__card-title">{{ modalParams.title }}</h3>
        <InputText
          :label="'Номер накладной'"
          :placeholder="'Введите значение'"
          :inputValue="modalParams.orderItem.number"
          @changeValue="setValue"
        />
        <Select
          :title="'Тип заказа'"
          :selectName="'Выберите тип'"
          :options="orderType"
          :selectHeader="modalParams.selectHeader"
          :selectedValue="modalParams.orderItem.type"
          :placeholder="modalParams.placeholder"
          @changeValue="setValue"
        />
        <div
          class="modal__card-btns"
          v-if="
            (inputValue && selectValue) ||
            (modalParams.orderItem.number && modalParams.orderItem.type)
          "
        >
          <button class="modal__card-btn" @click="action">
            {{ modalParams.btnName }}
          </button>
          <button class="modal__card-btn" @click="cancel">
            Отменить
          </button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import InputText from './InputText.vue';
import Select from './Select.vue';
import { MODAL_DISPLAY } from '../store/mutation-types';

export default {
  name: 'AddButton',
  props: [],
  data() {
    return {
      inputValue: '',
      selectValue: '',
    };
  },
  components: {
    InputText,
    Select,
  },
  computed: {
    ...mapGetters(['modalParams', 'orderType']),
  },
  methods: {
    ...mapActions(['addItem', 'editOrder']),
    modalClose() {
      this.inputValue = '';
      this.selectValue = '';
      this.$store.commit(MODAL_DISPLAY, 'close');
    },
    setValue(params) {
      if (params.element === 'input') {
        this.inputValue = params.value;
      } else if (params.element === 'select') {
        this.selectValue = params.name;
      }
    },
    action() {
      if (this.modalParams.action === 'add') {
        const orderItem = {
          id: Date.now(),
          orderNumber: this.inputValue,
          orderType: this.selectValue,
          orderDate: new Date(),
        };
        this.addItem(orderItem);
        this.inputValue = '';
        this.selectValue = '';
        this.modalClose();
      } else if (this.modalParams.action === 'edit') {
        const orderItem = {
          id: this.modalParams.orderItem.id,
          orderNumber: !this.inputValue ? this.modalParams.orderItem.number : this.inputValue,
          orderType: !this.selectValue ? this.modalParams.orderItem.type : this.selectValue,
          orderDate: new Date(),
        };
        this.editOrder(orderItem);
        this.inputValue = '';
        this.selectValue = '';
        this.modalClose();
      }
    },
    cancel() {
      this.inputValue = '';
      this.selectValue = '';
      this.modalClose();
    },
  },
};
</script>

<style lang="scss">
@import "../styles/modal";
</style>
