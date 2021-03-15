import { connection } from './jsStoreConnection'

export class PublishService {
  constructor () {
    this.tableName = 'Publish'
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
