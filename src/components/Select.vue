<template>
  <div class="select">
    <span class="select__title" v-if="title">{{ title }}</span>
    <div class="select__box">
      <div
        class="select__box-header"
        :class="{'is-open': isOpen, selected: isSelected, placeholder: isPlaceholder}"
        @click="showOptions"
        v-click-outside="onClickOutside"
      >
        {{ header }}
        <span class="select__box-header-icon"></span>
      </div>
      <transition name="options">
        <ul class="select__box-options" v-if="seen">
          <li
            class="select__box-options-item"
            v-for="(option, idx) in options"
            :key="idx"
            @click="setSelect(option)"
          >
            {{ option.name }}
          </li>
        </ul>
      </transition>
    </div>
  </div>
</template>

<script>
import ClickOutside from 'vue-click-outside';

export default {
  name: 'Select',
  props: ['title', 'selectHeader', 'options', 'placeholder', 'selectedValue'],
  data() {
    return {
      seen: false,
      isOpen: false,
      isSelected: false,
      isPlaceholder: false,
      header: '',
    };
  },
  directives: {
    ClickOutside,
  },
  mounted() {
    if (this.selectHeader) {
      this.header = this.selectHeader;
    }
    if (this.placeholder) {
      this.isPlaceholder = this.placeholder;
    }
    if (this.selectedValue) {
      this.header = this.selectedValue;
      this.isSelected = true;
    }
  },
  methods: {
    showOptions() {
      this.seen = !this.seen;
      if (this.seen) {
        this.isOpen = true;
      } else {
        this.isOpen = false;
      }
    },
    setSelect(option) {
      this.showOptions();
      this.isSelected = true;
      this.isPlaceholder = false;
      this.header = option.name;
      this.$emit('changeValue', { element: 'select', value: option.value, name: option.name });
    },
    onClickOutside() {
      this.seen = false;
      this.isOpen = false;
    },
  },
};
</script>

<style lang="scss">
@import "../styles/select";
</style>
