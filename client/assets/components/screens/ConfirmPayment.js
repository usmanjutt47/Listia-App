import React, {useState} from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  ImageBackground,
} from "react-native";
import {useNavigation, useRoute} from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";

const ConfirmPayment = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {price} = route.params;

  const [cardHolderName, setCardHolderName] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [cardNumber, setCardNumber] = useState("");

  const [focusedInput, setFocusedInput] = useState(null);

  const handleCardHolderNameChange = (input) => {
    setCardHolderName(input);
  };

  const handleCardNumberChange = (input) => {
    const numericInput = input.replace(/[^0-9]/g, "");
    const limitedInput = numericInput.slice(0, 16);
    const formattedInput = limitedInput.match(/.{1,4}/g)?.join(" ") || "";
    setCardNumber(formattedInput);
  };

  const handleExpirationDateChange = (input) => {
    const numericInput = input.replace(/[^0-9]/g, "");
    if (numericInput.length > 4) {
      return;
    }
    let formattedInput = numericInput;
    if (numericInput.length > 2) {
      formattedInput = `${numericInput.slice(0, 2)}/${numericInput.slice(2)}`;
    }
    setExpirationDate(formattedInput);
  };

  const handleFocus = (input) => {
    setFocusedInput(input);
  };

  const handleBlur = () => {
    setFocusedInput(null);
  };

  const getTextInputStyle = (input) => {
    const isFocused = focusedInput === input;
    return {
      borderRadius: 30,
      backgroundColor: "#F2F2F2",
      height: 48,
      paddingLeft: 10,
      width: "90%",
      borderWidth: 1,
      borderColor: isFocused ? "#238832" : "#F2F2F2",
      marginTop: 15,
      color: isFocused ? "#238832" : "#838383",
    };
  };

  return (
    <View style={{flex: 1, backgroundColor: "#238832"}}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginTop: 20,
        }}
      >
        <View style={{left: 20, top: 3}}>
          <ImageBackground
            source={require("../images/gobackBackground.png")}
            style={{height: 35, width: 35, justifyContent: "center"}}
          >
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image
                source={require("../images/goback.png")}
                style={{height: 15, width: 15, alignSelf: "center"}}
              />
            </TouchableOpacity>
          </ImageBackground>
        </View>

        <Text
          style={{
            color: "#fff",
            fontSize: 23,
            fontWeight: "bold",
            flex: 1,
            marginLeft: "20%",
          }}
        >
          Confirm Payment
        </Text>
      </View>

        <View
        style={{
          flex: 1,
          backgroundColor: "#fff",
          borderTopRightRadius: 35,
          borderTopLeftRadius: 35,
          marginTop: 20,
          padding: 20,
          alignContent: "center",
        }}
      >
        <ScrollView showsVerticalScrollIndicator={false}> 

       
        <ImageBackground
          source={require("../images/card.png")}
          style={{
            height: 221,
            width: "100%",
            overflow: "hidden",
            borderRadius: 30,
          }}
        >
          <Text
            style={{color: "#fff", fontSize: 15, marginTop: 20, marginLeft: 10}}
          >
            Card Holder’s Name:{" "}
            <Text style={{fontSize: 15, fontWeight: "bold"}}>
              {cardHolderName}
            </Text>
          </Text>

          <View
            style={{flexDirection: "row", marginTop: 50, alignItems: "center"}}
          >
            <Text style={{color: "#fff", fontSize: 15, marginLeft: 20}}>
              Card Number:{" "}
              <Text style={{fontSize: 15, fontWeight: "bold"}}>
                {cardNumber}
              </Text>
            </Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              marginTop: "23%",
              marginLeft: 20,
              justifyContent: "space-between",
              marginBottom: 1,
            }}
          >
            <Text style={{color: "#fff", bottom: 10}}>VALID THRU</Text>
            <Text style={{color: "#fff", marginRight: 20, bottom: 10}}>
              Balance
            </Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              marginLeft: 20,
              justifyContent: "space-between",
            }}
          >
            <Text style={{color: "#fff", bottom: 10}}>{expirationDate}</Text>
            <Text style={{color: "#fff", marginRight: 20, bottom: 10}}>
              ${price}
            </Text>
          </View>
        </ImageBackground>

        <View style={{alignItems: "center", marginTop: "20%"}}>
          <TextInput
            value={cardNumber}
            onChangeText={handleCardNumberChange}
            placeholder="Card Number"
            inputMode="numeric"
            placeholderTextColor={
              focusedInput === "cardNumber" ? "#238832" : "#838383"
            }
            style={getTextInputStyle("cardNumber")}
            onFocus={() => handleFocus("cardNumber")}
            onBlur={handleBlur}
          />

          <TextInput
            value={expirationDate}
            onChangeText={handleExpirationDateChange}
            placeholder="Expiration Date (MM/YY)"
            inputMode="numeric"
            placeholderTextColor={
              focusedInput === "expirationDate" ? "#238832" : "#838383"
            }
            style={getTextInputStyle("expirationDate")}
            onFocus={() => handleFocus("expirationDate")}
            onBlur={handleBlur}
          />

          <TextInput
            value={cardHolderName}
            onChangeText={handleCardHolderNameChange}
            placeholder="Card Holder’s Name"
            inputMode="text"
            placeholderTextColor={
              focusedInput === "cardHolderName" ? "#238832" : "#838383"
            }
            style={getTextInputStyle("cardHolderName")}
            onFocus={() => handleFocus("cardHolderName")}
            onBlur={handleBlur}
          />
        </View>

        <View
          style={{
            height: 48,
            backgroundColor: "#F2F2F2",
            borderRadius: 30,
            marginTop: "20%",
            width: "90%",
            alignSelf: "center",
            justifyContent: "space-between",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Text style={{color: "black", marginLeft: 20, fontWeight: "bold"}}>
            TOTAL
          </Text>
          <Text style={{color: "black", marginRight: 20, fontWeight: "bold"}}>
            ${price}
          </Text>
        </View>

        <TouchableOpacity
          onPress={() => navigation.navigate("PaymentHistory")}
          style={{
            height: 48,
            backgroundColor: "#238832",
            borderRadius: 30,
            justifyContent: "center",
            marginTop: 20,
            width: "90%",
            alignSelf: "center",
          }}
        >
          <Text style={{color: "#fff", textAlign: "center", fontSize: 17}}>
            Pay Now
          </Text>
        </TouchableOpacity>
        </ScrollView>
      </View>
    </View>
  );
};

export default ConfirmPayment;
