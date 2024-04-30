import React, {useState} from "react";
import {
  Text,
  SafeAreaView,
  Dimensions,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import {StatusBar} from "expo-status-bar";

const {width, height} = Dimensions.get("window");
const COLORS = {primary: "#282534", white: "#FFFFFF"};

const slides = [
  {
    id: 1,
    image: require("../images/splash1.png"),
    title: "Create and Share",
    subTitle: "Share shopping lists with family and friends",
  },
  {
    id: 2,
    image: require("../images/splash2.png"),
    title: "Welcome to Listia",
    subTitle:
      "Make your shopping the easiest and fastest, in advance by making a list of your products with Listia",
  },
  {
    id: 3,
    image: require("../images/splash3.png"),
    title: "Smart Categorization",
    subTitle:
      "Make your shopping easier with automatic grouping of products by category",
  },
];

const MainSplash = ({navigation}) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  const goToNextSlide = () => {
    if (currentSlideIndex < slides.length - 1) {
      setCurrentSlideIndex(currentSlideIndex + 1);
    } else {
      navigation.navigate("SignIn");
    }
  };

  const currentSlide = slides[currentSlideIndex];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <TouchableOpacity onPress={() => navigation.navigate("SignIn")}>
        <Text style={{marginLeft: "auto", marginRight: 20, marginTop: 30}}>
          Skip
        </Text>
      </TouchableOpacity>
      <View style={styles.slide}>
        <Image source={currentSlide.image} style={styles.image} />
        <Text style={styles.title}>{currentSlide.title}</Text>
        <Text style={styles.subTitle}>{currentSlide.subTitle}</Text>
      </View>
      <View style={styles.footer}>
        <View style={styles.indicatorContainer}>
          {slides.map((_, index) => (
            <View
              key={index}
              style={[
                styles.indicator,
                currentSlideIndex === index && styles.activeIndicator,
              ]}
            />
          ))}
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.btn} onPress={goToNextSlide}>
            <Text style={styles.btnText}>Get Started</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  slide: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    height: "75%",
    width,
    resizeMode: "contain",
  },
  title: {
    color: "black",
    fontSize: 22,
    textAlign: "center",
    fontWeight: "bold",
  },
  subTitle: {
    fontSize: 12,
    color: "black",
    maxWidth: "80%",
    textAlign: "center",
  },
  footer: {
    height: height * 0.25,
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  indicatorContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  indicator: {
    height: 3.5,
    width: 30,
    backgroundColor: "grey",
    marginHorizontal: 1,
    borderRadius: 3,
  },
  activeIndicator: {
    backgroundColor: "#248B34",
    width: 25,
  },
  buttonContainer: {
    marginBottom: "20%",
  },
  btn: {
    padding: 20,
    backgroundColor: "#248B34",
    borderRadius: 30,
  },
  btnText: {
    color: COLORS.white,
    textAlign: "center",
  },
});

export default MainSplash;
