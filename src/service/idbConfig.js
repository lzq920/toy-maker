import { connection } from './jsStoreConnection'
import { DATA_TYPE } from 'jsstore'

const getDatabase = () => {
  const tblPage = {
    name: 'Page',
    columns: {
      id: {
        primaryKey: true,
        dataType: DATA_TYPE.String
      },
      pageConfig: {
        notNull: true,
        dataType: DATA_TYPE.Object
      },
      allItems: {
        notNull: true,
        dataType: DATA_TYPE.Array
      },
      canvasSetting: {
        notNull: true,
        dataType: DATA_TYPE.Object
      },
      dataSource: {
        notNull: true,
        dataType: DATA_TYPE.Object
      }
    }
  }
  const tblPublish = {
    name: 'Publish',
    columns: {
      id: {
        primaryKey: true,
        dataType: DATA_TYPE.Number
      },
      pageId: {
        notNull: true,
        dataType: DATA_TYPE.String
      },
      createTime: {
        notNull: true,
        dataType: DATA_TYPE.DateTime
      },
      url: {
        notNull: true,
        dataType: DATA_TYPE.String
      }
    }
  }
  return {
    name: 'toy-maker-db',
    tables: [tblPage, tblPublish]
  }
}

export const initJsStore = async () => {
  const dataBase = getDatabase()
  return await connection.initDb(dataBase)
}
