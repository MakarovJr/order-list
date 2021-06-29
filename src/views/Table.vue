<template>
  <div id="app">
    <a-table
      :headers="headers"
      :items="orderList"
      :sortParams="sortParams"
      :sortParamsDefault="sortParamsDefault"
      :useExtRowComponent="getExtRowComponent"
      :getRowClassesByItem="getRowClassesByItem"
    ></a-table>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import ATable from '../components/ATable/ATable.vue';
import TableCustomHeader from '../stubs/components/TableCustomHeader.vue';
import TableCustomCell from '../stubs/components/TableCustomCell.vue';
import TableExtRowComponent from '../stubs/components/TableExtRowComponent.vue';
import TableCustomCellActions from '../stubs/components/TableCustomCellActions.vue';

export default {
  name: 'Table',

  components: {
    ATable,
  },

  data() {
    return {
      headers: [
        {
          key: 'id',
          title: 'ID',
          headerAlign: 'center',
          dataAlign: 'center',
          classes: 'order-col width-4',
        },
        {
          key: 'orderNumber',
          name: 'number',
          title: 'Номер накладной',
          headerAlign: 'center',
          dataAlign: 'center',
          sortControl: true,
          useHeaderComponent: TableCustomHeader,
        },
        {
          key: 'orderType',
          title: 'Тип заказа',
          headerAlign: 'center',
          dataAlign: 'center',
          useComponent: TableCustomCell,
        },
        {
          key: 'orderDate',
          title: 'Дата создания',
          headerAlign: 'center',
          dataAlign: 'center',
          useComponent: TableCustomCell,
        },
        {
          key: 'actions',
          title: '',
          headerAlign: 'center',
          dataAlign: 'center',
          useComponent: TableCustomCellActions,
        },
        {
          key: 'mobileDescription',
          title: 'Description',
          headerAlign: 'center',
          dataAlign: 'center',
          classes: 'no-info mobile-col',
          position: 'afterAll',
        },
      ],
      sortParamsDefault: {
        sidx: 'number',
        sord: 'desc',
      },
      sortParams: {
        sidx: '',
        sord: '',
      },
      items: [],
    };
  },

  computed: {
    ...mapGetters(['orderList']),
    getExtRowComponent() {
      return TableExtRowComponent;
    },
  },

  methods: {
    getRowClassesByItem(item) {
      return `custom-class-${item.id}`;
    },
  },
};
</script>

<style lang="scss">
@import "../styles/table";
</style>
