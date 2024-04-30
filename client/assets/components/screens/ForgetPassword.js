import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
    View,
    Text,
    Image,
    ImageBackground,
    TouchableOpacity,
    TextInput,
    Alert,
} from 'react-native';
import axios from 'axios'; // Import axios

const ForgetPassword = () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');

    // Define axios instance with base URL
    const axiosInstance = axios.create({
        baseURL: 'http://localhost:3000', // Replace with your backend server base URL
    });

    const handleConfirmPress = async () => {
        try {
           navigation.navigate('EmailVerification')
        } catch (error) {
           
        }
    };

    return (
        <View style={{ flex: 1, backgroundColor: '#238832' }}>
            {/* Top Section */}
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20 }}>
                <View style={{ left: 10, top: 3 }}>
                    <ImageBackground
                        source={require('../images/gobackBackground.png')}
                        style={{ height: 35, width: 35, justifyContent: 'center' }}
                    >
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Image
                                source={require('../images/goback.png')}
                                style={{ height: 15, width: 15, alignSelf: 'center' }}
                            />
                        </TouchableOpacity>
                    </ImageBackground>
                </View>

                <Text style={{ color: '#fff', fontSize: 23, fontWeight: 'bold', flex: 1, textAlign: 'center' }}>
                    Forget Password
                </Text>
            </View>

            <View
                style={{
                    flex: 1,
                    backgroundColor: '#fff',
                    borderTopRightRadius: 35,
                    borderTopLeftRadius: 35,
                    marginTop: 20,
                    padding: 20,
                }}
            >
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image
                        source={require('../images/forgetPassword.png')}
                        style={{ width: 317, height: 304, marginBottom: 20 }}
                    />
                </TouchableOpacity>

                <Text style={{ fontSize: 13, color: '#000', marginLeft: 10, bottom: 5 }}>Enter Email</Text>
                <TextInput
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                    placeholder="Enter Email"
                    inputMode='email'
                    style={{
                        padding: 10,
                        backgroundColor: '#F2F2F2',
                        borderRadius: 35,
                        paddingLeft: 10,
                    }}
                />

                <TouchableOpacity
                    onPress={handleConfirmPress}
                    style={{
                        backgroundColor: '#238832',
                        padding: 18,
                        justifyContent: 'center',
                        borderRadius: 35,
                        marginTop: '40%',
                    }}
                >
                    <Text style={{ color: '#fff', textAlign: 'center', fontSize: 17 }}>
                        Confirm
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default ForgetPassword;
