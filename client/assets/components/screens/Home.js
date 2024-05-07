import React, { useContext } from "react";
import {
  View,
  ImageBackground,
  Image,
  StyleSheet,
  TouchableOpacity,
  Text,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import DrawerScreenWrapper from "./DrawerScreenWrapper";
import { AuthContext } from "../../../context/authContext";

const Home = () => {
  const navigation = useNavigation();
  const [state] = useContext(AuthContext);
  return (
    <DrawerScreenWrapper>
      <View style={styles.backgroundContainer}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            top: 10,
            right: 10,
          }}
        >
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <ImageBackground
              source={require("../images/ellipse.png")}
              style={styles.backgroundImage}
            >
              <Image
                source={require("../images/drawer.png")}
                style={styles.drawerImage}
              />
            </ImageBackground>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("NotificationScreen")}
          >
            <ImageBackground
              source={require("../images/notification.png")}
              style={styles.backgroundImage}
            ></ImageBackground>
          </TouchableOpacity>
        </View>

        <View style={styles.bottomContainer}>
          <Text> {state?.user?.name || "Guest"}</Text>

          <View
            style={{
              width: 62,
              height: 62,
              borderRadius: 35,
              overflow: "hidden",
              backgroundColor: "green",
              marginTop: "auto",
              marginLeft: "auto",
              margin: 20,
            }}
          >
            <TouchableOpacity onPress={() => navigation.navigate("AplhaList")}>
              <View
                style={{
                  width: 62,
                  height: 62,
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "green",
                  borderRadius: 35,
                  marginTop: "auto",
                  marginBottom: "auto",
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
              >
                <Image
                  source={require("../images/plus.png")}
                  style={{ height: 20, width: 20, alignSelf: "center" }}
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </DrawerScreenWrapper>
  );
};

const styles = StyleSheet.create({
  backgroundContainer: {
    flex: 1,
    backgroundColor: "#238832",
  },
  backgroundImage: {
    width: 49,
    height: 49,
    marginLeft: 30,
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  drawerImage: {
    width: 15,
    height: 15,
    alignSelf: "center",
  },
  bottomContainer: {
    flex: 1,
    overflow: "hidden",
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    backgroundColor: "#fff",
    marginTop: "12%",
  },
});

export default Home;
