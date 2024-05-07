import React, { useState, useEffect } from 'react'
import { Alert, Button, Image, Pressable, SafeAreaView, StyleSheet, Switch, Text, TextInput, View, FlatList, TouchableOpacity } from 'react-native'

import { colors } from '../constants/colors';

import { useSelector, useDispatch } from 'react-redux';
import { getBookedActivities, deleteBookedActivity, confirmBookedActivity, rejectBookedActivity } from '../stores/bookedActivities/bookedActivitySlice';

const BookedActivitiesScreen = ({ navigation }) => {
    const dispatch = useDispatch();

    const { users, user, isLoggedIn } = useSelector(state => state.user);
    const { bookedActivities, filteredBookedActivities } = useSelector(state => state.bookedActivity);
    const activities = useSelector(state => state.activity.activities);

    useEffect(() => {
        if (isLoggedIn) {
            if (user.isAdmin) {
                console.log('admin')
                dispatch(getBookedActivities());
            } else {
                dispatch(getBookedActivities(user.id));
            }
        }
    }, [isLoggedIn, user, bookedActivities]);

    const statusColor = (status) => {
        if (status === 'confirmed') {
            return 'green';
        } else if (status === 'pending') {
            return 'orange';
        } else {
            return 'red';
        }
    }

    const LoggedInComponent = () => {
        return (
            user.isAdmin ? adminComponent() : userComponent()
        )
    }

    const adminComponent = () => {
        return (
            <SafeAreaView style={{ flex: 1, padding: 10 }}>
                <Text>This is the list of activities you booked!</Text>
                <FlatList
                    data={bookedActivities}
                    renderItem={renderAdminItem}
                    keyExtractor={(item) => item.id.toString()}
                    showsVerticalScrollIndicator={false}
                />
            </SafeAreaView>
        )
    }

    const renderAdminItem = ({ item, index }) => {
        const activity = activities.find((activity) => activity.id === item.activityId);
        const user = users.find((user) => user.id === item.userId);

        return (
            <View style={{ borderBottomColor: colors.primary, paddingVertical: 10, borderBottomWidth: index === bookedActivities.length - 1 ? 0 : 1 }}>
                <View style={{ flexDirection: 'row', paddingVertical: 10 }}>
                    <Image source={activity.images[0]} style={{ width: 50, height: 50 }} />
                    <View style={{ flex: 1, marginLeft: 10 }}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{activity.name}</Text>
                        <Text style={{ fontSize: 12 }}>{activity.description.substring(0, 50)}...</Text>
                    </View>
                </View>

                <View style={{ marginBottom: 10 }}>
                    <Text>Booked By: <Text style={{ fontWeight: 'bold' }}>{user.username}</Text></Text>
                    <Text>Booked Email: <Text style={{ fontWeight: 'bold' }}>{user.email}</Text></Text>
                </View>

                <View>
                    <Text>Booking Date: <Text style={{ fontWeight: 'bold' }}>{item.date}</Text></Text>
                    <Text>Booking Persons: <Text style={{ fontWeight: 'bold' }}>{item.persons}</Text></Text>
                    <Text>Booking Price: <Text style={{ fontWeight: 'bold' }}>{item.price} dh</Text></Text>
                    <Text>Booking Status : <Text style={{ fontWeight: 'bold', color: statusColor(item.status) }}>{item.status}</Text></Text>
                </View>


                {item.status === 'pending' && (
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10, gap: 10 }}>
                        <TouchableOpacity onPress={() => rejectBookedActivityfunc(item.id)} style={{ flex: 1, backgroundColor: colors.secondary, padding: 5, borderRadius: 10, alignItems: 'center' }}>
                            <Text style={{ color: 'white', fontWeight: 'bold' }}>Reject</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => confirmBookedActivityFunc(item.id)} style={{ flex: 1, backgroundColor: colors.primary, padding: 5, borderRadius: 10, alignItems: 'center' }}>
                            <Text style={{ color: 'white', fontWeight: 'bold' }}>Confirm</Text>
                        </TouchableOpacity>
                    </View>
                )}

            </View>
        )
    }

    const confirmBookedActivityFunc = (bookedActivityId) => {
        Alert.alert(
            "Confirm Booking",
            "Are you sure you want to confirm this booking?",
            [
                {
                    text: "No",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                {
                    text: "Yes",
                    onPress: () => {
                        dispatch(confirmBookedActivity(bookedActivityId))
                    }
                }
            ]
        );
    }

    const rejectBookedActivityfunc = (bookedActivityId) => {
        Alert.alert(
            "Reject Booking",
            "Are you sure you want to reject this booking?",
            [
                {
                    text: "No",
                    onPress: () => console.log("Cancel Pressed"),
                },
                {
                    text: "Yes",
                    onPress: () => {
                        dispatch(rejectBookedActivity(bookedActivityId))
                    }
                }
            ]
        );
    }

    const userComponent = () => {
        return (
            <SafeAreaView style={{ flex: 1, padding: 10 }}>
                <Text>This is the list of activities you booked!</Text>
                <FlatList
                    data={filteredBookedActivities}
                    renderItem={renderUserItem}
                    keyExtractor={(item) => item.id.toString()}
                    showsVerticalScrollIndicator={false}
                />
            </SafeAreaView>
        )
    }

    const renderUserItem = ({ item, index }) => {
        const activity = activities.find((activity) => activity.id === item.activityId);
        return (
            <View style={{ borderBottomColor: colors.primary, paddingVertical: 10, borderBottomWidth: index === bookedActivities.length - 1 ? 0 : 1 }}>
                <View style={{ flexDirection: 'row', paddingVertical: 10 }}>
                    <Image source={activity.images[0]} style={{ width: 50, height: 50 }} />
                    <View style={{ flex: 1, marginLeft: 10 }}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{activity.name}</Text>
                        <Text style={{ fontSize: 12 }}>{activity.description.substring(0, 50)}...</Text>
                    </View>
                </View>

                <View>
                    <Text>Booking Date: <Text style={{ fontWeight: 'bold' }}>{item.date}</Text></Text>
                    <Text>Booking Persons: <Text style={{ fontWeight: 'bold' }}>{item.persons}</Text></Text>
                    <Text>Booking Price: <Text style={{ fontWeight: 'bold' }}>{item.price} dh</Text></Text>
                    <Text>Booking Status : <Text style={{ fontWeight: 'bold', color: statusColor(item.status) }}>{item.status}</Text></Text>
                </View>

                {item.status === 'pending' && (
                    <TouchableOpacity onPress={() => removeBookedActivity(item.id)} style={{ backgroundColor: colors.secondary, marginTop: 10, padding: 5, borderRadius: 10, alignItems: 'center' }}>
                        <Text style={{ color: 'white', fontWeight: 'bold' }}>Cancel</Text>
                    </TouchableOpacity>
                )}

            </View>
        )
    }

    const removeBookedActivity = (bookedActivityId) => {
        Alert.alert(
            "Cancel Booking",
            "Are you sure you want to cancel this booking?",
            [
                {
                    text: "No",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                {
                    text: "Yes",
                    onPress: () => {
                        dispatch(deleteBookedActivity(bookedActivityId))
                    }
                }
            ]
        );
    }

    const NotLoggedInComponent = () => {
        return (
            <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontSize: 12, fontWeight: 'bold' }}>You need to login to see your booked activities</Text>
                <View style={styles.buttonView}>
                    <Pressable style={styles.button} onPress={() => navigation.navigate('userContainer', { screen: 'Login' })}>
                        <Text style={styles.buttonText}>Login In</Text>
                    </Pressable>
                </View>
            </SafeAreaView>
        )
    }

    return (
        isLoggedIn ? <LoggedInComponent /> : <NotLoggedInComponent />
    )
}

export default BookedActivitiesScreen

const styles = StyleSheet.create({
    buttonView: {
        width: "100%",
        paddingHorizontal: 40,
        marginTop: 10
    },
    button: {
        backgroundColor: colors.primary,
        height: 45,
        borderColor: "gray",
        borderWidth: 1,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: "center"
    },
    buttonText: {
        color: "white",
        fontSize: 18,
        fontWeight: "bold"
    },
})