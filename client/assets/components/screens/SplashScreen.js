import React, {useEffect} from "react";
import {View, Image, ImageBackground, StyleSheet} from "react-native";
import {useNavigation} from "@react-navigation/native";
import {StatusBar} from "expo-status-bar";

const SplashScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const timeout = setTimeout(() => {
      navigation.navigate("MainSplash");
    }, 2000);

    return () => clearTimeout(timeout);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../images/splash.jpg")}
        style={styles.imageBackground}
      >
        <Image source={require("../images/text.png")} style={styles.image} />
      </ImageBackground>
      <StatusBar style="light" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  imageBackground: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: "contain",
  },
});

export default SplashScreen;
