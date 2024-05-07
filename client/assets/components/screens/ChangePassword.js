import {useNavigation} from "@react-navigation/native";
import React, {useContext, useState} from "react";
import {
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
  TextInput,
  Modal,
  Alert,
} from "react-native";
import axios from "axios";
import {AuthContext} from "../../../context/authContext";

const ChangePassword = () => {
  const navigation = useNavigation();
  const [state, setState] = useContext(AuthContext);
  const {user} = state;

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isModalVisible, setModalVisible] = useState(false);

  // Validate password inputs
  const validateInputs = () => {
    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return false;
    }
    if (password.length < 6) {
      Alert.alert("Error", "Password must be at least 6 characters long");
      return false;
    }
    return true;
  };

  // Handle password change
  const handleChangePassword = async () => {
    // Validate inputs
    if (!validateInputs()) {
      return;
    }

    try {
      const response = await axios.put(
        `/auth/update-user`, // Update with your server URL
        {
          email: user.email,
          newPassword: password,
          confirmPassword: confirmPassword,
        }
      );

      const data = response.data;

      if (data.success) {
        // Password changed successfully
        setModalVisible(true);
      } else {
        // Show error message
        Alert.alert("Error", data.message || "Error changing password");
      }
    } catch (error) {
      console.error("Error changing password:", error);
      Alert.alert("Error", "An error occurred while changing the password");
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: "#238832"}}>
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
          Change Password
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
      >
          <Image
            source={require("../images/changePassword.png")}
            style={{width: 317, height: 304, marginBottom: 20}}
          />

        {/* New Password */}
        <Text
          style={{fontSize: 13, color: "#000", marginLeft: 10, marginBottom: 5}}
        >
          New Password
        </Text>
        <TextInput
          value={password}
          onChangeText={setPassword}
          placeholder="Enter New Password"
          style={{
            padding: 10,
            backgroundColor: "#F2F2F2",
            borderRadius: 35,
            paddingLeft: 10,
            borderWidth: 1,
            borderColor: "#F2F2F2",
          }}
          secureTextEntry={true}
        />

        {/* Confirm New Password */}
        <Text
          style={{
            fontSize: 13,
            color: "#000",
            marginLeft: 10,
            marginTop: 15,
            marginBottom: 5,
          }}
        >
          Confirm New Password
        </Text>
        <TextInput
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          placeholder="Confirm New Password"
          style={{
            padding: 10,
            backgroundColor: "#F2F2F2",
            borderRadius: 35,
            paddingLeft: 10,
            borderWidth: 1,
            borderColor: "#F2F2F2",
          }}
          secureTextEntry={true}
        />

        {/* Save Button */}
        <TouchableOpacity
          onPress={handleChangePassword}
          style={{
            backgroundColor: "#238832",
            padding: 18,
            justifyContent: "center",
            borderRadius: 35,
            marginTop: "40%",
          }}
        >
          <Text style={{color: "#fff", textAlign: "center", fontSize: 17}}>
            Save
          </Text>
        </TouchableOpacity>

        {/* Modal */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={isModalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "rgba(0, 0, 0, 0.6)",
              height: "100%",
              width: "100%",
            }}
          >
            <View
              style={{
                backgroundColor: "#fff",
                padding: 20,
                borderRadius: 10,
                alignItems: "center",
              }}
            >
              <View
                style={{
                  alignSelf: "center",
                  width: 50,
                  height: 50,
                  backgroundColor: "green",
                  borderRadius: 30,
                  bottom: 5,
                }}
              >
                <Image
                  source={require("../images/tick.png")}
                  style={{height: 20, width: 20, alignSelf: "center"}}
                />
              </View>
              <Text style={{fontSize: 16, fontWeight: "bold", marginBottom: 5}}>
                Password Changed Successfully
              </Text>
              <Text style={{fontSize: 14, marginBottom: 15}}>
                Your password has been changed successfully.
              </Text>

              {/* Close button */}
              <TouchableOpacity
                onPress={() => navigation.navigate("SignIn")}
                style={{
                  backgroundColor: "#238832",
                  padding: 10,
                  borderRadius: 35,
                }}
              >
                <Text
                  style={{
                    color: "#fff",
                    fontSize: 14,
                    width: 200,
                    textAlign: "center",
                    padding: 10,
                  }}
                >
                  Back to Login
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
};

export default ChangePassword;
