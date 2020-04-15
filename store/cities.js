export const state = () => ({
  cities: []
})

export const mutations = {
  setСities(state, cities) {
    state.cities = cities;
  }
}

export const actions = {
  async fetch({commit}) {    
    const cities = await this.$axios.$get(process.env.baseUrl + '/cities').then((response) =>{
      return response.data
    })    
    commit('setСities', cities)
  }
}


export const getters = {
  cities: s => s.cities
}