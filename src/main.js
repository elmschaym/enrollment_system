import Vue from 'vue';
import store from '@/store';
import router from '@/router';
import mixin from '@/mixin';
import VIcon from 'vue-awesome/components/Icon.vue';
import App from '@/App.vue';
import axios from 'axios';
import Cookies from 'js-cookie';

Vue.config.productionTip = false;
Vue.config.devtools = true;

Vue.prototype.APP_NAME = "System ENR";
Vue.prototype.APP_NAME_FULL = "Enrollment System";
Vue.component('v-icon', VIcon);

Vue.http = axios.create({
	baseURL: '/api',
	timeout: 5000,
	headers: {
		'Content-Type': 'application/json',
		'X-CSRFToken': Cookies.get('csrftoken')
  }
});

Vue.mixin(mixin);

const vue = new Vue({
	template: '<app/>',
	components: { app: App },
	router,
	store,
	render: h => h(App)
});
vue.$mount('#app');