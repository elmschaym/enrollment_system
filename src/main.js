import Vue from 'vue';
import store from '@/store';
import router from '@/router';
import plugins from '@/plugins';
import VIcon from 'vue-awesome/components/Icon.vue';
import VueHtmlToPaper from 'vue-html-to-paper';
import App from '@/App.vue';

Vue.config.productionTip = false;
Vue.config.devtools = true;

Vue.use(plugins);
Vue.use(VueHtmlToPaper, {
  name: '_blank',
  specs: ['fullscreen=no', 'titlebar=no', 'scrollbars=yes', 'height=600', 'width=800', 'top=100', 'left=300'
  ],
  styles: [
    'http://192.168.254.101:8080/static/css/print.css'
  ]
});
Vue.component('v-icon', VIcon);

const vue = new Vue({
	template: '<app/>',
	components: { app: App },
	router,
	store,
	render: h => h(App)
});
vue.$mount('#app');
