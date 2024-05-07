import { configureStore } from '@reduxjs/toolkit'
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist'
import AsyncStorage from '@react-native-async-storage/async-storage';

import activitySlice from '../stores/activity/activitySlice'
import bookedActivitySlice from '../stores/bookedActivities/bookedActivitySlice'
import bookmarksSlice from '../stores/bookmarks/bookmarksSlice'
import userSlice from '../stores/user/userSlice'

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    version: 2,
}

const userPersistedReducer = persistReducer(persistConfig, userSlice)
const bookedActivityPersistedReducer = persistReducer(persistConfig, bookedActivitySlice)
const bookmarksPersistedReducer = persistReducer(persistConfig, bookmarksSlice)

export const store = configureStore({
    reducer: {
        user: userPersistedReducer,
        activity: activitySlice,
        bookedActivity: bookedActivityPersistedReducer,
        bookmark: bookmarksPersistedReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        })

})

export const persistor = persistStore(store) 