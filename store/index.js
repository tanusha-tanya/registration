export const state = () => ({
    token: null,
    isLocal: true,
})

export const mutations = {
    setToken(state, token) {
      state.token = token
    },
    clearToken(state) {
      state.token = null
    },
}

export const actions = {
    nuxtServerInit({dispatch}) {
    },
    login({commit}, {token}){
      commit('setToken', token)
      window.$cookies.set('token', token)
      this.$axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    },
    logout({commit}) {
      commit('clearToken')
      window.$cookies.remove('token')
    },
}

export const getters = {
    hasToken: s => !!s.token
}
