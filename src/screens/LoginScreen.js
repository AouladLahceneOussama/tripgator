import React, { useState } from 'react'
import { Alert, Button, Image, Pressable, SafeAreaView, StyleSheet, Switch, Text, TextInput, View } from 'react-native'

import { colors } from '../constants/colors';

import { loginUser } from '../stores/user/userSlice'
import { useSelector, useDispatch } from 'react-redux'

const logo = require("../../assets/logo.png")
const facebook = require("../../assets/facebook.png")
const google = require("../../assets/google.png")
const twitter = require("../../assets/twitter.png")

const LoginScreen = ({ navigation }) => {
    const dispatch = useDispatch()

    const { loginError } = useSelector(state => state.user)
    const [loginClient, setLoginClient] = useState({
        login: "",
        password: "",
        remember: false
    })

    const login = () => {
        if (!loginClient.login || !loginClient.password) {
            Alert.alert("Please fill all fields")
            return
        }

        dispatch(loginUser(loginClient))
    }

    return (
        <SafeAreaView style={styles.container}>

            <Image source={logo} style={styles.image} resizeMode='contain' />
            <Text style={styles.title}>Login</Text>

            {loginError && <Text style={{ color: 'red' }}>{loginError}</Text>}

            <View style={styles.inputView}>
                <Text style={{ fontSize: 12, color: colors.secondary, marginBottom: -10 }}>Email *</Text>
                <TextInput style={styles.input} placeholder='Email or Username' value={loginClient.login} autoCorrect={false} autoCapitalize='none' onChangeText={(text) => setLoginClient({ ...loginClient, login: text })} />

                <Text style={{ fontSize: 12, color: colors.secondary, marginBottom: -10 }}>Password *</Text>
                <TextInput style={styles.input} placeholder='Password' secureTextEntry value={loginClient.password} autoCorrect={false} autoCapitalize='none' onChangeText={(text) => setLoginClient({ ...loginClient, password: text })} />
            </View>

            <View style={styles.rememberView}>
                <View style={styles.switch}>
                    <Switch value={loginClient.remember} trackColor={{ true: "green", false: "gray" }} onValueChange={() => setLoginClient({ ...loginClient, remember: !loginClient.remember })} />
                    <Text style={styles.rememberText}>Remember Me</Text>
                </View>
                <View>
                    <Pressable onPress={() => Alert.alert("Forget Password!")}>
                        <Text style={styles.forgetText}>Forgot Password?</Text>
                    </Pressable>
                </View>
            </View>

            <View style={styles.buttonView}>
                <Pressable style={styles.button} onPress={() => login()}>
                    <Text style={styles.buttonText}>LOGIN</Text>
                </Pressable>
                <Text style={styles.optionsText}>OR LOGIN WITH</Text>
            </View>

            <View style={styles.mediaIcons}>
                <Image source={facebook} style={styles.icons} />
                <Image source={google} style={styles.icons} />
                <Image source={twitter} style={styles.icons} />
            </View>

            <Text style={styles.footerText}>
                Don't Have Account?
                <Text style={styles.signup} onPress={() => navigation.navigate("Register")}> Sign Up</Text>
            </Text>

        </SafeAreaView>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        paddingTop: 40,
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
        paddingVertical: 30,
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
        paddingHorizontal: 40,
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
        paddingHorizontal: 40
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