import History from '../../utils/History'
import { cloneDeep } from 'lodash'
export default {
  namespaced: true,
  state: {
    activeItems: [], // 当前选中的组件
    pageConfigId: '', // 页面ID
    pageConfigTitle: '', // 页面标题
    allItems: [], // 当前页面所有编辑组件
    historyStack: new History(), // 历史操作记录
    canvasSetting: {
      width: 375,
      height: 667
    },
    copyData: []
  },
  getters: {
    activeItemIds (state) {
      return state.activeItems.map((item) => item.id)
    },
    canUndo (state) {
      return state.historyStack.canUndo
    },
    canRedo (state) {
      return state.historyStack.canRedo
    }
  },
  mutations: {
    setAllItems (state, payload) {
      state.allItems = payload
    },
    addItem (state, payload) {
      state.allItems.push(payload)
    },
    removeItem (state, payload) {
      state.allItems = state.allItems.filter((item) => {
        return item.id !== payload.id
      })
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
    },
    clearActiveItem (state) {
      state.activeItems.splice(0, state.activeItems.length)
    },
    copyActiveItems (state) {
      state.copyData = cloneDeep(state.activeItems)
    },
    addHistory (state) {
      state.historyStack.record(state.allItems)
    },
    undoHistory (state) {
      state.activeItems = []
      state.allItems = state.historyStack.undo() || []
    },
    redoHistory (state) {
      state.activeItems = []
      state.allItems = state.historyStack.redo() || []
    },
    clearHistory (state) {
      state.historyStack.clear()
    },
    setCanvas (state, payload) {
      state.canvasSetting = payload
    }
  },
  actions: {
    setAllItems ({ commit }, payload) {
      commit('setAllItems', payload)
    },
    addItem ({ commit }, payload) {
      commit('addItem', payload)
      commit('addHistory')
    },
    removeItem ({ commit }, payload) {
      commit('clearActiveItem')
      commit('removeItem', payload)
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
    copyActiveItems ({ commit }) {
      commit('copyActiveItems')
    },
    clearActiveItem ({ commit }) {
      commit('clearActiveItem')
    },
    addHistory ({ commit }) {
      commit('addHistory')
    },
    undoHistory ({ commit }) {
      commit('undoHistory')
    },
    redoHistory ({ commit }) {
      commit('redoHistory')
    },
    clearHistory ({ commit }) {
      commit('clearHistory')
    },
    setCanvas ({ commit }, payload) {
      commit('setCanvas', payload)
    }
  }
}
