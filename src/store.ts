import Vue from 'vue';
import Vuex, { Store } from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        local: {
            theme: 'light',
            darkTheme: 'dark'
        },
        session: {
            banners: []
        }
    },
    mutations: {
        load(this: Store<StoreState>, state): void {
            const saved = localStorage.getItem('store');
            if (saved) this.replaceState({ ...state, ...JSON.parse(saved) });
        },
        save(this: Store<StoreState>, state): void {
            localStorage.setItem('store', JSON.stringify(state));
        },
        setTheme(this: Store<StoreState>, state, theme): void {
            state.local.theme = theme;
        },
        setDarkTheme(this: Store<StoreState>, state, theme): void {
            state.local.darkTheme = theme;
        }
    },
    actions: {

    }
});

export interface StoreState {
    local: {
        theme: 'light' | 'dark' | 'dark black';
        darkTheme: 'dark' | 'dark black';
    };
    session: {
        banners: string[];
    };
}
