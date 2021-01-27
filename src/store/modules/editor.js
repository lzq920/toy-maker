export default {
  namespaced: true,
  state: {
    referenceLine: {
      row: [],
      col: []
    }, // 用户定义的辅助线
    activeItems: [], // 当前选中的组件
    canvasSize: {
      width: 375,
      height: 667
    }, // 画布大小
    canvasPosition: {
      left: 0,
      top: 0
    }, // 画布位置
    matchedLine: {
      row: [],
      col: []
    }, // 匹配到的辅助线
    pageConfigId: '', // 页面ID
    pageConfigTitle: '', // 页面标题
    allItems: [] // 当前页面所有编辑组件
  },
  getters: {
    activeItemIds (state) {
      return state.activeItems.map((item) => item.id)
    },
    allItemIds (state) {
      return state.allItems.map((item) => item.id)
    }
  },
  mutations: {
    addItem (state, payload) {
      state.allItems.push(payload)
    },
    addActiveItem (state, payload) {
      state.activeItems = [payload]
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
      if (getters.activeItemIds.includes(payload.id)) {

      } else {
        commit('addActiveItem', payload)
      }
    },
    removeActiveItem ({ commit }, payload) {
      commit('removeActiveItem', payload)
    }
  }
}
