export default {
  namespaced: true,
  state: {
    activeItems: [], // 当前选中的组件
    pageConfigId: '', // 页面ID
    pageConfigTitle: '', // 页面标题
    allItems: [] // 当前页面所有编辑组件
  },
  getters: {
    activeItemIds (state) {
      return state.activeItems.map((item) => item.id)
    }
  },
  mutations: {
    addItem (state, payload) {
      state.allItems.push(payload)
    },
    addActiveItem (state, payload) {
      state.activeItems.push(payload)
    },
    removeActiveItem (state, payload) {
      state.activeItems = state.activeItems.filter((item) => {
        return item.id !== payload.id
      })
    }
  },
  actions: {
    addItem ({ commit }, payload) {
      commit('addItem', payload)
    },
    addActiveItem ({ commit, getters }, payload) {
      commit('addActiveItem', payload)
    },
    removeActiveItem ({ commit }, payload) {
      commit('removeActiveItem', payload)
    }
  }
}
