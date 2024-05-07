import React, {useState, useEffect} from "react";
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {DrawerItemList, createDrawerNavigator} from "@react-navigation/drawer";
import {Image, Text, View, TouchableOpacity} from "react-native";
import {Feather, AntDesign, FontAwesome5} from "@expo/vector-icons";
import {SafeAreaView} from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Import screens from your project
import MainSplash from "./assets/components/screens/MainSplash";
import Home from "./assets/components/screens/Home";
import SignIn from "./assets/components/screens/SignIn";
import SignUp from "./assets/components/screens/SignUp";
import ForgetPassword from "./assets/components/screens/ForgetPassword";
import EmailVerification from "./assets/components/screens/EmailVerification";
import ChangePassword from "./assets/components/screens/ChangePassword";
import NotificationScreen from "./assets/components/screens/NotificationScreen";
import CompleteList from "./assets/components/screens/CompleteList";
import Profile from "./assets/components/screens/Profile";
import ContactUs from "./assets/components/screens/ContactUs";
import AplhaList from "./assets/components/screens/AplhaList";
import Subscription from "./assets/components/screens/Subscription";
import AddNewItem from "./assets/components/screens/AddNewItem";
import PaymentMethod from "./assets/components/screens/PaymentMethod";
import ConfirmPayment from "./assets/components/screens/ConfirmPayment";
import PaymentHistory from "./assets/components/screens/PaymentHistory";
import EditProfile from "./assets/components/screens/EditProfile";
import Cart from "./assets/components/screens/Cart";
import {AuthProvider} from "./context/authContext";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const COLOR = {
  bg: "#238832",
  active: "#fff",
  inactive: "#238832",
  transparent: "transparent",
};

function HomeStack() {
  const [price, setPrice] = useState(0);
  const [duration, setDuration] = useState("");
  const Stack = createNativeStackNavigator();
  const [state, setState] = useState({
    user: null,
    token: "",
  });
  useEffect(() => {
    const getLocalStorage = async () => {
      let data = await AsyncStorage.getItem("@auth");
      console.log("data", data)
      let SignInData = JSON.parse(data);
      setState({...state, user: SignInData?.user, token: SignInData?.token});
    };
    getLocalStorage();
  }, []);
    console.log("user data",state)
  return (
    <AuthProvider>
      <Stack.Navigator
        initialRouteName={state!== null?"HomeScreen":"MainSplash"}
        screenOptions={{headerShown: false}}
      >
        <Stack.Screen name="MainSplash" component={MainSplash} />
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="HomeScreen" component={Home} />
        <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
        <Stack.Screen name="ChangePassword" component={ChangePassword} />
        <Stack.Screen name="EmailVerification" component={EmailVerification} />
        <Stack.Screen
          name="NotificationScreen"
          component={NotificationScreen}
        />
        <Stack.Screen name="AplhaList" component={AplhaList} />
        <Stack.Screen name="AddNewItem" component={AddNewItem} />
        <Stack.Screen name="Subscription" component={Subscription} />
        <Stack.Screen name="PaymentHistory" component={PaymentHistory} />
        <Stack.Screen name="ContactUs" component={ContactUs} />
        <Stack.Screen name="EditProfile" component={EditProfile} />
        <Stack.Screen name="Cart" component={Cart} />
        <Stack.Screen name="PaymentMethod">
          {(props) => (
            <PaymentMethod
              {...props}
              price={price}
              duration={duration}
              setPrice={setPrice}
              setDuration={setDuration}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="ConfirmPayment">
          {(props) => (
            <ConfirmPayment {...props} price={price} duration={duration} />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </AuthProvider>
  );
}

export default function App() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await AsyncStorage.getItem("@auth");
        if (data) {
          const parsedData = JSON.parse(data);
          setUser(parsedData.user);
        }
      } catch (error) {
        console.error("Error fetching data from AsyncStorage:", error);
      }
    };
    fetchData();
  }, []);
  const userName = user ? user.name : "Guest";
  return (
    <NavigationContainer>
      <Drawer.Navigator 
        drawerContent={(props) => (
          <SafeAreaView style={{flex: 1}}>
            <View style={{marginLeft: 20, marginTop: 20, marginBottom: 50}}>
              <Image
                source={require("../client/assets/components/images/profilePhoto.png")}
                style={{width: 80, height: 80, borderRadius: 40}}
              />
              <Text
                style={{
                  fontSize: 20,
                  color: "#fff",
                  marginTop: 10,
                  fontWeight: "bold",
                }}
              >
                Hello, {userName}
              </Text>
            </View>
            <DrawerItemList {...props} />
            <View style={{flex: 1, justifyContent: "flex-end", bottom: "8%"}}>
              <TouchableOpacity
                style={{
                  padding: 16,
                  backgroundColor: "#E0E0E0",
                  width: 145,
                  borderRadius: 35,
                  alignSelf: "center",
                }}
                onPress={() => props.navigation.navigate("SignIn")}
              >
                <Text
                  style={{color: "#fff", textAlign: "center", fontSize: 14}}
                >
                  Logout
                </Text>
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        )}
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
          drawerActiveBackgroundColor: COLOR.transparent,
          drawerInactiveBackgroundColor: COLOR.inactive,
          drawerActiveTintColor: COLOR.active,
          drawerInactiveTintColor: COLOR.active,
          overlayColor: COLOR.transparent,
          drawerStyle: {
            backgroundColor: COLOR.bg,
          },
        }}
      >
        {/* Drawer screens */}
        <Drawer.Screen
          name="Home"
          component={HomeStack}
          options={{drawerLabel: "Home",drawerIcon: () => <AntDesign name="home" size={24} color="white" />,
          }}
        />
        <Drawer.Screen
          name="CompleteList"
          component={CompleteList}
          options={{
            drawerLabel: "Complete List",
            drawerIcon: () => <Feather name="list" size={24} color="#fff" />,
          }}
        />
        <Drawer.Screen
          name="Profile"
          component={Profile}
          options={{
            drawerLabel: "Profile",
            drawerIcon: () => <Feather name="user" size={24} color="white" />,
          }}
        />
        <Drawer.Screen
          name="ContactUs"
          component={ContactUs}
          options={{
            drawerLabel: "Contact Us",
            drawerIcon: () => (
              <AntDesign name="contacts" size={24} color="white" />
            ),
          }}
        />
        <Drawer.Screen
          name="Subscription"
          component={Subscription}
          options={{
            drawerLabel: "Subscription",
            drawerIcon: ({focused, color, size}) => (
              <FontAwesome5 name="money-check-alt" size={22} color="white" />
            ),
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}