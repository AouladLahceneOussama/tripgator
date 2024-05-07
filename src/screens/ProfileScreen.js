import React, { useState, useEffect } from 'react'
import { Alert, Button, Image, Pressable, SafeAreaView, StyleSheet, Switch, Text, TextInput, View, TouchableOpacity } from 'react-native'

import { colors } from '../constants/colors';

import { useSelector, useDispatch } from 'react-redux'
import { logoutUser } from '../stores/user/userSlice'

const ProfileScreen = ({ navigation }) => {
    const dispatch = useDispatch()
    const { user, isLoggedIn } = useSelector(state => state.user);

    const logout = () => {
        dispatch(logoutUser())
    }

    return (
        isLoggedIn && (
            <SafeAreaView style={{ flex: 1 }}>

                <View style={styles.container}>
                    <View style={styles.header}></View>
                    <Image
                        style={styles.avatar}
                        source={{ uri: user.profileImage }}
                    />
                    <View style={styles.body}>
                        <View style={styles.bodyContent}>
                            <Text style={styles.name}>{user.username}</Text>
                            <Text style={styles.email}>{user.email}</Text>
                            <Text style={styles.bio}>{user.bio}</Text>

                            <TouchableOpacity style={styles.buttonContainer} onPress={() => logout()}>
                                <Text>Logout</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </SafeAreaView>
        )
    )
}

export default ProfileScreen

const styles = StyleSheet.create({
    header: {
        backgroundColor: colors.primary,
        height: 150,
    },
    avatar: {
        width: 130,
        height: 130,
        borderRadius: 63,
        borderWidth: 4,
        borderColor: 'white',
        marginBottom: 10,
        alignSelf: 'center',
        position: 'absolute',
        marginTop: 80,
    },
    name: {
        fontSize: 22,
        color: '#FFFFFF',
        fontWeight: '600',
    },
    body: {
        marginTop: 40,
    },
    bodyContent: {

        alignItems: 'center',
        padding: 30,
    },
    name: {
        fontSize: 28,
        color: '#696969',
        fontWeight: '600',
    },
    email: {
        fontSize: 16,
        color: '#00BFFF',
        marginTop: 10,
    },
    bio: {
        fontSize: 16,
        color: '#696969',
        marginTop: 10,
        textAlign: 'center',
    },
    buttonContainer: {
        marginTop: 10,
        height: 45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: 250,
        borderRadius: 30,
        backgroundColor: colors.primary,
    },
})