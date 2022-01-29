import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  userId: null,
  firstname: null,
  lastname: null,
  email: null,
  collections: null,
  accessToken: null,
  error: null,
}

const user = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // setUserprofile: (store, action) => {
    //   store = { ...store, ...action.payload }
    // },
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
    editCollection: (store, action) => {
      store.collections = store.collections.map((item) => {
        if (item._id === action.payload._id) {
          return {
            ...item,
            title: action.payload.title,
            date: action.payload.date,
            image: action.payload.image,
            message: action.payload.message,
          }
        }
        return item
      })
    },
    setAccessToken: (store, action) => {
      store.accessToken = action.payload
    },
    setError: (store, action) => {
      store.error = action.payload
    },
    signout: () => {
      return initialState
    },
  },
})

export default user
