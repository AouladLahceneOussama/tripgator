import React, { useState, useEffect, useCallback } from 'react'
import { Alert, Button, Image, Pressable, FlatList, SafeAreaView, StyleSheet, Switch, Text, TextInput, View, TouchableOpacity, Dimensions, ScrollView } from 'react-native'
import { useSelector } from 'react-redux';

import { Carousel } from 'react-native-basic-carousel';
import { colors } from '../constants/colors';

import ReviewRating from '../components/ReviewRating';

const ActivityDetailScreen = ({ route, navigation }) => {
    const { activityId } = route.params;
    const { width } = Dimensions.get('window')

    const { isLoggedIn } = useSelector(state => state.user);
    const { activities } = useSelector(state => state.activity);
    const activity = activities.find((activity) => activity.id === activityId);

    useEffect(() => {
        navigation.setOptions({
            headerTitle: "",
            headerLeft: () => (
                <View style={{ flexDirection: "row", alignItems: "center", marginLeft: 10 }}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Image
                            source={require("../../assets/previous.png")}
                            resizeMode="contain"
                            style={{
                                width: 16,
                                height: 16,
                                tintColor: colors.primary
                            }}
                        />
                    </TouchableOpacity>
                    <Image
                        source={require('../../assets/logo.png')}
                        style={{ height: 20, width: 20, marginLeft: 10 }}
                    />
                </View>
            ),
        })
    }, [])

    const [selectedOffer, setSelectedOffer] = useState(null); // State to store the selected offer

    const renderItem = ({ item, index }) => {
        return (
            <View key={index} style={styles.container}>
                <Image source={item} style={{ width: '100%', height: 300 }} resizeMode="cover" />
            </View>
        )
    }

    const bookOffer = () => {
        if (!isLoggedIn) {
            Alert.alert("Please login to book an activity.", "", [
                {
                    text: "Cancel",
                },
                {
                    text: "Login",
                    onPress: () => navigation.navigate('userContainer', { screen: 'Login' })
                }
            ])
            return;
        }

        if (selectedOffer === null) {
            Alert.alert("Please select an offer to book.")
        } else {
            navigation.navigate('ActivityBook', { activityId, offerId: selectedOffer });
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                ListHeaderComponent={
                    <>
                        <View style={{ height: 300 }}>
                            <Carousel
                                data={activity.images}
                                renderItem={({ item, index }) => renderItem({ item, index })}
                                itemWidth={width}
                                autoplay
                            />
                        </View>

                        <View style={{ padding: 20 }}>
                            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Activity Details</Text>
                            <Text style={{ fontSize: 16, marginTop: 10 }}>{activity.name}</Text>
                            <Text style={{ fontSize: 14, color: 'gray' }}>{activity.description}.</Text>
                        </View>

                        <View style={{ backgroundColor: '#f5f5f5', padding: 20 }}>
                            <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>Offers</Text>
                            {activity.offers.map((offer) => (
                                <View key={offer.id.toString()} style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Switch
                                        trackColor={{ false: colors.secondary, true: colors.primary }}
                                        value={selectedOffer === offer.id}
                                        onValueChange={() => setSelectedOffer(offer.id)}
                                    />
                                    <Text style={{ marginLeft: 10, flex: 1 }}>{offer.name} - {offer.description}</Text>
                                </View>
                            ))}

                            <View style={styles.buttonView}>
                                <Pressable style={styles.button} onPress={() => bookOffer()}>
                                    <Text style={styles.buttonText}>Book Now</Text>
                                </Pressable>
                            </View>
                        </View>
                    </>
                }
                ListFooterComponent={
                    <View style={{ padding: 20 }}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>Reviews ({activity.reviews.length})</Text>
                        <FlatList
                            data={activity.reviews}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={({ item }) => (
                                <View style={{ marginBottom: 20, flexDirection: 'row', alignItems: 'center' }}>
                                    <Image source={{ uri: item.image }} style={{ width: 50, height: 50, borderRadius: 25 }} />
                                    <View style={{ marginLeft: 10 }}>
                                        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{item.username}</Text>
                                        <ReviewRating rating={item.rating} />
                                        <Text>{item.comment}</Text>
                                    </View>
                                </View>
                            )}
                        />
                    </View>
                }
            />
        </SafeAreaView>
    )
}

export default ActivityDetailScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    text: {
        color: 'white',
        fontSize: 20,
        textAlign: 'center'
    },
    buttonView: {
        width: "100%",
        marginTop: 20
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