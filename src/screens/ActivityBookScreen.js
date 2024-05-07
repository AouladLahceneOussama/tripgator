import React, { useState, useEffect } from 'react'
import { Alert, Button, Image, Pressable, SafeAreaView, StyleSheet, Switch, Text, TextInput, View, TouchableOpacity, ScrollView } from 'react-native'

import DateTimePicker from 'react-native-ui-datepicker';
import { useSelector, useDispatch } from 'react-redux'

import { colors } from '../constants/colors';
import { addBookedActivity } from '../stores/bookedActivities/bookedActivitySlice';

const ActivityBookScreen = ({ route, navigation }) => {
    const { activityId, offerId } = route.params;
    const { user } = useSelector(state => state.user);
    const activities = useSelector(state => state.activity.activities);
    const activity = activities.find((activity) => activity.id === activityId);
    const offer = activity.offers.find((offer) => offer.id === offerId);

    const [bookContact, setBookContact] = useState({
        lastName: "",
        firstName: "",
        email: "",
        phone: ""
    });

    const [bookActivity, setBookActivity] = useState({
        date: new Date(),
        persons: "1",
        price: offer.price,
    });

    const [bookOptions, setBookOptions] = useState({
        transportation: {
            value: false,
            price: 40
        },
        accommodation: {
            value: false,
            price: 100
        }
    });

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

    useEffect(() => {
        const calculatePrice = () => {
            let price = offer.price * parseInt(bookActivity.persons || 1);
            if (bookOptions.transportation.value) {
                price += bookOptions.transportation.price * bookActivity.persons;
            }
            if (bookOptions.accommodation.value) {
                price += bookOptions.accommodation.price;
            }
            return price;
        }

        setBookActivity(prevState => ({ ...prevState, price: calculatePrice() }));
    }, [bookActivity.persons, bookOptions.transportation.value, bookOptions.accommodation.value, offer.price, bookOptions.transportation.price, bookOptions.accommodation.price]);

    const dispatch = useDispatch();
    const book = () => {
        if (!bookActivity.date) {
            Alert.alert("Please select a date")
            return;
        }

        // check date is not in the past
        if (bookActivity.date < new Date()) {
            Alert.alert("Please select a valid date")
            return;
        }

        if (bookActivity.persons < 1) {
            Alert.alert("Please select at least one person")
            return;
        }

        if (!bookContact.lastName || !bookContact.firstName || !bookContact.email || !bookContact.phone) {
            Alert.alert("Please fill the contact the fields")
            return;
        }

        // verify email
        const emailRegex = /\S+@\S+\.\S+/;
        if (!emailRegex.test(bookContact.email)) {
            Alert.alert("Please enter a valid email")
            return;
        }

        // verify phone
        const phoneRegex = /^[0-9]{10}$/;
        if (!phoneRegex.test(bookContact.phone)) {
            Alert.alert("Please enter a valid phone number")
            return;
        }

        const data = {
            id: Math.floor(Math.random() * 1000),
            userId: user.id,
            activityId: activity.id,
            offerId: offer.id,
            date: bookActivity.date.toISOString().split('T')[0],
            persons: bookActivity.persons,
            price: parseInt(bookActivity.price || 1),
            status: "pending",
            options: bookOptions,
            contact: bookContact
        }

        dispatch(addBookedActivity(data));

        Alert.alert(
            "Booked Successfully",
            "Your booking will be condfirmed soon",
            [
                {
                    text: "ok",
                    onPress: () => {
                        navigation.popToTop()
                    }
                }
            ]
        );
    }

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <Text style={{ fontSize: 14, marginBottom: 10, color: 'gray' }}>Please fill in the information below to book the activity</Text>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
                    {activity.name}
                </Text>
                <Text style={{ fontSize: 18, fontWeight: 'bold', backgroundColor: colors.primary, color: colors.secondary, paddingHorizontal: 10, paddingVertical: 5, borderRadius: 10 }}>
                    {bookActivity.price} dh
                </Text>
            </View>
            <Text style={{ fontSize: 12., marginBottom: 10 }}>{activity.description}</Text>

            <Text style={{ fontSize: 15, fontWeight: 'bold', marginBottom: 10 }}>Activity Information</Text>
            <View style={styles.inputView}>
                <Text style={{ fontSize: 12, color: colors.secondary }}>Date *</Text>
                <DateTimePicker
                    mode="single"
                    date={bookActivity.date}
                    onChange={(params) => setBookActivity({ ...bookActivity, date: params.date })}
                    minDate={new Date()}
                    selectedItemColor={colors.primary}
                />
                <Text style={{ fontSize: 12, color: colors.secondary }}>Number of persons *</Text>
                <TextInput style={styles.input} placeholder='Number of persons' value={bookActivity.persons} autoCorrect={false} autoCapitalize='none' keyboardType='numeric' onChangeText={(text) => {
                    setBookActivity({ ...bookActivity, persons: text })
                }} />
            </View>

            <Text style={{ fontSize: 15, fontWeight: 'bold' }}>Activity Options</Text>
            <View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: -20 }}>
                    <Text>Transportation +({bookOptions.transportation.price}dh / person) * {bookActivity.persons || 1}</Text>
                    <Switch
                        trackColor={{ false: colors.secondary, true: colors.primary }}
                        value={bookOptions.transportation.value}
                        onValueChange={(value) => {
                            setBookOptions({ ...bookOptions, transportation: { value: value, price: bookOptions.transportation.price } })
                        }} />
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text>Accommodation +({bookOptions.accommodation.price}dh)</Text>
                    <Switch
                        trackColor={{ false: colors.secondary, true: colors.primary }}
                        value={bookOptions.accommodation.value}
                        onValueChange={(value) => {
                            setBookOptions({ ...bookOptions, accommodation: { value: value, price: bookOptions.accommodation.price } })
                        }} />
                </View>
            </View>

            <Text style={{ fontSize: 15, fontWeight: 'bold', marginBottom: 10 }}>Contact Information</Text>
            <View style={styles.inputView}>
                <TextInput style={styles.input} placeholder='Last name' value={bookContact.lastName} autoCorrect={false} autoCapitalize='none' onChangeText={(text) => setBookContact({ ...bookContact, lastName: text })} />
                <TextInput style={styles.input} placeholder='First name' value={bookContact.firstName} autoCorrect={false} autoCapitalize='none' onChangeText={(text) => setBookContact({ ...bookContact, firstName: text })} />
                <TextInput style={styles.input} placeholder='Email' value={bookContact.email} autoCorrect={false} autoCapitalize='none' onChangeText={(text) => setBookContact({ ...bookContact, email: text })} />
                <TextInput style={styles.input} placeholder='Phone' value={bookContact.phone} autoCorrect={false} autoCapitalize='none' onChangeText={(text) => setBookContact({ ...bookContact, phone: text })} />
            </View>

            <Text style={styles.optionsText}>*Additional charges may apply</Text>

            <View style={styles.buttonView}>
                <Pressable style={styles.button} onPress={() => book()}>
                    <Text style={styles.buttonText}>Book</Text>
                </Pressable>
            </View>

        </ScrollView>
    )
}

export default ActivityBookScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10
    },
    inputView: {
        gap: 15,
        width: "100%",
        marginBottom: 20
    },
    input: {
        height: 40,
        paddingHorizontal: 10,
        borderColor: colors.secondary,
        borderWidth: 1,
        borderRadius: 7
    },
    switch: {
        gap: 1,
        flexDirection: "row-reverse",
        justifyContent: "center",
        alignItems: "center"
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
    buttonView: {
        width: "100%",
        marginTop: 10,
        marginBottom: 20
    },
    optionsText: {
        color: "gray",
        fontSize: 12,
        marginTop: -10,
    },
    mediaIcons: {
        flexDirection: "row",
        gap: 15,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 23
    },
    icons: {
        width: 40,
        height: 40,
    },
    footerText: {
        textAlign: "center",
        color: "gray",
    },
    signup: {
        color: colors.primary,
        fontSize: 13
    }
})