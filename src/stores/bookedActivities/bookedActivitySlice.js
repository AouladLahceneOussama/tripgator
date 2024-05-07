import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    bookedActivities: [],
    filteredBookedActivities: [],
    isLoading: false
}

export const bookedActivitySlice = createSlice({
    name: 'bookedActivity',
    initialState,
    reducers: {
        getBookedActivities: (state, action) => {
            if (action.payload) {
                state.filteredBookedActivities = state.bookedActivities.filter(book => book.userId === action.payload)
            } else {
                state.filteredBookedActivities = state.bookedActivities
            }
        },
        addBookedActivity: (state, action) => {
            state.bookedActivities.push(action.payload)
        },
        updateBookedActivity: (state, action) => {
            const index = state.bookedActivities.findIndex(book => book.id === action.payload.id)
            state.bookedActivities[index] = action.payload
        },
        deleteBookedActivity: (state, action) => {
            state.bookedActivities = state.bookedActivities.filter(book => book.id !== action.payload)
        },
        confirmBookedActivity: (state, action) => {
            const index = state.bookedActivities.findIndex(book => book.id === action.payload)
            state.bookedActivities[index].status = 'confirmed'
        },
        rejectBookedActivity: (state, action) => {
            const index = state.bookedActivities.findIndex(book => book.id === action.payload)
            state.bookedActivities[index].status = 'rejected'
        }
    }
})


export const { getBookedActivities, addBookedActivity, updateBookedActivity, deleteBookedActivity, confirmBookedActivity, rejectBookedActivity } = bookedActivitySlice.actions
export default bookedActivitySlice.reducer
