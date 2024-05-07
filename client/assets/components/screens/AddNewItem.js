import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ImageBackground,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const AddNewItem = () => {
  const navigation = useNavigation();
  const [category, setCategory] = useState(null);

  const handleItemSelection = (selectedCategory) => {
    if (category !== selectedCategory) {
      setCategory(selectedCategory);
    } else {
      setCategory(null);
    }
  };

  return ( 
    <View style={{ flex: 1, backgroundColor: "#238832" }}>
      <View
        style={{ flexDirection: "row", alignItems: "center", marginTop: 20 }}
      >
        <View style={{ left: 10 }}>
          <ImageBackground
            source={require("../images/gobackBackground.png")}
            style={{ height: 35, width: 35, justifyContent: "center" }}
          >
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image
                source={require("../images/goback.png")}
                style={{ height: 15, width: 15, alignSelf: "center" }}
              />
            </TouchableOpacity>
          </ImageBackground>
        </View>

        {/* Title */}
        <Text
          style={{
            color: "#fff",
            fontSize: 23,
            fontWeight: "bold",
            flex: 1,
            textAlign: "center",
          }}
        >
          Add New Item
        </Text>
      </View>

      {/* Main Content */}
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
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>
          Create New Item
        </Text>
        <Text style={{ fontSize: 10 }}>
          Please fill the information to create the list
        </Text>

        <View style={{ marginTop: 30 }}>
          <Text style={{ marginBottom: 5, marginLeft: 3 }}>Item name</Text>
          <TextInput
            placeholder="Enter Name"
            placeholderTextColor="#838383"
            style={{
              backgroundColor: "#F2F2F2",
              padding: 7,
              borderRadius: 35,
              paddingLeft: 10,
            }}
          />
        </View>

        {/* Row with consistent-sized TextInput elements */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 20,
          }}
        >
          <View style={{ flex: 1, marginRight: 10 }}>
            <Text style={{ marginBottom: 5, marginLeft: 3 }}>
              Total Calories
            </Text>
            <TextInput
              inputMode="numeric"
              placeholder="Enter Value"
              placeholderTextColor="#838383"
              style={{
                backgroundColor: "#F2F2F2",
                padding: 7,
                borderRadius: 35,
                paddingLeft: 10,
                height: 48,
                width: 145,
              }}
            />
          </View>

          <View style={{ flex: 1 }}>
            <Text style={{ marginBottom: 5, marginLeft: 3 }}>Total Macros</Text>
            <TextInput
              inputMode="numeric"
              placeholder="Enter Value"
              placeholderTextColor="#838383"
              style={{
                backgroundColor: "#F2F2F2",
                padding: 7,
                borderRadius: 35,
                paddingLeft: 10,
                height: 48,
              }}
            />
          </View>
        </View>
        <View
          style={{
            justifyContent: "space-between",
            marginTop: 30,
            flexDirection: "row",
          }}
        >
          <TouchableOpacity
            style={{
              backgroundColor: category === "Milk" ? "green" : "#F2F2F2",
              width: 60,
              borderRadius: 30,
              height: 30,
              justifyContent: "center",
            }}
            onPress={() => handleItemSelection("Milk")}
            disabled={category === "Milk"}
          >
            <Text
              style={{
                textAlign: "center",
                color: category === "Milk" ? "#fff" : "#000",
                alignContent: "center",
              }}
            >
              Milk
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: category === "Mango" ? "green" : "#F2F2F2",
              width: 60,
              borderRadius: 30,
              height: 30,
              justifyContent: "center",
            }}
            onPress={() => handleItemSelection("Mango")}
            disabled={category === "Mango"}
          >
            <Text
              style={{
                textAlign: "center",
                color: category === "Mango" ? "#fff" : "#000",
                alignContent: "center",
              }}
            >
              Mango
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: category === "Oranges" ? "green" : "#F2F2F2",
              width: 60,
              borderRadius: 30,
              height: 30,
              justifyContent: "center",
            }}
            onPress={() => handleItemSelection("Oranges")}
            disabled={category === "Oranges"}
          >
            <Text
              style={{
                textAlign: "center",
                color: category === "Oranges" ? "#fff" : "#000",
                alignContent: "center",
              }}
            >
              Oranges
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{ justifyContent: "flex-end", flex: 1 }}>
          <TouchableOpacity
            style={{
              backgroundColor: category ? "#238832" : "#F2F2F2",
              width: "90%",
              height: 46,
              justifyContent: "center",
              alignSelf: "center",
              borderRadius: 35,
            }}
            onPress={() => navigation.navigate("HomeScreen")}
            disabled={!category}
          >
            <Text style={{ textAlign: "center", fontSize: 17, color: "#fff" }}>
              Add
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default AddNewItem;
