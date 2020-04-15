export const state = () => ({
  user: {
    id:'',
    company_name: '',
    itn: '',
    email: '',
    accountable_full_name: '',
    phone:'',
    website:'',
    office_address: '',
    city: {
      id: '',
      name:''
    },
    last_password_changed_date:''
  }
})

export const mutations = {
  setUser(state, payload) {
    state.user = {...state.user, ...payload}
  },
  updateUser(state,payload) {
    state.user = payload
  }
}

export const actions = {
  addUser({commit}, payload){
    commit('setUser', payload)
  },
  updateUser({commit}, payload){
    commit('updateUser', payload)
  },
}

export const getters = {
  user: s => s
}
