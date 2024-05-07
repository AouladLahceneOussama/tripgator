import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, ScrollView, FlatList, TouchableOpacity, Image } from 'react-native';

import { colors } from '../constants/colors';
import ReviewRating from '../components/ReviewRating';

import { useSelector, useDispatch } from 'react-redux'
import { getActivities, searchActivities, filterActivities } from '../stores/activity/activitySlice';
import { addBookmark, deleteBookmark } from '../stores/bookmarks/bookmarksSlice'

const HomeScreen = ({ navigation }) => {
    const dispatch = useDispatch();

    const { bookmarks } = useSelector(state => state.bookmark);
    const { filteredActivities } = useSelector(state => state.activity);
    const [categories, setCategories] = useState([
        {
            id: null,
            name: 'All',
            active: true
        },
        {
            id: 1,
            name: 'Cycling',
            active: false
        },
        {
            id: 2,
            name: 'Quad',
            active: false
        },
        {
            id: 3,
            name: 'Swiming',
            active: false
        },
        {
            id: 4,
            name: 'Riding',
            active: false
        },
        {
            id: 5,
            name: 'Hiking',
            active: false
        },
        {
            id: 6,
            name: 'Karting',
            active: false
        },
    ]);

    const handleSearch = (text) => {
        dispatch(searchActivities(text));
    }

    const handleFilter = (category) => {
        setCategories(categories.map(cat => cat.id === category.id ? { ...cat, active: true } : { ...cat, active: false }));
        dispatch(filterActivities(category.id));
    }

    const addBookmarkFunc = (activityId) => {
        let newBookmark = {
            id: Math.floor(Math.random() * 1000),
            activityId
        }

        console.log('newBookmark', newBookmark)

        dispatch(addBookmark(newBookmark));
    }

    const removeBookmarkFunc = (bookmarkId) => {
        dispatch(deleteBookmark(bookmarkId));
    }

    const handleBookmark = (activityId) => {
        const bookmark = bookmarks.find(bookmark => bookmark.activityId === activityId);
        if (bookmark) {
            removeBookmarkFunc(bookmark.id);
        } else {
            addBookmarkFunc(activityId);
        }
    }

    const renderItem = ({ item, index }) => {
        const isBookmarked = bookmarks.find(bookmark => bookmark.activityId === item.id);

        return (
            <View style={{ marginBottom: 20 }}>
                <Image source={item.images[0]} style={{ width: '100%', height: 200, marginBottom: 10 }} resizeMode="cover" />
                <TouchableOpacity style={{ position: 'absolute', top: 10, right: 10, backgroundColor: 'white', borderRadius: 50, padding: 5 }} onPress={() => handleBookmark(item.id)}>
                    <Image source={require('../../assets/bookmark-filled.png')} style={{
                        width: 15,
                        height: 15,
                        tintColor: isBookmarked ? colors.primary : colors.secondary
                    }} />
                </TouchableOpacity>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 4 }}>
                    <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{item.name}</Text>
                    <ReviewRating rating={item.rate} />
                </View>
                <Text style={{ fontSize: 13, paddingHorizontal: 5 }}>
                    {item.description.length > 200 ? item.description.substring(0, 200) + '...' : item.description}
                </Text>
                <TouchableOpacity style={{ padding: 10, marginTop: 10, alignItems: 'center', backgroundColor: colors.primary, borderRadius: 10 }} onPress={() => navigation.navigate("ActivityDetail", { activityId: item.id })}>
                    <Text style={{ color: 'white' }}>View Details</Text>
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <View style={{ flex: 1, padding: 10 }}>
            <TextInput placeholder="Search activities" style={{ borderWidth: 1, borderColor: colors.secondary, padding: 10, marginBottom: 10, borderRadius: 10, backgroundColor: 'white' }} onChangeText={handleSearch} />

            <View style={{ height: 40, marginBottom: 10 }} >
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {categories.map((category) => (
                        <TouchableOpacity key={category.id} style={{ padding: 10, marginRight: 10, borderWidth: 1, borderColor: colors.secondary, borderRadius: 10, backgroundColor: category.active ? colors.primary : 'white' }} onPress={() => handleFilter(category)}>
                            <Text style={{ fontSize: 12 }}>{category.name}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>

            <FlatList
                data={filteredActivities}
                keyExtractor={(item) => item.id.toString()}
                showsVerticalScrollIndicator={false}
                renderItem={renderItem}
            />
        </View>
    );
};

export default HomeScreen;
