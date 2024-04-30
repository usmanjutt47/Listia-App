import {useNavigation} from "@react-navigation/native";
import React, {useState} from "react";
import {
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
  TextInput,
  Modal,
} from "react-native";
// import { BlurView } from '@react-native-community/blur'; // Import BlurView

const ChangePassword = () => {
  const navigation = useNavigation();

  // State variables for email and password
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // State variable to track active input field
  const [activeInput, setActiveInput] = useState(null);

  // State variable to track modal visibility
  const [isModalVisible, setModalVisible] = useState(false);

  // Handle input focus
  const handleFocus = (input) => {
    setActiveInput(input);
  };

  // Handle blur
  const handleBlur = () => {
    setActiveInput(null);
  };

  // Function to handle closing the modal
  const handleModalClose = () => {
    setModalVisible(false);
    // Add any other actions here if needed when the modal closes
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
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require("../images/changePassword.png")}
            style={{width: 317, height: 304, marginBottom: 20}}
          />
        </TouchableOpacity>

        {/* New password input */}
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
            borderColor: activeInput === "password" ? "#238832" : "#F2F2F2",
          }}
          onFocus={() => handleFocus("password")}
          onBlur={handleBlur}
        />

        {/* Confirm password input */}
        <Text
          style={{
            fontSize: 13,
            color: "#000",
            marginLeft: 10,
            marginTop: 15,
            marginBottom: 5,
          }}
        >
          Re-Enter New Password
        </Text>
        <TextInput
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          placeholder="Re-Enter New Password"
          style={{
            padding: 10,
            backgroundColor: "#F2F2F2",
            borderRadius: 35,
            paddingLeft: 10,
            borderWidth: 1,
            borderColor:
              activeInput === "confirmPassword" ? "#238832" : "#F2F2F2",
          }}
          onFocus={() => handleFocus("confirmPassword")}
          onBlur={handleBlur}
        />

        {/* Save button */}
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("HomeScreen");
            setTimeout(() => {
              setModalVisible(true);
            }, 300);
          }}
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
          onRequestClose={handleModalClose}
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
              <ImageBackground
                source={require("../images/successfull.png")}
                style={{height: 59, width: 59, justifyContent: "center"}}
              >
                <Image
                  source={require("../images/tick.png")}
                  style={{height: 20, width: 20, alignSelf: "center"}}
                />
              </ImageBackground>
              <Text style={{fontSize: 16, fontWeight: "bold", marginBottom: 5}}>
                Password Changed Successfully
              </Text>
              <Text style={{fontSize: 14, marginBottom: 15}}>
                Your password has been changed successfully.
              </Text>

              {/* Close button */}
              <TouchableOpacity
                onPressIn={() => navigation.navigate("SignIn")}
                onPress={handleModalClose}
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
                  Back to login
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
