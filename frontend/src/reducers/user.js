import { createSlice } from '@reduxjs/toolkit'

const user = createSlice({
  name: 'user',
  initialState: {
    userId: null,
    firstname: null,
    lastname: null,
    email: null,
    collections: null,
    accessToken: null,
    error: null,
  },
  reducers: {
    setUserId: (store, action) => {
      store.userId = action.payload
    },
    setFirstname: (store, action) => {
      store.firstname = action.payload
    },
    setLastname: (store, action) => {
      store.lastname = action.payload
    },
    setEmail: (store, action) => {
      store.email = action.payload
    },
    setCollections: (store, action) => {
      store.collections = action.payload
    },
    addCollection: (store, action) => {
      store.collections = [...store.collections, action.payload]
    },
    deleteCollection: (store, action) => {
      store.collections = store.collections.filter(
        (item) => item._id !== action.payload
      )
    },
    setAccessToken: (store, action) => {
      store.accessToken = action.payload
    },
    setError: (store, action) => {
      store.error = action.payload
    },
  },
})

export default user
