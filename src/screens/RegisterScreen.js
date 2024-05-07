import React, { useState, useEffect } from 'react'
import { Alert, Button, Image, Pressable, SafeAreaView, StyleSheet, Switch, Text, TextInput, View, TouchableOpacity } from 'react-native'

import { registerUser } from '../stores/user/userSlice'
import { useDispatch } from 'react-redux'

import { colors } from '../constants/colors';

const RegisterScreen = ({ navigation }) => {
    const dispatch = useDispatch()
    const logo = require("../../assets/logo.png")
    const [client, setClient] = useState({
        email: "",
        username: "",
        password: ""
    })

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

    const register = () => {
        if (!client.email || !client.username || !client.password) {
            Alert.alert("Please fill all fields")
            return
        }

        // verify email
        const emailRegex = /\S+@\S+\.\S+/;
        if (!emailRegex.test(client.email)) {
            Alert.alert("Please enter a valid email")
            return;
        }

        // verify password
        if (client.password.length < 6) {
            Alert.alert("Password must be at least 6 characters")
            return;
        }

        const newClient = {
            id: Math.floor(Math.random() * 1000),
            email: client.email,
            username: client.username,
            password: client.password,
            profileImage: 'https://i.pravatar.cc/300?img=' + Math.floor(Math.random() * 50),
            job: 'Tester',
            bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac purus sit amet nisl tincidunt tincidunt vel vitae odio. Sed id metus felis. Sed ac purus sit amet nisl tincidunt tincidunt vel vitae odio. Sed id metus felis.',
            isAdmin: false
        }

        dispatch(registerUser(newClient))
    }

    return (
        <SafeAreaView style={styles.container}>
            <Image source={logo} style={styles.image} resizeMode='contain' />
            <Text style={styles.title}>Sign Up</Text>

            <View style={styles.inputView}>
                <Text style={{ fontSize: 12, color: colors.secondary, marginBottom: -10 }}>Email *</Text>
                <TextInput style={styles.input} placeholder='Email' value={client.email} autoCorrect={false} autoCapitalize='none' onChangeText={(text) => setClient({ ...client, email: text })} />

                <Text style={{ fontSize: 12, color: colors.secondary, marginBottom: -10 }}>Username *</Text>
                <TextInput style={styles.input} placeholder='Username' value={client.username} autoCorrect={false} autoCapitalize='none' onChangeText={(text) => setClient({ ...client, username: text })} />

                <Text style={{ fontSize: 12, color: colors.secondary, marginBottom: -10 }}>Password *</Text>
                <TextInput style={styles.input} placeholder='Password' secureTextEntry value={client.password} autoCorrect={false} autoCapitalize='none' onChangeText={(text) => setClient({ ...client, password: text })} />
            </View>

            <View style={styles.buttonView}>
                <Pressable style={styles.button} onPress={() => register()}>
                    <Text style={styles.buttonText}>Sign Up</Text>
                </Pressable>
            </View>

        </SafeAreaView>
    )
}

export default RegisterScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        alignItems: "center",
        paddingTop: 50,
    },
    image: {
        height: 100,
        width: 100,
    },
    title: {
        fontSize: 30,
        fontWeight: "bold",
        textTransform: "uppercase",
        textAlign: "center",
        paddingVertical: 40,
        color: colors.primary
    },
    inputView: {
        gap: 15,
        width: "100%",
        paddingHorizontal: 40,
        marginBottom: 5
    },
    input: {
        height: 40,
        paddingHorizontal: 10,
        borderColor: colors.secondary,
        borderWidth: 1,
        borderRadius: 7
    },
    rememberView: {
        width: "100%",
        paddingHorizontal: 50,
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        marginBottom: 8
    },
    switch: {
        flexDirection: "row",
        gap: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    rememberText: {
        fontSize: 13
    },
    forgetText: {
        fontSize: 11,
        color: colors.secondary
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
        paddingHorizontal: 40,
        marginTop: 10
    },
    optionsText: {
        textAlign: "center",
        paddingVertical: 10,
        color: "gray",
        fontSize: 13,
        marginBottom: 6
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