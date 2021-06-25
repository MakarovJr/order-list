<template>
  <div class="app" id="app">
    <Header title="Тестовое задание"></Header>
    <main>
      <div class="container">
        <div class="main">
          <div class="main__add-btn">
            <AddButton />
          </div>
          <div class="main__actions">
            <div class="main__actions_sorting">
              <Select
                :options="sortingList"
                :selectHeader="'Sorting'"
                @changeValue="sorting"
              />
            </div>
            <div class="main__switch_switch">
              <Switcher/>
            </div>
          </div>
          <div class="main__filters">
            <Filters />
          </div>
          <div class="main__order-list">
            <router-view />
          </div>
        </div>
      </div>
    </main>
    <Modal/>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import Header from './components/Header.vue';
import AddButton from './components/AddButton.vue';
import Filters from './components/Filters.vue';
import Modal from './components/Modal.vue';
import Switcher from './components/Switch.vue';
import Select from './components/Select.vue';

export default {
  name: 'App',
  components: {
    Header,
    AddButton,
    Filters,
    Modal,
    Switcher,
    Select,
  },
  computed: {
    ...mapState(['sortingList']),
  },
  methods: {
    ...mapActions(['readLocalStorage', 'sortList']),
    sorting(params) {
      this.sortList({ paramSort: params.value, field: 'orderNumber' });
    },
  },
  mounted() {
    this.readLocalStorage();
  },
};
</script>

<style lang="scss">
@import "./styles/main";
</style>
