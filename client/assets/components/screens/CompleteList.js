import {useNavigation} from "@react-navigation/native";
import React, {useState} from "react";
import {
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
  TextInput,
  Touchable,
} from "react-native";

const Subscription = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState();

  return (
    <View style={{flex: 1, backgroundColor: "#238832"}}>
      {/* Top Section */}
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
            marginLeft: 25,
          }}
        >
          1 of 5
        </Text>
      </View>
      <View>
        <Text style={{fontSize: 12, marginLeft: 60, color: "white"}}>
          Product in 9 lists
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
        }}
      ></View>
    </View>
  );
};

export default Subscription;
