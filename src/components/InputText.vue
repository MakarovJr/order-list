<template>
  <div class="input-text">
    <label class="input-text__label"
      >{{ label }}
      <input
        class="input-text__input"
        type="text"
        :placeholder="placeholder"
        :value="inputValue"
        @input="changeValue"
      />
    </label>
  </div>
</template>

<script>
export default {
  name: 'InputText',
  props: ['label', 'placeholder', 'inputValue'],
  methods: {
    changeValue(event) {
      const value = { element: 'input', value: event.target.value };
      this.$emit('changeValue', value);
    },
  },
};
</script>

<style lang="scss">
@import "../styles/input-text";
</style>
