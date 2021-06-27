import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import messageFunctionsMixin from './stubs/mixins/messageFunctionsMixin';

Vue.config.productionTip = false;

Vue.mixin(messageFunctionsMixin);

new Vue({
  data: {
    messages: {
      'rowsCounter.of': 'из',
    },
  },
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
