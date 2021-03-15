import { connection } from './jsStoreConnection'

export class PublishService {
  constructor () {
    this.tableName = 'Publish'
  }

  getPublish () {
    return connection.select({
      from: this.tableName
    })
  }

  addPublish (page) {
    return connection.insert({
      into: this.tableName,
      values: [page],
      return: true
    })
  }

  getPublishByPageId (id) {
    return connection.select({
      from: this.tableName,
      where: {
        pageId: id
      }
    })
  }
}
