import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ScrollView,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../../../context/authContext";
import axios from "axios";
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const EditProfile = () => {
  const [state, setState] = useContext(AuthContext);
  const navigation = useNavigation();
  const { user } = state;
  const [name, setName] = useState(user?.name);
  const [email, setEmail] = useState(user?.email);
  const [phone, setPhone] = useState(user?.phone);
  const [password, setPassword] = useState(user?.password);
  const [image, setImage] = useState(user?.profileImage || null);

  // Load saved image URI when component mounts
  useEffect(() => {
    const loadImage = async () => {
      try {
        const savedImageURI = await AsyncStorage.getItem('profileImage');
        if (savedImageURI) {
          setImage(savedImageURI);
        }
      } catch (error) {
        console.error('Failed to load image URI:', error);
      }
    };

    loadImage();
  }, []);

  // Save image URI in AsyncStorage
  const saveImage = async (uri) => {
    try {
      await AsyncStorage.setItem('profileImage', uri);
    } catch (error) {
      console.error('Failed to save image URI:', error);
    }
  };

  const handleUpdate = async () => {
    try {
      const { data } = await axios.put('auth/update-user', { name, email, phone, password });
      alert(data?.message);
      setState({ ...state, user: data?.updatedUser });
    } catch (error) {
      alert(error.response?.data?.message || 'An error occurred');
      console.error(error);
    }
  };

  const handleImagePicker = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.status !== 'granted') {
      alert('Permission to access media library is required!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      const selectedImageURI = result.assets[0].uri;
      setImage(selectedImageURI);

      // Save the selected image URI in AsyncStorage
      await AsyncStorage.setItem('profileImage', selectedImageURI);

      // Notify the drawer immediately of the change
      // Trigger a refresh by calling a function or updating a context state
      navigation.navigate('Profile', { refreshImage: true });
    }
  };


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

        <Text style={styles.headerText}>Edit Profile</Text>
      </View>

      <View style={styles.profileSection}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.profileImageContainer}>
            {image ? (
              <ImageBackground
                source={{ uri: image }}
                style={styles.profileImage}
                imageStyle={styles.profileImageStyle}
              >
                <TouchableOpacity
                  style={styles.cameraIconContainer}
                  onPress={handleImagePicker}
                >
                  <FontAwesome name="camera" size={16} color="#fff" />
                </TouchableOpacity>
              </ImageBackground>
            ) : (
              <ImageBackground
                source={require("../images/Editprofile.png")}
                style={styles.profileImage}
              >
                <TouchableOpacity
                  style={styles.cameraIconContainer}
                  onPress={handleImagePicker}
                >
                  <FontAwesome name="camera" size={16} color="#fff" />
                </TouchableOpacity>
              </ImageBackground>
            )}
          </View>

          <View>
            <Text style={styles.textLabel}>Name</Text>
            <TextInput
              placeholder="Name"
              value={name}
              onChangeText={setName}
              style={styles.textInput}
              inputMode="text"
            />

            <Text style={styles.textLabel}>Email</Text>
            <TextInput
              placeholder="Email"
              editable={false}
              value={email}
              style={styles.textInput}
              inputMode="email"
            />

            <Text style={styles.textLabel}>Phone</Text>
            <TextInput
              placeholder="Phone"
              value={phone}
              onChangeText={setPhone}
              style={styles.textInput}
              inputMode="numeric"
            />

            <Text style={styles.textLabel}>Password</Text>
            <TextInput
              secureTextEntry
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              style={styles.textInput}
              inputMode="text"
            />
          </View>

          <View>
            <TouchableOpacity onPress={handleUpdate} style={styles.saveButton}>
              <Text style={styles.saveButtonText}>Save Changes</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#238832',
  },
  topSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    paddingHorizontal: 20,
  },
  goBackButton: {
    padding: 5,
  },
  goBackImageBackground: {
    height: 35,
    width: 35,
    justifyContent: 'center',
  },
  goBackImage: {
    height: 15,
    width: 15,
    alignSelf: 'center',
  },
  headerText: {
    flex: 1,
    color: '#fff',
    fontSize: 23,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  profileSection: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopRightRadius: 35,
    borderTopLeftRadius: 35,
    marginTop: 20,
    padding: 20,
  },
  profileImageContainer: {
    alignSelf: 'center',
    marginTop: 20,
    alignItems: 'center',
  },
  profileImage: {
    height: 122,
    width: 122,
    borderRadius: 61,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImageStyle: {
    borderRadius: 61,
    resizeMode: 'cover',
  },
  textLabel: {
    marginLeft: 33,
    marginBottom: 5,
    fontWeight: 'bold',
    marginTop: 20,
  },
  textInput: {
    marginLeft: 20,
    borderRadius: 30,
    padding: 8,
    paddingLeft: 10,
    backgroundColor: '#F2F2F2',
  },
  saveButton: {
    backgroundColor: '#238832',
    padding: 15,
    justifyContent: 'center',
    borderRadius: 30,
    width: '80%',
    alignSelf: 'center',
    marginTop: '50%',
  },
  saveButtonText: {
    color: 'white',
    textAlign: 'center',
  },
});

export default EditProfile;
