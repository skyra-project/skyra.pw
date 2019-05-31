import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';

// Dependencies
import Buefy from 'buefy';
Vue.use(Buefy);

store.subscribe((mutation) => {
	if (mutation.type !== 'save') store.commit('save');
});

Vue.config.productionTip = false;

new Vue({
	router,
	store,
	beforeCreate() {
		this.$store.commit('load');
	},
	render: h => h(App)
}).$mount('#app');
