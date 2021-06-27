<template>
  <transition name="switch-link">
    <div class="switch">
      <router-link class="switch__link switch__link_widget" to="/"
        ><span class="switch__link-icon icon-widget"></span
      ></router-link>
      <router-link class="switch__link switch__link_table" to="/table"
        ><span class="switch__link-icon icon-table"></span
      ></router-link>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'Switcher',
};
</script>

<style lang="scss">
@import "../styles/switcher";
</style>
