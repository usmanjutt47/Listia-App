import React, {useContext, useState} from "react";
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Dimensions,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import {Feather, EvilIcons} from "@expo/vector-icons";
import {useNavigation} from "@react-navigation/native";
import {StatusBar} from "expo-status-bar";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {AuthContext} from "../../../context/authContext";

const {width, height} = Dimensions.get("window");

const SignIn = () => {
  const navigation = useNavigation();
  // State variables to track active input fields
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isEmailActive, setIsEmailActive] = useState(false);
  const [isNameActive, setIsNameActive] = useState(false);
  const [isPasswordActive, setIsPasswordActive] = useState(false);

  const [password, setPassword] = useState();
  const [email, setEmail] = useState();
  const [loading, setLoading] = useContext(AuthContext);
  const [state, setState] =  useContext(AuthContext);
  const handleSubmit = async () => {
    try {
      if (!email || !password) {
        alert("Please fill all fields");
        setLoading(false);
        return;
      }
      setLoading(false);
      const {data} = await axios.post(
        "/auth/signIn",
        {email, password}
      );
      setState(data)
      await AsyncStorage.setItem("@auth", JSON.stringify(data));
      alert(data && data.message);
      navigation.navigate("HomeScreen")
    } catch (error) {
      alert(error.response.data.message);
      setLoading(false);
      console.log(error);
    }
  };

  const getLocalStorage = async () => {
    let data = await AsyncStorage.getItem("@auth");
    console.log("Local Storage ==> ", data);
  };
  getLocalStorage();

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <ImageBackground
        source={require("../images/login.png")}
        style={styles.imageBackground}
        accessibilityLabel="Sign In Background"
      >
        <Image source={require("../images/group.png")} style={styles.logo} />
        <Text style={styles.text}>Sign In</Text>
        <Text style={{color: "white"}}>Please login to continue</Text>
      </ImageBackground>

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
          isPasswordActive ? styles.activeContainer : styles.inactiveContainer,
        ]}
      >
        <EvilIcons
          name="unlock"
          size={20}
          color={isPasswordActive ? "green" : "#838383"}
          style={styles.icon}
        />
        <TextInput
          value={password}
          onChangeText={(text) => setPassword(text)}
          placeholder="Password"
          inputMode="text"
          secureTextEntry={!isPasswordVisible}
          placeholderTextColor={isPasswordActive ? "green" : "#838383"}
          style={[
            styles.input,
            isPasswordActive ? styles.activeInput : styles.inactiveInput,
          ]}
          onFocus={() => {
            setIsPasswordActive(true);
            setIsEmailActive(false);
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
        <TouchableOpacity onPress={() => navigation.navigate("ForgetPassword")}>
          <Text style={{color: "#238832", marginLeft: "50%"}}>
            Forgot your password?
          </Text>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>
      <View
        style={{flexDirection: "row", justifyContent: "center", marginTop: 2}}
      >
        <Text
          style={{
            alignSelf: "center",
            flexDirection: "row",
            fontSize: 16,
            color: "#838383",
          }}
        >
          Don't have an account?{" "}
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
          <Text style={{color: "green", fontSize: 16}}>Sign up</Text>
        </TouchableOpacity>
      </View>
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
    borderWidth: 1,
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
    marginTop: "10%",
    justifyContent: "center",
  },
  buttonText: {
    textAlign: "center",
    color: "white",
    fontSize: 20,
  },
});

export default SignIn;
