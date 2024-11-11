import { databases, collections } from './config'
import { ID } from 'appwrite'

const db = {}

collections.forEach((collection) => {
  db[collection.name] = {
    create: async (id, payload = ID.unique()) => {
      return await databases.createDocument(
        collection.dbId,
        collection.colId,
        id,
        payload
      )
    },
    update: async (id, payload) => {
      return await databases.updateDocument(
        collection.dbId,
        collection.colId,
        id,
        payload
      )
    },
    delete: async (id) => {
      return await databases.deleteDocument(
        collection.dbId,
        collection.colId,
        id
      )
    },
    get: async (id) => {
      return await databases.getDocument(collection.dbId, collection.colId, id)
    },
    list: async () => {
      return await databases.listDocuments(collection.dbId, collection.colId)
    },
  }
})

export { db }
