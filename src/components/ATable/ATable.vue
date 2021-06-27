<template>
  <table class="a-table">
    <a-table-header
      :headers="getHeaders"
      :sortParams="sortParams"
      :sortParamsDefault="sortParamsDefault"
      @onChangeSort="onChangeSort"
    ></a-table-header>
    <template v-for="item in items">
      <a-table-row
        :actionClick="actionClick"
        :class="getRowClassesByItem(item)"
        :item="item"
        :headers="getHeaders"
        :key="item.id + '-row'"
        :ref="item.id + '-row'"
      ></a-table-row>
      <a-table-wide-row
        :component="useExtRowComponent"
        :extData="item.extData"
        :headers="getHeaders"
        :id="item.id"
        :key="item.id + '-ext-row'"
        @onChangeHovered="onChangeHoveredRow"
        v-if="item.extData"
      ></a-table-wide-row>
    </template>
  </table>
</template>

<script>
import ATableHeader from './ATableHeader.vue';
import ATableRow from './ATableRow.vue';
import ATableWideRow from './ATableWideRow.vue';

export default {
  name: 'ATable',

  components: {
    ATableHeader,
    ATableRow,
    ATableWideRow,
  },

  props: {
    items: {
      type: Array,
      default() {
        return [];
      },
    },
    headers: {
      type: Array,
      default() {
        return [];
      },
    },
    sortParams: {
      type: Object,
      default() {
        return {};
      },
    },
    sortParamsDefault: {
      type: Object,
      default() {
        return {};
      },
    },
    actionClick: {
      type: Function,
      default() {},
    },
    useExtRowComponent: {
      type: Object,
      default() {
        return null;
      },
    },
    getRowClassesByItem: {
      type: Function,
      default() {},
    },
  },

  computed: {
    getHeaders() {
      const headers = [];
      const headersPositionEnd = [];
      this.headers.forEach((header) => {
        if (header.position && header.position === 'afterAll') {
          headersPositionEnd.push(header);
        } else {
          headers.push(header);
        }
      });
      return headers.concat(headersPositionEnd);
    },
  },

  methods: {
    onChangeSort(data) {
      this.$emit('onChangeSort', data);
    },

    onChangeHoveredRow(params) {
      if (params.hovered) {
        this.$refs[`${params.id}-row`][0].$el.classList.add('hovered-ext');
      } else {
        this.$refs[`${params.id}-row`][0].$el.classList.remove('hovered-ext');
      }
    },
  },
};
</script>
