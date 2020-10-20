import React, { Component } from "react";
import { Text, View, Image, TouchableOpacity, TextInput } from "react-native";
import Fire from "../Fire";
import UserPermissions from "../utilities/UserPermissions";
import { FontAwesome } from "@expo/vector-icons";
import * as Font from "expo-font";
import * as ImagePicker from "expo-image-picker";
import { AppLoading } from "expo";
export class Edit extends Component {
  state = {
    avatar: null,
    name: "",
    bio: "",
    fontsLoaded: false,
  };
  async _loadFontsAsync() {
    await Font.loadAsync({
      "Raleway-SemiBold": require("../assets/fonts/Raleway-SemiBold.ttf"),
      "CabinSemiCondensed-Bold": require("../assets/fonts/CabinSemiCondensed-Bold.ttf"),
      "Pacifico-Regular": require("../assets/fonts/Pacifico-Regular.ttf"),
      "NotoSansHK-Medium": require("../assets/fonts/NotoSansHK-Medium.otf"),
      "NotoSansHK-Bold": require("../assets/fonts/NotoSansHK-Bold.otf"),
    });
    this.setState({ fontsLoaded: true });
  }
  async componentDidMount() {
    this._loadFontsAsync();
    Fire.shared.firestore
      .collection("users")
      .doc(Fire.shared.uid)
      .onSnapshot((doc) => {
        this.setState({
          name: doc.data().name,
          avatar: doc.data().avatar,
          bio: doc.data().bio,
        });
      });
  }
  handlepickavatar = async () => {
    UserPermissions.getCameraPermission();
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
    });
    if (!result.cancelled) {
      this.setState({ avatar: result.uri });
    }
  };
  handleedit = async () => {
      console.log(this.state.avatar,this.state.name,this.state.bio)
      Fire.shared.firestore
      .collection("users")
      .doc(Fire.shared.uid)
      .update({
        avatar: this.state.avatar,
        name: this.state.name,
        bio: this.state.bio,
      })
      .then(() => {
        this.props.navigation.navigate("Profile")
      })
      .catch((err) => {
        alert(err);
      });
  };
  render() {
    if (this.state.fontsLoaded) {
      return (
        <View style={{ flex: 1, textAlign: "center" }}>
          <View
            style={{
              backgroundColor: "#006ba6",
              borderBottomRightRadius: 50,
              borderBottomLeftRadius: 50,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                marginTop: 40,
              }}
            >
              <TouchableOpacity onPress={() => this.props.navigation.navigate("Profile")}>
                <FontAwesome
                  name="arrow-left"
                  style={{ color: "#ced4da", paddingLeft: 20 }}
                  size={16}
                ></FontAwesome>
              </TouchableOpacity>
              <Text
                style={{
                  fontSize: 38,
                  color: "white",
                  fontFamily: "Pacifico-Regular",
                  marginLeft: "32%",
                }}
              >
                Edit
              </Text>
            </View>
            <View style={{ alignItems: "center", marginTop: 20 }}>
              <TouchableOpacity
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: 50,
                  alignItems: "center",
                  backgroundColor: "gray",
                  marginBottom: 40,
                  marginTop: 20,
                }}
                onPress={this.handlepickavatar}
              >
                <Image
                  source={{ uri: this.state.avatar }}
                  style={{
                    position: "absolute",
                    width: 100,
                    height: 100,
                    borderRadius: 50,
                  }}
                />
                <FontAwesome
                  name="plus"
                  size={30}
                  style={{ marginTop: "35%", color: "white" }}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 40,
              paddingHorizontal: 15,
              paddingBottom: 10,
              paddingTop: 10,
              borderWidth: 0,
              elevation: 0.5,
              marginHorizontal: 3,
            }}
          >
            <Text
              style={{
                fontSize: 18,
                fontFamily: "CabinSemiCondensed-Bold",
                textAlignVertical: "center",
              }}
            >
              Name
            </Text>
            <TextInput
              style={{
                fontSize: 16,
                color: "#6c757d",
              }}
              placeholder="Enter Name"
              onChangeText={(name) => this.setState({ name })}
              maxLength={30}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 30,
              paddingHorizontal: 15,
              paddingBottom: 10,
              paddingTop: 10,
              borderWidth: 0,
              elevation: 0.5,
              marginHorizontal: 3,
            }}
          >
            <Text
              style={{
                fontSize: 18,
                fontFamily: "CabinSemiCondensed-Bold",
                textAlignVertical: "center",
              }}
            >
              Bio
            </Text>
            <TextInput
              placeholder="Enter Bio"
              style={{ fontSize: 16, color: "#6c757d" }}
              onChangeText={(bio) => this.setState({ bio })}
              maxLength={30}
            />
          </View>
          <TouchableOpacity
            style={{
              position: "absolute",
              bottom: 0,
              paddingVertical: 10,
              backgroundColor: "#006ba6",
              width: "100%",
              alignItems: "center"
            }}
            onPress={this.handleedit}
          >
            <Text
              style={{
                color: "white",
                fontSize: 20,
                fontFamily: "Raleway-SemiBold",
              }}
            >
              Update
            </Text>
          </TouchableOpacity>
        </View>
      );
    } else {
      return <AppLoading />;
    }
  }
}

export default Edit;
