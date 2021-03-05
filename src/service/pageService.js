import { connection } from './jsStoreConnection'
import { cloneDeep } from 'lodash'
export class PageService {
  constructor () {
    this.tableName = 'Page'
  }

  getPages () {
    return connection.select({
      from: this.tableName
    })
  }

  addPage (page) {
    return connection.insert({
      into: this.tableName,
      values: [page],
      return: true
    })
  }

  getPageById (id) {
    return connection.select({
      from: this.tableName,
      where: {
        id: id
      }
    })
  }

  removePage (id) {
    return connection.remove({
      from: this.tableName,
      where: {
        id: id
      }
    })
  }

  updatePageById (page) {
    return connection.update({
      in: this.tableName,
      set: {
        pageConfig: cloneDeep(page.pageConfig),
        allItems: cloneDeep(page.allItems),
        canvasSetting: cloneDeep(page.canvasSetting)
      },
      where: {
        id: page.id
      }
    })
  }
}
