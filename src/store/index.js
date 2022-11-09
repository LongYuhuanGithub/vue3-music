import { createStore } from 'vuex'

const COVER_URL = [
  require('@/assets/images/1.jpg'),
  require('@/assets/images/2.jpg'),
  require('@/assets/images/3.jpg'),
  require('@/assets/images/4.jpg')
]

export default createStore({
  state: {
    isPlaying: false,
    coverUrl: ''
  },
  getters: {},
  mutations: {
    togglePlay (state, toggle) {
      state.isPlaying = toggle !== undefined ? toggle : !state.isPlaying
    },
    changeCover (state) {
      while (1) {
        const index = Math.floor(Math.random() * 3)
        const coverUrl = COVER_URL[index]
        if (coverUrl !== state.coverUrl) {
          state.coverUrl = coverUrl
          break
        }
      }
    }
  },
  actions: {},
  modules: {}
})
