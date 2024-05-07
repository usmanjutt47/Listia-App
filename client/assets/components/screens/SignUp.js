import React, { useState } from "react";
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Dimensions,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import { Feather, EvilIcons, FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import axios from "axios";

const { width, height } = Dimensions.get("window");

const SignUp = () => {
  const navigation = useNavigation();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isEmailActive, setIsEmailActive] = useState(false);
  const [isNameActive, setIsNameActive] = useState(false);
  const [isPasswordActive, setIsPasswordActive] = useState(false);
  const [isPhoneActive, setIsPhoneActive] = useState(false);
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [password, setPassword] = useState();

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleSubmit = async () => {
    if (!name || !email || !phone || !password) {
      Alert.alert("Please fill all fields");
      return;
    }

    setLoading(true);

    try {
      const { data } = await axios.post("/auth/signUp", {
        name,
        email,
        phone,
        password,
      });

      alert(data?.message);
      navigation.navigate("SignIn");
    } catch (error) {
      const errorMessage = error.response?.data?.message || "An error occurred";
      alert(errorMessage);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };


  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <ImageBackground
          source={require("../images/login.png")}
          style={styles.imageBackground}
          accessibilityLabel="Sign Up Background"
        >
          <Image source={require("../images/group.png")} style={styles.logo} />
          <Text style={styles.text}>Sign Up</Text>
          <Text style={{ color: "white" }}>Please Sign Up to Join Us</Text>
        </ImageBackground>
        <View
          style={[
            styles.containerView,
            isNameActive ? styles.activeContainer : styles.inactiveContainer,
          ]}
        >
          <Feather
            name="user"
            size={20}
            color={isNameActive ? "green" : "#838383"}
            style={styles.icon}
          />
          <TextInput
            value={name}
            onChangeText={(text) => setName(text)}
            placeholder="Name"
            inputMode="text"
            placeholderTextColor={isNameActive ? "green" : "#838383"}
            style={[
              styles.input,
              isNameActive ? styles.activeInput : styles.inactiveInput,
            ]}
            onFocus={() => {
              setIsNameActive(true);
              setIsEmailActive(false);
              setIsPasswordActive(false);
            }}
            onBlur={() => setIsNameActive(false)}
          />
        </View>
        <View
          style={[
            styles.containerView,
            isEmailActive ? styles.activeContainer : styles.inactiveContainer,
          ]}
        >
          <Feather
            name="mail"
            size={20}
            color={isEmailActive ? "green" : "#838383"}
            style={styles.icon}
          />
          <TextInput
            value={email}
            onChangeText={(text) => setEmail(text)}
            placeholder="Email"
            inputMode="email"
            placeholderTextColor={isEmailActive ? "green" : "#838383"}
            style={[
              styles.input,
              isEmailActive ? styles.activeInput : styles.inactiveInput,
            ]}
            onFocus={() => {
              setIsEmailActive(true);
              setIsPasswordActive(false);
              setIsNameActive(false);
            }}
            onBlur={() => setIsEmailActive(false)}
          />
        </View>
        <View
          style={[
            styles.containerView,
            isPhoneActive ? styles.activeContainer : styles.inactiveContainer,
          ]}
        >
          <FontAwesome
            name="phone"
            size={20}
            color={isPhoneActive ? "green" : "#838383"}
            style={styles.icon}
          />
          <TextInput
            value={phone}
            onChangeText={setPhone}
            placeholder="Phone"
            inputMode="numeric"
            style={[
              styles.input,
              isPhoneActive ? styles.activeInput : styles.inactiveInput,
            ]}
            onFocus={() => {
              setIsPhoneActive(true);
              setIsNameActive(false);
              setIsEmailActive(false);
              setIsPasswordActive(false);
            }}
            onBlur={() => setIsPhoneActive(false)}
          />
        </View>
        <View
          style={[
            styles.containerView,
            isPasswordActive ? styles.activeContainer : styles.inactiveContainer,
          ]}
        >
          <EvilIcons
            value={password}
            onChangeText={(text) => setPassword(text)}
            name="unlock"
            size={20}
            color={isPasswordActive ? "green" : "#838383"}
            style={styles.icon}
          />
          <TextInput
            value={password}
            onChangeText={setPassword}
            placeholder="Password"
            secureTextEntry={!isPasswordVisible}
            style={[
              styles.input,
              isPasswordActive ? styles.activeInput : styles.inactiveInput,
            ]}
            onFocus={() => {
              setIsPasswordActive(true);
              setIsNameActive(false);
              setIsEmailActive(false);
              setIsPhoneActive(false);
            }}
            onBlur={() => setIsPasswordActive(false)}
          />
          <Feather
            name={isPasswordVisible ? "eye-off" : "eye"}
            size={24}
            color={isPasswordActive ? "green" : "#838383"}
            style={styles.eyeIcon}
            onPress={togglePasswordVisibility}
          />
        </View>
        <View>
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}> {loading ? "Please wait..." : "Sign Up"}</Text>
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <Text>Don't have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate("SignIn")}>
            <Text style={{ color: "green" }}>Login</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  imageBackground: {
    width: width,
    height: height * 0.5,
    justifyContent: "center",
    alignItems: "center",
    borderBottomRightRadius: 10,
    overflow: "hidden",
  },
  logo: {
    width: 360,
    height: 300,
    justifyContent: "center",
  },
  text: {
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
  },
  containerView: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 30,
    padding: 10,
    marginTop: 20,
    width: "80%",
    alignSelf: "center",
  },
  activeContainer: {
    borderColor: "green",
  },
  inactiveContainer: {
    borderColor: "#F2F2F2",
    backgroundColor: "#F2F2F2",
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    color: "#238832",
  },
  activeInput: {
    color: "black",
  },
  inactiveInput: {
    color: "#838383",
  },
  eyeIcon: {
    marginLeft: 10,
  },
  button: {
    height: 48,
    backgroundColor: "green",
    width: "80%",
    alignSelf: "center",
    borderRadius: 30,
    marginTop: "4%",
    justifyContent: "center",
  },
  buttonText: {
    textAlign: "center",
    color: "white",
    fontSize: 17,
  },
});

export default SignUp;
