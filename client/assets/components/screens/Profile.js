import React, { useEffect, useState } from "react";
import { View, Text, ImageBackground, TouchableOpacity, StyleSheet, Image } from "react-native";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';

const Profile = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [user, setUser] = useState(null);
  const [imageURI, setImageURI] = useState(null);

  const loadData = async () => {
    try {
      const savedImageURI = await AsyncStorage.getItem('profileImage');
      if (savedImageURI) {
        setImageURI(savedImageURI);
      }
  
      const savedUserData = await AsyncStorage.getItem('@auth');
      if (savedUserData) {
        const parsedUserData = JSON.parse(savedUserData);
        setUser(parsedUserData.user);
      }
    } catch (error) {
      console.error('Failed to load data from AsyncStorage:', error);
    }
  };

  useEffect(() => {
    if (isFocused) {
      loadData();
    }
  }, [isFocused]);

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('profileImage');
      await AsyncStorage.removeItem('@auth');
      navigation.navigate("SignIn");
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };

  const handleLogoutPress = () => {
    handleLogout();
  };

  const userName = user ? user.name : "Guest";
  const userEmail = user ? user.email : "user@gmail.com";

  return (
    <View style={styles.container}>
      <View style={styles.topSection}>
        <TouchableOpacity style={styles.goBackButton} onPress={() => navigation.goBack()}>
          <ImageBackground
            source={require("../images/gobackBackground.png")}
            style={styles.goBackImageBackground}
          >
            <Image source={require("../images/goback.png")} style={styles.goBackImage} />
          </ImageBackground>
        </TouchableOpacity>
        <Text style={styles.headerText}>Profile</Text>
      </View>
      <View style={styles.profileImageContainer}>
        <ImageBackground
          source={imageURI ? { uri: imageURI } : require("../images/photo.png")}
          style={styles.profileImage}
        >
          <TouchableOpacity style={styles.editIcon} onPress={() => navigation.navigate("EditProfile")}>
            <FontAwesome name="edit" size={24} color="#fff" />
          </TouchableOpacity>
        </ImageBackground>
        <Text style={styles.userName}>{userName}</Text>
        <Text style={styles.userEmail}>{userEmail}</Text>
      </View>
      <View style={styles.optionsContainer}>
        <Option title="Change password" onPress={() => navigation.navigate("ChangePassword")} />
        <Option title="Subscription" onPress={() => navigation.navigate("Subscription")} />
        <Option title="Contact us" onPress={() => navigation.navigate("ContactUs")} />
        <View style={styles.logoutButtonContainer}>
          <TouchableOpacity onPress={handleLogoutPress} style={styles.logoutButton}>
            <Text style={styles.logoutButtonText}>Log Out</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const Option = ({ title, onPress }) => (
  <View style={styles.option}>
    <Text style={styles.optionText}>{title}</Text>
    <TouchableOpacity onPress={onPress}>
      <AntDesign name="arrowright" size={24} color="#238832" style={styles.optionIcon} />
    </TouchableOpacity>
  </View>
);

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
    borderRadius: 99,
    overflow: "hidden",
  },
  editIcon: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    zIndex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 50,
    padding: 5,
  },
  userName: {
    textAlign: "center",
    fontSize: 18,
    color: "#fff",
    marginTop: 5,
  },
  userEmail: {
    textAlign: "center",
    fontSize: 15,
    color: "#fff",
  },
  optionsContainer: {
    flex: 1,
    backgroundColor: "#fff",
    borderTopRightRadius: 35,
    borderTopLeftRadius: 35,
    marginTop: "20%",
    padding: 20,
  },
  option: {
    height: 48,
    width: "90%",
    backgroundColor: "#F2F2F2",
    alignSelf: "center",
    borderRadius: 30,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
  optionText: {
    color: "#606060",
    marginLeft: 10,
  },
  optionIcon: {
    alignSelf: "center",
    marginRight: 20,
  },
  logoutButtonContainer: {
    marginTop: "60%",
    alignItems: "center",
  },
  logoutButton: {
    height: 48,
    width: "90%",
    justifyContent: "center",
    backgroundColor: "#238832",
    borderRadius: 30,
  },
  logoutButtonText: {
    color: "#fff",
    textAlign: "center",
  },
});

export default Profile;
