<template>
  <div id="app">
    <a-table
      :headers="headers"
      :items="items"
      :sortParams="sortParams"
      :sortParamsDefault="sortParamsDefault"
      :useExtRowComponent="getExtRowComponent"
      :getRowClassesByItem="getRowClassesByItem"
    ></a-table>
  </div>
</template>

<script>
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
          key: 'pos',
          title: 'Position',
          headerAlign: 'center',
          dataAlign: 'center',
          classes: 'order-col width-4',
        },
        {
          key: 'number',
          name: 'number',
          title: 'Number',
          headerAlign: 'center',
          dataAlign: 'left',
          sortControl: true,
          useHeaderComponent: TableCustomHeader,
        },
        {
          key: 'name',
          title: 'Name',
          headerAlign: 'center',
          dataAlign: 'left',
          useComponent: TableCustomCell,
        },
        {
          key: 'date',
          title: 'Date',
          headerAlign: 'center',
          dataAlign: 'left',
          useComponent: TableCustomCell,
        },
        {
          key: 'actions',
          title: 'Actions',
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
      items: [
        {
          id: 1,
          pos: 1,
          number: '1234',
          name: 'Name Name Name',
        },
        {
          id: 2,
          pos: 2,
          number: '5678',
          name: 'Name Name Name Name Name',
        },
        {
          id: 3,
          pos: 3,
          number: '9999',
          name: 'NameNameNameNameNameNameNameNameNameNameNameName',
        },
      ],
    };
  },

  computed: {
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
