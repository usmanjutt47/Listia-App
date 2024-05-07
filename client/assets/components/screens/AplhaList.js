import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  TextInput,
  StyleSheet,
  Modal,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  AntDesign,
  Feather,
  FontAwesome5,
  SimpleLineIcons,
} from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

const AlphaList = () => {
  const navigation = useNavigation();
  const [selectedView, setSelectedView] = useState("All");
  const [isModalVisible, setModalVisible] = useState(false);

  const handleCartClick = () => {
    setModalVisible(true);
  };

  const handleViewPress = (viewName) => {
    setSelectedView(viewName);
  };

  return (
    <View style={styles.container}>
      <View style={styles.topSection}>
        <ImageBackground
          source={require("../images/gobackBackground.png")}
          style={styles.goBackButton}
        >
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              source={require("../images/goback.png")}
              style={{ height: 15, width: 15, alignSelf: "center" }}
            />
          </TouchableOpacity>
        </ImageBackground>
      </View>

      <View style={styles.mainContent}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Alpha List</Text>
          <TouchableOpacity onPress={handleCartClick}>
            <ImageBackground
              source={require("../images/ellipse.png")}
              style={styles.shoppingCartIcon}
            >
              <AntDesign
                name="shoppingcart"
                size={20}
                color="#238832"
                style={styles.cartIcon}
              />
            </ImageBackground>
          </TouchableOpacity>
        </View>

        <Modal
          visible={isModalVisible}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={{ fontSize: 20, fontWeight: "bold" }}>Cart</Text>
              <View
                style={{
                  borderRadius: 20,
                  backgroundColor: "#FFFFFF",
                  height: 69,
                  elevation: 3,
                  borderWidth: 1,
                  borderColor: "#F3F3F3",
                  width: 235,
                  alignSelf: "center",
                }}
              >
                <Text style={{ fontWeight: "bold", fontSize: 15, margin: 10 }}>
                  Milk
                </Text>
                <View style={{ justifyContent: "center", bottom: 15 }}>
                  <TouchableOpacity>
                    <ImageBackground
                      source={require("../images/deleteBackground.png")}
                      style={{
                        height: 22,
                        width: 22,
                        marginLeft: "auto",
                        marginRight: 10,
                        justifyContent: "center",
                      }}
                    >
                      <MaterialIcons
                        name="delete"
                        size={15}
                        color="red"
                        style={{ alignSelf: "center" }}
                      />
                    </ImageBackground>
                  </TouchableOpacity>
                  <View
                    style={{ flexDirection: "row", alignContent: "center" }}
                  >
                    <FontAwesome5
                      name="gripfire"
                      size={13}
                      color="#238832"
                      style={{ margin: 5, bottom: 5, marginLeft: 15 }}
                    />
                    <Text style={{ fontSize: 10, marginRight: 20 }}>
                      23 celeries
                    </Text>
                    <SimpleLineIcons
                      name="energy"
                      size={15}
                      color="#238832"
                      style={{ bottom: 3 }}
                    />
                    <Text style={{ fontSize: 10 }}>60 Macros</Text>
                  </View>
                </View>
              </View>
              <TouchableOpacity
                style={{
                  backgroundColor: "#238832",
                  height: 48,
                  width: "90%",
                  alignSelf: "center",
                  borderRadius: 30,
                  justifyContent: "center",
                  marginTop: "210%",
                }}
                onPress={() => setModalVisible(false)}
              >
                <Text style={{ color: "#fff", textAlign: "center" }}>
                  Mark as Bought
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <View style={styles.listItemContainer}>
          <Feather
            name="list"
            size={15}
            color="black"
            style={{ marginRight: 5 }}
          />
          <TouchableOpacity>
            <Text style={styles.listItemText}>List 1/7 Completed</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <Feather
              name="search"
              size={20}
              color="#248C35"
              style={{ marginRight: 10 }}
            />
            <TextInput
              style={styles.searchTextInput}
              placeholder="Search"
              placeholderTextColor="#1E1E1E"
            />
          </View>
        </View>

        <Text style={styles.defaultText}>Meat</Text>

        <View style={styles.viewsContainer}>
          {["All", "Milk", "Mango", "Oranges"].map((viewName) => (
            <TouchableOpacity
              key={viewName}
              style={[
                styles.viewItem,
                selectedView === viewName && styles.selectedViewItem,
              ]}
              onPress={() => handleViewPress(viewName)}
            >
              <Text
                style={[
                  styles.viewItemText,
                  selectedView === viewName && styles.selectedViewItemText,
                ]}
              >
                {viewName}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={{ justifyContent: "flex-end", flex: 1 }}>
          <TouchableOpacity
            style={{
              backgroundColor: "#CFE6D2",
              height: 46,
              justifyContent: "center",
              borderRadius: 35,
            }}
            onPress={() => navigation.navigate("AddNewItem")}
          >
            <Text
              style={{
                color: "#279139",
                alignSelf: "center",
                textAlign: "center",
                fontSize: 16,
              }}
            >
              Add New Item
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
    paddingHorizontal: 15,
  },
  goBackButton: {
    height: 35,
    width: 35,
    justifyContent: "center",
  },
  mainContent: {
    flex: 1,
    backgroundColor: "#fff",
    borderTopRightRadius: 35,
    borderTopLeftRadius: 35,
    marginTop: 20,
    padding: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  headerText: {
    fontSize: 19,
    fontWeight: "bold",
  },
  shoppingCartIcon: {
    width: 44,
    height: 44,
    justifyContent: "center",
    backgroundColor: "#F2F2F2",
    borderRadius: 35,
  },
  cartIcon: {
    alignSelf: "center",
  },
  listItemContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  listItemText: {
    fontSize: 12,
    marginLeft: 5,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    marginTop: 15,
  },
  searchBar: {
    flexDirection: "row",
    flex: 1,
    borderRadius: 30,
    alignItems: "center",
    paddingHorizontal: 10,
    padding: 8,
    backgroundColor: "#F2F2F2",
    width: "80%",
  },
  searchTextInput: {
    flex: 1,
    fontSize: 14,
    padding: 0,
  },
  defaultText: {
    color: "black",
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 10,
  },
  viewsContainer: {
    justifyContent: "space-between",
    flexDirection: "row",
  },
  viewItem: {
    height: 26,
    width: 76,
    justifyContent: "center",
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "#F2F2F2",
  },
  viewItemText: {
    textAlign: "center",
    color: "#1E1E1E",
  },
  selectedViewItem: {
    backgroundColor: "#238832",
  },
  selectedViewItemText: {
    color: "#fff",
  },
  modalContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end", // Move modal to the right
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Overlay color
  },
  modalContent: {
    width: "70%", // Modal width set to 50%
    height: "90%", // Modal height set to 100%
    backgroundColor: "#FEFEFE",
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
    padding: 20,
  },
});

export default AlphaList;
