import {useNavigation} from "@react-navigation/native";
import React, {useEffect, useState} from "react";
import {
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
  TextInput,
  Touchable,
} from "react-native";
import {Feather, AntDesign, FontAwesome5} from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Profile = () => {
  const [user, setUser] = useState(null);
  const navigation = useNavigation();
  const [changePassword, setChangePassword] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Retrieve data from AsyncStorage
        const data = await AsyncStorage.getItem("@auth");
        if (data) {
          const parsedData = JSON.parse(data);
          // Update state with user data
          setUser(parsedData.user);
        }
      } catch (error) {
        console.error("Error fetching data from AsyncStorage:", error);
      }
    };
    fetchData();
  }, []);

  const userName = user ? user.name : "Guest";

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
          Profile
        </Text>
      </View>
      <View style={{alignSelf: "center", marginTop: 20, alignItems: "center"}}>
        <ImageBackground
          source={require("../images/photo.png")}
          style={{height: 83, width: 83}}
        >
          <TouchableOpacity onPress={() => navigation.navigate("EditProfile")}>
            <FontAwesome5
              name="edit"
              size={22}
              color="#fff"
              style={{marginTop: 50, marginLeft: 60}}
            />
          </TouchableOpacity>
        </ImageBackground>
        <Text style={{textAlign: "center", fontSize: 18, color: "#fff"}}>
          {userName}
        </Text>
        <Text style={{textAlign: "center", fontSize: 15, color: "#fff"}}>
          {user ? user.email : "user@gmail.com"}
        </Text>
      </View>

      <View
        style={{
          flex: 1,
          backgroundColor: "#fff",
          borderTopRightRadius: 35,
          borderTopLeftRadius: 35,
          marginTop: "20%",
          padding: 20,
        }}
      >
        <View
          style={{
            height: 48,
            width: "90%",
            backgroundColor: "#F2F2F2",
            alignSelf: "center",
            borderRadius: 30,
            justifyContent: "space-between",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Text style={{color: "#606060", marginLeft: 10}}>
            Change password
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("ChangePassword")}
          >
            <AntDesign
              name="arrowright"
              size={24}
              color="#238832"
              style={{alignSelf: "center", marginRight: 20}}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            height: 48,
            width: "90%",
            backgroundColor: "#F2F2F2",
            alignSelf: "center",
            borderRadius: 30,
            justifyContent: "space-between",
            flexDirection: "row",
            alignItems: "center",
            marginTop: 20,
          }}
        >
          <Text style={{color: "#606060", marginLeft: 10}}>Subscription</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Subscription")}>
            <AntDesign
              name="arrowright"
              size={24}
              color="#238832"
              style={{alignSelf: "center", marginRight: 20}}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            height: 48,
            width: "90%",
            backgroundColor: "#F2F2F2",
            alignSelf: "center",
            borderRadius: 30,
            justifyContent: "space-between",
            flexDirection: "row",
            alignItems: "center",
            marginTop: 20,
          }}
        >
          <Text style={{color: "#606060", marginLeft: 10}}>Contact us</Text>
          <TouchableOpacity onPress={() => navigation.navigate("ContactUs")}>
            <AntDesign
              name="arrowright"
              size={24}
              color="#238832"
              style={{alignSelf: "center", marginRight: 20}}
            />
          </TouchableOpacity>
        </View>
        <View style={{marginTop: "60%", alignItems: "center"}}>
          <TouchableOpacity
            onPress={() => navigation.navigate("SignIn")}
            style={{
              height: 48,
              width: "90%",
              justifyContent: "center",
              backgroundColor: "#238832",
              borderRadius: 30,
            }}
          >
            <Text style={{color: "#fff", textAlign: "center"}}>Log Out</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Profile;
