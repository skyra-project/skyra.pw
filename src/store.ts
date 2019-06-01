import Vue from 'vue';
import Vuex, { Store } from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store<StoreState>({
    state: {
        local: {
            theme: 'light',
            darkTheme: 'dark'
        },
        session: {
            lastFetched: 0,
            banners: [],
            commands: []
        }
    },
    mutations: {
        load(state) {
            const saved = localStorage.getItem('store');
            if (saved) {
                const parsed = JSON.parse(saved);
                this.replaceState({ local: { ...state.local, ...(parsed.local || {}) }, session: { ...state.session, ...(parsed.session || {}) } });
            }
        },
        save(state) {
            localStorage.setItem('store', JSON.stringify(state));
        },
        setTheme(state, theme) {
            state.local.theme = theme;
        },
        setDarkTheme(state, theme) {
            state.local.darkTheme = theme;
        },
        clearCommands(state) {
            state.session.commands = [];
        },
        setCommands(state, commands: [string, boolean, Command[]][]) {
            state.session.commands = commands;
            state.session.lastFetched = Date.now();
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
        lastFetched: number;
        banners: string[];
        commands: [string, boolean, Command[]][];
    };
}

export interface Command {
    bucket: number;
    category: string;
    cooldown: number;
    description: string;
    guarded: boolean;
    guildOnly: boolean;
    name: string;
    permissionLevel: number;
    requiredPermissions: string[];
    usage: string;
}
