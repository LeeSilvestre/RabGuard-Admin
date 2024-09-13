import {createStore} from "vuex"

const store = createStore({
    state() {
        return {
            user: undefined,
        }
    },
    mutations: {
        setUser(state, user){
            state.user = user;
        },
    },
})

export default store;