import { loginRequest } from '../../api/user';

export default {
  namespaced: true,
  state: {
    token: '',
    isLogunned: false
  },

  getters: {
    token: state => state.token,
    expired: state => state.expired,
    isLogunned: state => state.isLogunned
  },

  actions: {
    async login({ commit }, payload) {
      try {
        const { status, data } = await loginRequest(payload);
        const { token } = data;
        
        if (status == 200) {
          if (token) {
            localStorage.setItem('token', token)
            commit("set_token", token);            
            commit("set_isLogunned", true);
          }
        } 
      } catch (error) {
        console.log(error);
      }
    }
  },

  mutations: {
    set_token(state, token) {
      state.token = token
    },

    set_isLogunned(state, isLogunned){
      state.isLogunned = isLogunned;
    }
  }
}

