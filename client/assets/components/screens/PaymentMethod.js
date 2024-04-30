import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, ImageBackground } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { AntDesign, Entypo, Feather } from '@expo/vector-icons';

const PaymentMethod = ({ price: propPrice, duration: propDuration }) => {
    const navigation = useNavigation();
    const route = useRoute();
    
    // Use prop values or route params
    const { price = propPrice, duration = propDuration } = route.params || {};
    
    // State for selected payment method
    const [selectedMethod, setSelectedMethod] = useState(null);
    
    // Handle method selection
    const handleMethodSelection = (method) => {
        setSelectedMethod(selectedMethod === method ? null : method);
    };
    
    // Handle navigation to ConfirmPayment
    const handleNext = () => {
        navigation.navigate('ConfirmPayment', { price, duration });
    };
    
    return (
        <View style={{ flex: 1, backgroundColor: '#238832' }}>
            {/* Header */}
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20 }}>
                <TouchableOpacity onPress={() => navigation.navigate('Subscription')}>
                    <ImageBackground
                        source={require('../images/gobackBackground.png')}
                        style={{ height: 35, width: 35, justifyContent: 'center', marginLeft: 10 }}
                    >
                        <Image
                            source={require('../images/goback.png')}
                            style={{ height: 15, width: 15, alignSelf: 'center' }}
                        />
                    </ImageBackground>
                </TouchableOpacity>
                <Text style={{ flex: 1, textAlign: 'center', color: '#fff', fontSize: 23, fontWeight: 'bold' }}>
                    Payment Method
                </Text>
            </View>
            
            {/* Content */}
            <View style={{
                flex: 1,
                backgroundColor: '#fff',
                borderTopRightRadius: 35,
                borderTopLeftRadius: 35,
                marginTop: 20,
                padding: 20,
            }}>
                {/* Displaying price and duration */}
                <Text style={{ textAlign: 'center', color: '#258F37', fontSize: 20, marginTop: '30%', fontWeight: 'bold' }}>
                    ${price?.toFixed(2)} / {duration}
                </Text>
                
                {/* Payment method option */}
                <TouchableOpacity
                    style={{
                        marginTop: 20,
                        backgroundColor: '#258F37',
                        height: 51,
                        width: '90%',
                        borderRadius: 30,
                        alignSelf: 'center',
                        justifyContent: 'center',
                        paddingHorizontal: 20,
                    }}
                    onPress={() => handleMethodSelection('apple')}
                >
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <AntDesign
                                name="apple1"
                                size={24}
                                color="#fff"
                                style={{ marginRight: 10 }}
                            />
                            <Text style={{ color: '#fff', fontSize: 16 }}>Apple</Text>
                        </View>
                        {/* Displaying circle or check circle icon based on selection */}
                        {selectedMethod === 'apple' ? (
                            <Feather name="check-circle" size={24} color="#fff" />
                        ) : (
                            <Entypo name="circle" size={24} color="#fff" />
                        )}
                    </View>
                </TouchableOpacity>
                
                {/* Next button */}
                <View style={{
                    flex: 1,
                    justifyContent: 'flex-end',
                    marginBottom: 20,
                    alignItems: 'center',
                }}>
                    <TouchableOpacity
                        style={{
                            backgroundColor: selectedMethod ? '#258F37' : '#d3d3d3',
                            height: 48,
                            width: '90%',
                            borderRadius: 35,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                        onPress={handleNext}
                        disabled={!selectedMethod}
                    >
                        <Text style={{ textAlign: 'center', fontSize: 18, color: '#fff' }}>
                            Payment
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

export default PaymentMethod;
