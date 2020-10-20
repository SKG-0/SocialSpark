import React, { Component } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Image,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import UserPermissions from "../utilities/UserPermissions";
import * as ImagePicker from "expo-image-picker";
import Firebase from "../Firebase";
import Fire from "../Fire";
import { AppLoading } from "expo";
import * as Font from "expo-font";
import { FontAwesome } from "@expo/vector-icons";
let customFonts = {
  "Raleway-SemiBold": require("../assets/fonts/Raleway-SemiBold.ttf"),
  "CabinSemiCondensed-Bold": require("../assets/fonts/CabinSemiCondensed-Bold.ttf"),
  "Pacifico-Regular": require("../assets/fonts/Pacifico-Regular.ttf"),
  "NotoSansHK-Medium": require("../assets/fonts/NotoSansHK-Medium.otf"),
  "NotoSansHK-Bold": require("../assets/fonts/NotoSansHK-Bold.otf"),
};
export class Post extends Component {
  state = {
    fontsLoaded: false,
    text: "",
    image: null,
    name: "",
    avatar: null,
    posts: 0,
  };
  async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
  }
  async componentDidMount() {
    this._loadFontsAsync();
    UserPermissions.getCameraPermission();
    Fire.shared.firestore
      .collection("users")
      .doc(Fire.shared.uid)
      .onSnapshot((doc) => {
        this.setState({
          name: doc.data().name,
          avatar: doc.data().avatar,
          posts: doc.data().posts,
        });
      });
  }
  pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [2, 2],
    });
    if (!result.cancelled) {
      this.setState({ image: result.uri });
    }
    if (result.cancelled) {
      alert("Please select an image");
    }
  };
  handlepost = async () => {
    if (this.state.image != null) {
      Firebase.database()
        .ref("Data/")
        .push({
          text: this.state.text,
          image: this.state.image,
          name: this.state.name,
          timestamp: Date.now(),
          avatar: this.state.avatar,
          uid: Fire.shared.uid,
          likes: 0,
          likeimage:require('../images/heart-outline.png')
        })
        .then((data) => {
          Fire.shared.firestore
            .collection("users")
            .doc(Fire.shared.uid)
            .update({
              posts: this.state.posts + 1,
            })
            .then((data) => {})
            .catch((err) => {
              alert(err);
            });
          this.props.navigation.goBack();
        })
        .catch((err) => {
          alert(err);
        });
      this.setState({ image: null, text: "" });
    } else {
      alert("Please Select An Image");
    }
  };
  render() {
    if (this.state.fontsLoaded) {
      return (
        <View>
          <ScrollView>
            <View
              style={{
                flexDirection: "row",
                paddingTop: 40,
                backgroundColor: "#E9446A",
                borderBottomRightRadius: 50,
                borderBottomLeftRadius: 50,
                paddingBottom: 20,
                marginBottom: 20,
              }}
            >
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate("Home")}
              >
                <FontAwesome
                  name="arrow-left"
                  style={{ color: "#ced4da", paddingLeft: 20 }}
                  size={16}
                />
              </TouchableOpacity>
              <Text
                style={{
                  fontSize: 38,
                  color: "white",
                  fontFamily: "Pacifico-Regular",
                  marginLeft: "30%",
                }}
              >
                Post
              </Text>
            </View>
            <TextInput
              placeholder="Want to share something"
              multiline={true}
              onChangeText={(text) => this.setState({ text })}
              value={this.state.text}
              style={{
                marginLeft: 20,
                marginBottom: 10,
                marginRight: 30,
                fontSize: 20,
              }}
            />
            <TouchableOpacity>
              <Ionicons
                name="md-camera"
                size={34}
                style={{ textAlign: "right", marginRight: 30 }}
                onPress={this.pickImage}
              />
            </TouchableOpacity>
            <View style={{ marginHorizontal: 32, marginTop: 20 }}>
              <Image
                source={{ uri: this.state.image }}
                style={{ width: "100%", height: 300 }}
              />
            </View>
            <TouchableOpacity
              style={{
                paddingVertical: 6,
                backgroundColor: "#E9446A",
                width: "90%",
                alignItems: "center",
                marginTop: "35%",
                marginLeft: 18,
                borderRadius: 30,
                marginBottom: 20,
              }}
              onPress={this.handlepost}
            >
              <Text
                style={{
                  color: "white",
                  fontSize: 20,
                  fontFamily: "Raleway-SemiBold",
                }}
              >
                Post
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      );
    } else {
      return <AppLoading />;
    }
  }
}

export default Post;
