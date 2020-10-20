import React, { Component } from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";
import Fire from "../Fire";
import { FontAwesome } from "@expo/vector-icons";
import Firebase from "../Firebase";
import { AppLoading } from "expo";
import * as Font from "expo-font";
export class User extends Component {
  state = {
    data: "",
    following: 0,
    followers: 0,
    posts: 0,
    userfollowing: 0,
    text: "Follow",
    uid: [],
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
  componentDidMount() {
    this._loadFontsAsync();
    if (this.props.navigation.state.params.uid === Fire.shared.uid) {
      this.props.navigation.navigate("Profile");
    } else {
      Fire.shared.firestore
        .collection("users")
        .doc(this.props.navigation.state.params.uid)
        .onSnapshot((doc) => {
          this.setState({
            data: doc.data(),
            posts: doc.data().posts,
            followers: doc.data().followers,
            following: doc.data().following,
            uid: doc.data().uid,
            text: doc.data().text,
          });
        });
      Fire.shared.firestore
        .collection("users")
        .doc(Fire.shared.uid)
        .onSnapshot((doc) => {
          this.setState({ userfollowing: doc.data().following });
        });
      Fire.shared.firestore
        .collection("users")
        .doc(this.props.navigation.state.params.uid)
        .onSnapshot((doc) => {
          if (doc.data().uid.includes(Fire.shared.uid)) {
            this.setState({ text: "Following" });
          } else {
            this.setState({ text: "Follow" });
          }
        });
    }
  }
  increase = () => {
    this.state.uid.push(Fire.shared.uid);
    Fire.shared.firestore
      .collection("users")
      .doc(this.props.navigation.state.params.uid)
      .update({
        followers: this.state.followers + 1,
        uid: this.state.uid,
        text: "Following",
      });
    Fire.shared.firestore
      .collection("users")
      .doc(Fire.shared.uid)
      .update({
        following: this.state.userfollowing + 1,
      });
  };
  decrease = () => {
    let index = this.state.uid.indexOf(Fire.shared.uid);
    this.state.uid.splice(index, 1);
    Fire.shared.firestore
      .collection("users")
      .doc(this.props.navigation.state.params.uid)
      .update({
        followers: this.state.followers - 1,
        uid: this.state.uid,
        text: "Follow",
      });
    Fire.shared.firestore
      .collection("users")
      .doc(Fire.shared.uid)
      .update({
        following: this.state.userfollowing - 1,
      });
  };
  handlefollow = () => {
    if (this.state.text === "Follow") {
      this.increase();
    } else if (this.state.text === "Following") {
      this.decrease();
    }
  };
  styles = () => {
    if (this.state.text === "Follow") {
      return {
        textAlign: "center",
        backgroundColor: "#1DB954",
        color: "white",
        marginHorizontal: "30%",
        padding: 5,
        fontSize: 20,
        borderRadius: 40,
      };
    } else {
      return {
        textAlign: "center",
        backgroundColor: "white",
        color: "#1DB954",
        marginHorizontal: "30%",
        padding: 5,
        fontSize: 20,
        borderRadius: 40,
        borderColor: "#1DB954",
        borderWidth: 0.5,
      };
    }
  };
  render() {
    if (this.state.fontsLoaded) {
      return (
        <View>
          <View
            style={{
              backgroundColor: "#355070",
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
                User
              </Text>
            </View>
            <View
              style={{
                alignItems: "center",
                marginTop: 40,
              }}
            >
              <Image
                source={{ uri: this.state.data.avatar }}
                style={{ width: 100, height: 100, borderRadius: 50 }}
              />
            </View>
            <View>
              <Text
                style={{
                  marginTop: 10,
                  textAlign: "center",
                  fontSize: 30,
                  color: "white",
                  fontFamily: "CabinSemiCondensed-Bold",
                  marginTop: 20,
                  marginBottom: 25,
                }}
              >
                {this.state.data.name}
              </Text>
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 15,
                  marginHorizontal: 20,
                  marginBottom: 30,
                  color: "white",
                  fontFamily: "CabinSemiCondensed-Bold",
                }}
              >
                {this.state.data.bio}
              </Text>
            </View>
          </View>
          <View
            style={{
              marginTop: 30,
              marginBottom: 20,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: 20,
                paddingHorizontal: 10,
                borderBottomWidth: 0.5,
                paddingBottom: 10,
              }}
            >
              <View style={{flexDirection:'row'}}>
                <FontAwesome name="users" size={20} style={{color:"#4895ef",paddingRight:10}} />
                <Text
                  style={{
                    fontSize: 18,
                    marginBottom: 5,
                    fontFamily: "CabinSemiCondensed-Bold",
                  }}
                >
                  Following
                </Text>
              </View>
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 14,
                  fontFamily: "CabinSemiCondensed-Bold",
                }}
              >
                {this.state.following}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: 20,
                paddingHorizontal: 10,
                borderBottomWidth: 0.5,
                paddingBottom: 10,
              }}
            >
              <View style={{flexDirection:'row'}}>
                <FontAwesome name="plus-circle" size={20} style={{color:"green",paddingRight:10}} />
                <Text
                  style={{
                    fontSize: 18,
                    marginBottom: 5,
                    fontFamily: "CabinSemiCondensed-Bold",
                  }}
                >
                  Posts
                </Text>
              </View>
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 14,
                  fontFamily: "CabinSemiCondensed-Bold",
                }}
              >
                {this.state.posts}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: 20,
                paddingHorizontal: 10,
                borderBottomWidth: 0.5,
                paddingBottom: 10,
              }}
            >
              <View style={{flexDirection:'row'}}>
                <FontAwesome name="heart" size={20} style={{color:"red",paddingRight:10}} />
                <Text
                  style={{
                    fontSize: 18,
                    marginBottom: 5,
                    fontFamily: "CabinSemiCondensed-Bold",
                  }}
                >
                  Followers
                </Text>
              </View>
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 14,
                  fontFamily: "CabinSemiCondensed-Bold",
                }}
              >
                {this.state.followers}
              </Text>
            </View>
            <TouchableOpacity
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: 20,
                paddingHorizontal: 10,
                borderBottomWidth: 0.5,
                paddingBottom: 10,
              }}
              onPress={this.handlefollow}
            >
              <View style={{flexDirection:'row'}}>
                <FontAwesome name="user-plus" size={20} style={{color:"purple",paddingRight:10}} />
                <Text
                  style={{
                    fontSize: 18,
                    marginBottom: 5,
                    fontFamily: "CabinSemiCondensed-Bold",
                  }}
                >
                  {this.state.text}
                </Text>
              </View>
              <FontAwesome name="chevron-right" size={12} style={{textAlignVertical:'center'}} />
            </TouchableOpacity>
          </View>
        </View>
      );
    } else {
      return <AppLoading />;
    }
  }
}

export default User;
