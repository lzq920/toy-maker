import History from '../../utils/History'
import { cloneDeep, findIndex, last, set } from 'lodash'

export default {
  namespaced: true,
  state: {
    activeItems: [], // 当前选中的组件
    pageConfig: {
      id: '',
      title: '',
      description: '',
      keywords: '',
      cover: ''
    }, // 页面配置
    allItems: [], // 当前页面所有编辑组件
    historyStack: new History(), // 历史操作记录
    canvasSetting: {
      width: 375,
      height: 667
    },
    globalsKeyEvent: {
      ctrlKey: false
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
    initPageConfig (state) {
      state.canvasSetting = {
        width: 375,
        height: 667
      }
      state.pageConfig = {
        id: '',
        title: '',
        description: '',
        keywords: '',
        cover: ''
      }
      state.allItems = []
      state.copyData = []
      state.activeItems = []
      state.historyStack.clear()
    },
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
    updateItem (state, {
      id,
      path,
      value
    }) {
      const activeItems = state.activeItems.find((item) => item.id === id)
      set(activeItems, path, value)
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
    },
    setPageConfig (state, payload) {
      state.pageConfig = payload
    },
    ctrlKeyDown (state, payload) {
      state.globalsKeyEvent.ctrlKey = payload
    },
    moveNext (state) {
      const moveItem = last(state.activeItems)
      const index = findIndex(state.allItems, (item) => item.id === moveItem.id)
      const maxIndex = state.allItems.length - 1
      if (index < maxIndex) {
        [state.allItems[index], state.allItems[index + 1]] = [state.allItems[index + 1], state.allItems[index]]
      }
    },
    movePrev (state) {
      const moveItem = last(state.activeItems)
      const index = findIndex(state.allItems, (item) => item.id === moveItem.id)
      if (index > 0) {
        [state.allItems[index], state.allItems[index - 1]] = [state.allItems[index - 1], state.allItems[index]]
      }
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
    updateItem ({ commit }, {
      id,
      path,
      value
    }) {
      commit('updateItem', {
        id,
        path,
        value
      })
      commit('addHistory')
    },
    addActiveItem ({
      commit,
      getters
    }, payload) {
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
    },
    ctrlKeyDown ({ commit }, payload) {
      commit('ctrlKeyDown', payload)
    },
    setPageConfig ({ commit }, payload) {
      commit('setPageConfig', payload)
    },
    initPageConfig ({ commit }) {
      commit('initPageConfig')
    },
    moveNext ({ commit }) {
      commit('moveNext')
    },
    movePrev ({ commit }) {
      commit('movePrev')
    }
  }
}
