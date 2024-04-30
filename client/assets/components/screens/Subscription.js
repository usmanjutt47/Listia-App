import {useNavigation} from "@react-navigation/native";
import React, {useState} from "react";
import {
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
  Pressable,
} from "react-native";
import {AntDesign} from "@expo/vector-icons";

const Subscription = () => {
  const navigation = useNavigation();

  const subscriptionPlans = {
    first: {price: 19.99, duration: "Month"},
    second: {price: 29.99, duration: "Month"},
    third: {price: 49.99, duration: "Yearly"},
  };

  const [selectedSubscription, setSelectedSubscription] = useState("first");
  const [selectedPrice, setSelectedPrice] = useState(19.99);

  const handleSubscriptionClick = (subscription, price) => {
    setSelectedSubscription(subscription);
    setSelectedPrice(price);
  };

  const handleNavigateToPaymentMethod = () => {
    const selectedPlan = subscriptionPlans[selectedSubscription];

    navigation.navigate("PaymentMethod", {
      price: selectedPlan.price,
      duration: selectedPlan.duration,
    });
  };

  return (
    <View style={{flex: 1, backgroundColor: "#238832"}}>
      <View style={{flexDirection: "row", alignItems: "center", marginTop: 20}}>
        <View style={{left: 20, top: 3}}>
          <ImageBackground
            source={require("../images/gobackBackground.png")}
            style={{height: 35, width: 35, justifyContent: "center"}}
          >
            <TouchableOpacity onPress={() => navigation.navigate("HomeScreen")}>
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
            marginLeft: "15%",
          }}
        >
          Subscription Plan
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
        {Object.keys(subscriptionPlans).map((key) => {
          const plan = subscriptionPlans[key];
          const isSelected = selectedSubscription === key;

          return (
            <Pressable
              key={key}
              onPress={() => handleSubscriptionClick(key, plan.price)}
              style={{
                height: 184,
                borderWidth: 1,
                borderColor: "#238832",
                borderRadius: 20,
                margin: 5,
                backgroundColor: isSelected ? "#238832" : "#F2F2F2",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginTop: 20,
                }}
              >
                <Text
                  style={{
                    color: isSelected ? "#fff" : "#000",
                    marginLeft: 10,
                    fontWeight: "bold",
                    fontSize: 18,
                  }}
                >
                  {key === "first"
                    ? "1st Subscription"
                    : key === "second"
                    ? "2nd Subscription"
                    : "3rd Subscription"}
                </Text>
                <Text
                  style={{
                    color: isSelected ? "#fff" : "#000",
                    marginRight: 10,
                    fontWeight: "bold",
                    fontSize: 15,
                  }}
                >
                  ${plan.price.toFixed(2)} / {plan.duration}
                </Text>
              </View>

              {/* Displaying additional content */}
              <Text
                style={{
                  marginLeft: 15,
                  fontSize: 13,
                  color: isSelected ? "#fff" : "#000",
                  marginTop: 20,
                }}
              >
                * Add more than 5 people
              </Text>
              <Text
                style={{
                  marginLeft: 15,
                  fontSize: 13,
                  color: isSelected ? "#fff" : "#000",
                  marginTop: 5,
                }}
              >
                * Also one boost weekly just for 24 hours
              </Text>
              <Text
                style={{
                  marginLeft: 15,
                  fontSize: 13,
                  color: isSelected ? "#fff" : "#000",
                }}
              >
                * Lorem ipsum dolor sit amet, consectetur
              </Text>
              <Text
                style={{
                  marginLeft: 15,
                  fontSize: 13,
                  color: isSelected ? "#fff" : "#000",
                }}
              >
                {"   "}adipiscing elit.
              </Text>

              <View
                style={{
                  justifyContent: "center",
                  height: 42,
                  width: 48,
                  borderRadius: 20,
                  borderColor: isSelected ? "#fff" : "#238832",
                  borderWidth: 1,
                  marginLeft: "80%",
                }}
              >
                <TouchableOpacity onPress={handleNavigateToPaymentMethod}>
                  <AntDesign
                    name="arrowright"
                    size={24}
                    color={isSelected ? "#fff" : "#238832"}
                    style={{alignSelf: "center"}}
                  />
                </TouchableOpacity>
              </View>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
};

export default Subscription;
