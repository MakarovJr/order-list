import Vue from 'vue';
import Vuex from 'vuex';
import {
  ADD_ORDER_LIST,
  EDIT_ORDER,
  FILTER_LIST,
  MODAL_DISPLAY,
  REMOVE_ITEM,
  SET_ORDERLIST,
  SORTING,
} from './mutation-types';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    orderList: [],
    computedList: [],
    modalParams: {
      display: false,
      title: '',
      orderItem: {
        id: '',
        number: '',
        type: '',
        date: '',
      },
      placeholder: '',
      selectHeader: '',
      action: '',
      btnName: '',
    },
    filtration: {
      active: false,
      paramFilter: '',
    },
    sorting: {
      active: false,
      paramSort: '',
      field: '',
    },
    sortingList: [
      { value: 'ascending', name: 'sorting by invoice number: ascending' },
      { value: 'descending', name: 'sorting by invoice number: descending' },
    ],
    orderType: [
      { value: 'takoy', name: 'такой' },
      { value: 'syakoy', name: 'сякой' },
      { value: 'edakiy', name: 'эдакий' },
    ],
  },
  getters: {
    orderList(state) {
      let displayedList = [];
      if (state.filtration.active || state.sorting.active) {
        displayedList = state.computedList;
      } else {
        displayedList = state.orderList;
      }
      return displayedList;
    },
    sortingList(state) {
      return state.sortingList;
    },
    orderType(state) {
      return state.orderType;
    },
    modalParams(state) {
      return state.modalParams;
    },
  },
  actions: {
    readLocalStorage(state) {
      const orderList = JSON.parse(localStorage.getItem('orderList'));
      state.commit('SET_ORDERLIST', orderList);
    },
    sortList(ctx, payload) {
      ctx.commit(SORTING, payload);
      if (ctx.state.filtration.active) {
        ctx.commit(FILTER_LIST, ctx.state.filtration);
      }
    },
    filterList(ctx, payload) {
      ctx.commit(FILTER_LIST, payload);
      if (ctx.state.sorting.active) {
        ctx.commit(SORTING, ctx.state.sorting);
      }
    },
    addItem(ctx, payload) {
      ctx.commit(ADD_ORDER_LIST, payload);
      ctx.commit(SET_ORDERLIST, ctx.state.orderList);
      if (ctx.state.filtration.active || !ctx.state.sorting.active) {
        if (ctx.state.filtration.active) {
          ctx.commit(FILTER_LIST, ctx.state.filtration);
        }
        if (ctx.state.sorting.active) {
          ctx.commit(SORTING, ctx.state.sorting);
        }
      }
    },
    removeItem(ctx, payload) {
      ctx.commit(REMOVE_ITEM, payload);
      if (ctx.state.orderList !== null) {
        ctx.commit(SET_ORDERLIST, ctx.state.orderList);
        if (ctx.state.filtration.active || !ctx.state.sorting.active) {
          if (ctx.state.filtration.active) {
            ctx.commit(FILTER_LIST, ctx.state.filtration);
          }
          if (ctx.state.sorting.active) {
            ctx.commit(SORTING, ctx.state.sorting);
          }
        }
      }
    },
    editOrder(ctx, payload) {
      ctx.commit(EDIT_ORDER, payload);
      ctx.commit(SET_ORDERLIST, ctx.state.orderList);
      if (ctx.state.filtration.active || !ctx.state.sorting.active) {
        if (ctx.state.filtration.active) {
          ctx.commit(FILTER_LIST, ctx.state.filtration);
        }
        if (ctx.state.sorting.active) {
          ctx.commit(SORTING, ctx.state.sorting);
        }
      }
    },
  },
  mutations: {
    [SET_ORDERLIST]: (state, list) => {
      state.orderList = list;
      state.computedList = list;
    },
    [MODAL_DISPLAY]: (state, payload) => {
      if (payload === 'add') {
        const modalParams = {
          display: true,
          title: 'Добавление',
          orderItem: {
            id: '',
            number: '',
            type: '',
            date: '',
          },
          placeholder: true,
          selectHeader: 'Выберите тип',
          action: 'add',
          btnName: 'Добавить',
        };
        state.modalParams = modalParams;
      } else if (payload === 'close') {
        state.modalParams.display = false;
        const modalParams = {
          display: false,
          title: '',
          orderItem: {
            id: '',
            number: '',
            type: '',
            date: '',
          },
          placeholder: '',
          selectHeader: '',
          action: '',
          btnName: '',
        };
        state.modalParams = modalParams;
      } else {
        const modalParams = {
          display: true,
          title: 'Изменение',
          orderItem: {
            id: payload.id,
            number: payload.orderNumber,
            type: payload.orderType,
            date: payload.orderDate,
          },
          inputValue: payload.orderNumber,
          selectValue: payload.orderType,
          action: 'edit',
          btnName: 'Сохранить',
        };
        state.modalParams = modalParams;
      }
    },
    [ADD_ORDER_LIST]: (state, orderItem) => {
      if (state.orderList !== null) {
        state.orderList.push(orderItem);
        localStorage.setItem('orderList', JSON.stringify(state.orderList));
      } else {
        state.orderList = [orderItem];
        localStorage.setItem('orderList', JSON.stringify(state.orderList));
      }
    },
    [REMOVE_ITEM]: (state, idItem) => {
      state.orderList.splice(state.orderList.findIndex((item) => item.id === idItem), 1);
      localStorage.setItem('orderList', JSON.stringify(state.orderList));
    },
    [EDIT_ORDER]: (state, editItem) => {
      const index = state.orderList.findIndex((item) => item.id === editItem.id);
      state.orderList[index] = editItem;
      localStorage.setItem('orderList', JSON.stringify(state.orderList));
    },
    [SORTING]: (state, key) => {
      if (key) {
        const list = state.filtration.active ? state.computedList : state.orderList.map((i) => i);
        state.sorting.active = true;
        state.sorting.paramSort = key.paramSort;
        state.sorting.field = key.field;
        if (key.paramSort === 'ascending') {
          state.computedList = list.sort((item1, item2) => {
            let compare = 0;
            if (item1[key.field] > item2[key.field]) {
              compare = 1;
            }
            if (item1[key.field] < item2[key.field]) {
              compare = -1;
            }
            return compare;
          });
        } else if (key.paramSort === 'descending') {
          state.computedList = list.sort((item1, item2) => {
            let compare = 0;
            if (item1[key.field] > item2[key.field]) {
              compare = -1;
            }
            if (item1[key.field] < item2[key.field]) {
              compare = 1;
            }
            return compare;
          });
        } else if (key.paramSort === 'nosort') {
          state.sorting.active = false;
          state.sorting.paramSort = '';
          state.sorting.field = '';
          state.computedList = state.orderList;
        }
      } else {
        state.sorting.active = false;
        state.sorting.paramSort = '';
        state.sorting.field = '';
      }
    },
    [FILTER_LIST]: (state, filter) => {
      if (filter.paramFilter !== '') {
        state.filtration.active = true;
        state.filtration.paramFilter = filter.paramFilter;
        const list = state.orderList.filter(
          (item) => item.orderNumber.indexOf(filter.paramFilter) !== -1,
        );
        state.computedList = list;
      } else {
        state.filtration.active = false;
        state.filtration.paramFilter = '';
        state.computedList = state.orderList;
      }
    },
  },
});
