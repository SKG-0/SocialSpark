import React, { Component } from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import Fire from "../Fire";
import * as Font from "expo-font";
import { AppLoading } from "expo";
export class Profile extends Component {
  state = {
    fontsLoaded: false,
    name: "",
    avatar: "",
    bio: "",
    following: 0,
    followers: 0,
    posts: 0,
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
    Fire.shared.firestore
      .collection("users")
      .doc(Fire.shared.uid)
      .onSnapshot((doc) => {
        this.setState({
          name: doc.data().name,
          avatar: doc.data().avatar,
          bio: doc.data().bio,
          following: doc.data().following,
          followers: doc.data().followers,
          posts: doc.data().posts,
        });
      });
  }
  render() {
    if (this.state.fontsLoaded) {
      return (
        <View>
          <View
            style={{
              backgroundColor: "#E9446A",
              borderBottomRightRadius: 50,
              borderBottomLeftRadius: 50,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 40,
              }}
            >
              <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
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
                }}
              >
                Profile
              </Text>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate("Edit")}
              >
                <FontAwesome
                  name="pencil"
                  style={{ color: "#ced4da", paddingRight: 20 }}
                  size={16}
                ></FontAwesome>
              </TouchableOpacity>
            </View>
            <View style={{ alignItems: "center", marginTop: 50 }}>
              <View
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: 50,
                  alignItems: "center",
                }}
              >
                <Image
                  source={{ uri: this.state.avatar }}
                  style={{ width: 100, height: 100, borderRadius: 50 }}
                />
              </View>
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
                  marginBottom: 15,
                }}
              >
                {this.state.name}
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
                {this.state.bio}
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
                <FontAwesome name="plus-circle" size={20} style={{color:"#6f4518",paddingRight:10}} />
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
              onPress={Fire.shared.signOut}
            >
              <View style={{flexDirection:'row'}}>
                <FontAwesome name="sign-out" size={20} style={{color:"gray",paddingRight:10}} />
                <Text
                  style={{
                    fontSize: 18,
                    marginBottom: 5,
                    fontFamily: "CabinSemiCondensed-Bold",
                  }}
                >
                  Sign Out
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
export default Profile;
