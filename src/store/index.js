import { createStore } from 'vuex'

const COVER_URL = [
  require('@/assets/images/cover.jpg'),
  require('@/assets/images/cover2.jpg'),
  require('@/assets/images/cover3.jpg')
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
