import React, { useEffect } from 'react'
import { Alert, Button, Image, Pressable, SafeAreaView, StyleSheet, Switch, Text, TextInput, View, FlatList, TouchableOpacity } from 'react-native'

import { colors } from '../constants/colors';

import { useSelector, useDispatch } from 'react-redux'
import { getBookmarks, deleteBookmark } from '../stores/bookmarks/bookmarksSlice'
import { getActivities } from '../stores/activity/activitySlice'

const BookmarkScreen = ({ navigation }) => {
    const dispatch = useDispatch()

    const { bookmarks } = useSelector(state => state.bookmark)
    const { activities } = useSelector(state => state.activity);

    const removeBookmark = (bookmarkId) => {
        dispatch(deleteBookmark(bookmarkId))
    }

    const renderItem = ({ item, index }) => {
        if (activities.length === 0) return

        const activity = activities.find((activity) => activity.id === item.activityId)
        if (!activity) return null

        return (
            <View style={{ flex: 1, borderBottomColor: colors.primary, paddingVertical: 10, borderBottomWidth: index === bookmarks.length - 1 ? 0 : 1 }}>

                <View style={{ flexDirection: 'row',  alignItems: 'center' }}>
                    <Image source={activity.images[0]} style={{ width: 50, height: 50 }} />
                    <View style={{ flex: 1, marginLeft: 10 }}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{activity.name}</Text>
                        <Text style={{ fontSize: 12 }}>{activity.description.substring(0, 50)}...</Text>
                    </View>
                    <TouchableOpacity onPress={() => removeBookmark(item.id)} style={{ width: "10%" }}>
                        <Image source={require('../../assets/bookmark-filled.png')} style={{ width: 20, height: 20, tintColor: colors.secondary }} />
                    </TouchableOpacity>
                </View>

                <Pressable style={{ padding: 5, alignItems: 'center', backgroundColor: colors.primary, borderRadius: 10, marginTop:10 }} onPress={() => navigation.navigate("ActivityDetail", { activityId: item.activityId })}>
                    <Text style={{ color: 'white' }}>View Details</Text>
                </Pressable>
            </View>
        )
    }

    return (
        <SafeAreaView style={{ flex: 1, padding: 10 }}>
            <Text>This is the list of activities you liked one day!</Text>
            <FlatList
                data={bookmarks}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
                showsVerticalScrollIndicator={false}
            />
        </SafeAreaView>
    )
}

export default BookmarkScreen