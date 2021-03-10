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
  return {
    name: 'toy-maker-db',
    tables: [tblPage]
  }
}

export const initJsStore = async () => {
  const dataBase = getDatabase()
  return await connection.initDb(dataBase)
}
