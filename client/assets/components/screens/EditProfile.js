import {useNavigation} from "@react-navigation/native";
import React, {useState} from "react";
import {
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from "react-native";
import {FontAwesome} from "@expo/vector-icons";
import {Feather} from "@expo/vector-icons";

const EditProfile = () => {
  const navigation = useNavigation();
  const [enabledInput, setEnabledInput] = useState(null);

  // Function to handle clicks on the pen icon
  const handleIconClick = (inputName) => {
    // Toggle the state of enabledInput
    setEnabledInput((prev) => (prev === inputName ? null : inputName));
  };

  // Function to check if a `TextInput` is enabled
  const isInputEnabled = (inputName) => enabledInput === inputName;

  return (
    <View style={styles.container}>
      {/* Top Section */}
      <View style={styles.topSection}>
        <TouchableOpacity
          style={styles.goBackButton}
          onPress={() => navigation.goBack()}
        >
          <ImageBackground
            source={require("../images/gobackBackground.png")}
            style={styles.goBackImageBackground}
          >
            <Image
              source={require("../images/goback.png")}
              style={styles.goBackImage}
            />
          </ImageBackground>
        </TouchableOpacity>

        <Text style={styles.headerText}>Edit Profile</Text>
      </View>

      {/* Profile Section */}
      <View style={styles.profileSection}>
        <View style={styles.profileImageContainer}>
          <ImageBackground
            source={require("../images/photo.png")}
            style={styles.profileImage}
          >
            <TouchableOpacity
              style={styles.cameraIconContainer}
              onPress={() => navigation.navigate("EditProfile")}
            >
              <FontAwesome name="camera" size={16} color="#fff" />
            </TouchableOpacity>
          </ImageBackground>
        </View>

        {/* Create an array of inputs for each field */}
        {["name", "email", "phone", "password"].map((inputName, index) => (
          <View
            key={inputName}
            style={[
              styles.inputContainer,
              {marginTop: index > 0 ? 20 : 50}, // Add margin for all except the first one
            ]}
          >
            <TextInput
              placeholder={
                inputName.charAt(0).toUpperCase() + inputName.slice(1)
              }
              inputMode={inputName === "phone" ? "decimal" : "text"}
              style={{
                flex: 1,
                paddingLeft: 10,
                height: "100%",
                borderColor: isInputEnabled(inputName) ? "#238832" : "#fff",
                borderWidth: 1,
                borderRadius: 30,
                backgroundColor: isInputEnabled(inputName) ? "#F2F2F2" : "#fff",
              }}
              editable={isInputEnabled(inputName)} // Conditionally enable TextInput
            />

            {/* Pen icon on the right side */}
            {!isInputEnabled(inputName) && (
              <TouchableOpacity onPress={() => handleIconClick(inputName)}>
                <Feather
                  name="edit-2"
                  size={17}
                  color="#238832"
                  style={{paddingRight: 10}}
                />
              </TouchableOpacity>
            )}
          </View>
        ))}
        <View style={{marginTop: "40%"}}>
          <TouchableOpacity
            onPress={() => navigation.navigate("HomeScreen")}
            style={{
              backgroundColor: "#238832",
              height: 48,
              borderRadius: 30,
              justifyContent: "center",
            }}
          >
            <Text style={{color: "#fff", textAlign: "center"}}>
              Save Change
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#238832",
  },
  topSection: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    paddingHorizontal: 20,
  },
  goBackButton: {
    padding: 5,
  },
  goBackImageBackground: {
    height: 35,
    width: 35,
    justifyContent: "center",
  },
  goBackImage: {
    height: 15,
    width: 15,
    alignSelf: "center",
  },
  headerText: {
    flex: 1,
    color: "#fff",
    fontSize: 23,
    fontWeight: "bold",
    textAlign: "center",
  },
  profileSection: {
    flex: 1,
    backgroundColor: "#fff",
    borderTopRightRadius: 35,
    borderTopLeftRadius: 35,
    marginTop: 20,
    padding: 20,
  },
  profileImageContainer: {
    alignSelf: "center",
    marginTop: 20,
    alignItems: "center",
  },
  profileImage: {
    height: 112,
    width: 112,
    justifyContent: "center",
    alignItems: "center",
  },
  cameraIconContainer: {
    position: "absolute",
    bottom: 0,
    right: 0,
    padding: 5,
    backgroundColor: "#fff",
    borderRadius: 30,
    width: 37,
    height: 37,
    backgroundColor: "#238832",
    alignItems: "center",
    justifyContent: "center",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#238832",
    borderRadius: 30,
    height: 48,
    marginTop: 20,
  },
});

export default EditProfile;
