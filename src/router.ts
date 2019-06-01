import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Commands from './views/Commands.vue';
import NotFound from './views/NotFound.vue';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'Home',
            component: Home
        },
        {
            path: '/commands',
            name: 'Commands',
            component: Commands
        },
        { path: '*', component: NotFound }
    ]
});
