import History from '../../utils/History'
import { cloneDeep, findIndex, last, set } from 'lodash'
import tip from '@/enum/tip'

export default {
  namespaced: true,
  state: {
    activeItems: [], // 当前选中的组件
    pageConfig: {
      title: '',
      description: '',
      keywords: '',
      cover: ''
    }, // 页面配置
    dataSource: {}, // 全局数据源
    allItems: [], // 当前页面所有编辑组件
    historyStack: new History(100), // 历史操作记录
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
  watch: {},
  mutations: {
    initPageConfig (state) {
      state.canvasSetting = {
        width: 375,
        height: 667
      }
      state.pageConfig = {
        title: '',
        description: '',
        keywords: '',
        cover: ''
      }
      state.dataSource = Object.assign({}, tip)
      state.allItems = []
      state.copyData = []
      state.activeItems = []
      state.historyStack.clear()
    },
    setDataSource (state, payload) {
      state.dataSource = Object.assign({}, tip, payload)
    },
    setAllItems (state, payload) {
      state.allItems = payload
    },
    addItem (state, payload) {
      state.allItems.push(payload)
    },
    removeItem (state, payload) {
      const index = findIndex(state.allItems, (item) => item.id === payload.id)
      state.allItems.splice(index, 1)
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
      const obj = {
        allItems: state.allItems,
        dataSource: state.dataSource
      }
      window.localStorage.setItem('previewPage', JSON.stringify(obj))
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
      state.pageConfig = Object.assign(state.pageConfig, payload)
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
    },
    moveFirst (state) {
      const moveItem = last(state.activeItems)
      const index = findIndex(state.allItems, (item) => item.id === moveItem.id)
      if (index > 0) {
        [state.allItems[index], state.allItems[0]] = [state.allItems[0], state.allItems[index]]
      }
    },
    moveLast (state) {
      const moveItem = last(state.activeItems)
      const index = findIndex(state.allItems, (item) => item.id === moveItem.id)
      const maxIndex = state.allItems.length - 1
      if (index !== maxIndex) {
        [state.allItems[index], state.allItems[maxIndex]] = [state.allItems[maxIndex], state.allItems[index]]
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
    setDataSource ({ commit }, payload) {
      commit('setDataSource', payload)
    },
    moveNext ({ commit }) {
      commit('moveNext')
    },
    movePrev ({ commit }) {
      commit('movePrev')
    },
    moveFirst ({ commit }) {
      commit('moveFirst')
    },
    moveLast ({ commit }) {
      commit('moveLast')
    }
  }
}
