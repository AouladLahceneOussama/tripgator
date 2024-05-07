import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  bookmarks: [],
  isLoading: false
}

export const bookmarksSlice = createSlice({
  name: 'bookmark',
  initialState,
  reducers: {
    getBookmarks: (state, action) => {
      state.bookmarks = initialState.bookmarks
    },
    addBookmark: (state, action) => {
      console.log('action.payload', action.payload)
      state.bookmarks.push(action.payload)
    },
    updateBookmark: (state, action) => {
      const index = state.bookmarks.findIndex(bookmark => bookmark.id === action.payload.id)
      state.bookmarks[index] = action.payload
    },
    deleteBookmark: (state, action) => {
      state.bookmarks = state.bookmarks.filter(bookmark => bookmark.id !== action.payload)
    },
  }
})

// Action creators are generated for each case reducer function
export const { getBookmarks, addBookmark, updateBookmark, deleteBookmark } = bookmarksSlice.actions

export default bookmarksSlice.reducer