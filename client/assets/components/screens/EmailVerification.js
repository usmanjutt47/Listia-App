import React, {useState, useRef} from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  ImageBackground,
} from "react-native";
import {useNavigation} from "@react-navigation/native";

const EmailVerification = () => {
  const navigation = useNavigation();

  const inputRefs = [
    useRef(null),
    useRef(null, useRef(null)),
    useRef(null),
    useRef(null),
  ];

  const [inputs, setInputs] = useState([
    {text: "", borderColor: "#F2F2F2"},
    {text: "", borderColor: "#F2F2F2"},
    {text: "", borderColor: "#F2F2F2"},
    {text: "", borderColor: "#F2F2F2"},
  ]);

  const handleInputChange = (index, text) => {
    const newInputs = [...inputs];

    newInputs[index].text = text;
    newInputs[index].borderColor = text ? "#238832" : "#F2F2F2";

    setInputs(newInputs);

    if (text === "" && index > 0) {
      inputRefs[index - 1].current.focus();
      handleInputChange(index - 1, "");
    } else if (text.length === 1 && index < 3) {
      inputRefs[index + 1].current.focus();
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: "#238832"}}>
      {/* Top Section */}
      <View style={{flexDirection: "row", alignItems: "center", marginTop: 20}}>
        <View style={{left: 10, top: 3}}>
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
            textAlign: "center",
          }}
        >
          Email Verification
        </Text>
      </View>

      {/* Content Section */}
      <View
        style={{
          flex: 1,
          backgroundColor: "#fff",
          borderTopRightRadius: 35,
          borderTopLeftRadius: 35,
          marginTop: 20,
          padding: 20,
        }}
      >
        {/* Image */}
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require("../images/emailverfication.png")}
            style={{
              width: 290,
              height: 324,
              marginBottom: 20,
              justifyContent: "center",
            }}
          />
        </TouchableOpacity>

        {/* Text Inputs */}
        <View
          style={{
            flexDirection: "row",
            margin: 10,
            justifyContent: "space-between",
          }}
        >
          {inputs.map((input, index) => (
            <View
              key={index}
              style={{
                width: 50,
                height: 50,
                borderRadius: 10,
                backgroundColor: "#fff",
                borderWidth: 1,
                borderColor: input.borderColor,
              }}
            >
              <TextInput
                ref={inputRefs[index]}
                maxLength={1}
                keyboardType="decimal-pad"
                style={{
                  textAlign: "center",
                  fontSize: 25,
                  alignSelf: "center",
                  margin: 7,
                }}
                value={input.text}
                onChangeText={(text) => handleInputChange(index, text)}
              />
            </View>
          ))}
        </View>

        {/* Button */}
        <TouchableOpacity
          onPress={() => navigation.navigate("ChangePassword")}
          style={{
            backgroundColor: "#238832",
            padding: 18,
            justifyContent: "center",
            borderRadius: 35,
            marginTop: "40%",
          }}
        >
          <Text style={{color: "#fff", textAlign: "center", fontSize: 17}}>
            Next
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default EmailVerification;
