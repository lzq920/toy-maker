import { cloneDeep, isEqual } from 'lodash'

export default class History {
  constructor (maxSnapshots = 20) {
    this.maxSnapshots = maxSnapshots
    this.snapshots = []
    this.cursor = -1
  }

  get canUndo () {
    return this.cursor > 0
  }

  get canClear () {
    return this.snapshots.length
  }

  get canRedo () {
    return this.snapshots.length > this.cursor + 1
  }

  record (snapshot) {
    if (this.checkRepeat(snapshot)) {
      return false
    }
    while (this.cursor < this.snapshots.length - 1) {
      this.snapshots.pop()
    }
    this.snapshots.push(cloneDeep(snapshot))
    // 确保历史记录条数限制
    if (this.snapshots.length > this.maxSnapshots) {
      this.snapshots.shift()
    }
    this.cursor = this.snapshots.length - 1
  }

  undo () {
    if (this.canUndo) {
      this.cursor -= 1
      return this.snapshots[this.cursor]
    }
    return null
  }

  redo () {
    if (this.canRedo) {
      this.cursor += 1
      return this.snapshots[this.cursor]
    }
    return null
  }

  move (cursor) {
    if (this.snapshots.length > cursor) {
      this.cursor = cursor
      return this.snapshots[this.cursor]
    }
  }

  clear () {
    this.cursor = -1
    this.snapshots = []
  }

  checkRepeat (snapshot) {
    const next = snapshot
    let prev
    if (this.cursor >= 0) {
      prev = this.snapshots[this.cursor]
    } else {
      prev = []
    }
    if (prev.length <= 0 || next.length <= 0) {
      return false
    }
    if (isEqual(next, prev)) {
      return true
    }
  }
}
