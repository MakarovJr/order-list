<template>
  <header class="header">
    <div class="container">
      <h1 class="header__title">{{ title }}</h1>
    </div>
  </header>
</template>

<script>
export default {
  name: 'Header',
  props: ['title'],
};
</script>

<style lang="scss">
@import "../styles/header";
</style>
