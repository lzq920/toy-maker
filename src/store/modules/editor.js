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
    setAllItems (state, payload) {
      state.allItems = payload
    },
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
    },
    replaceActiveItem (state, payload) {
      const ids = payload.map((item) => item.id)
      state.activeItems = state.allItems.filter((item) => {
        return ids.includes(item.id)
      })
      console.log(state.activeItems)
    },
    clearActiveItem (state) {
      state.activeItems.splice(0, state.activeItems.length)
    }
  },
  actions: {
    setAllItems ({ commit }, payload) {
      commit('setAllItems', payload)
    },
    addItem ({ commit }, payload) {
      commit('addItem', payload)
    },
    addActiveItem ({ commit, getters }, payload) {
      if (getters.activeItemIds.includes(payload.id)) {
        return
      }
      commit('addActiveItem', payload)
    },
    removeActiveItem ({ commit }, payload) {
      commit('removeActiveItem', payload)
    },
    replaceActiveItem ({ commit }, payload) {
      commit('replaceActiveItem', payload)
    },
    clearActiveItem ({ commit }) {
      commit('clearActiveItem')
    }
  }
}
