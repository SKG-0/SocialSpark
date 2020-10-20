import React, { Component } from "react";
import { Text, View, ScrollView, Image, TouchableOpacity } from "react-native";
import { AppLoading } from "expo";
import * as Font from "expo-font";
import moment from "moment";
import Firebase from "../Firebase";
import { NavigationEvents } from "react-navigation";
import Fire from "../Fire";
console.disableYellowBox = true;
let customFonts = {
  "Raleway-SemiBold": require("../assets/fonts/Raleway-SemiBold.ttf"),
  "CabinSemiCondensed-Bold": require("../assets/fonts/CabinSemiCondensed-Bold.ttf"),
  "Pacifico-Regular": require("../assets/fonts/Pacifico-Regular.ttf"),
  "NotoSansHK-Medium": require("../assets/fonts/NotoSansHK-Medium.otf"),
  "NotoSansHK-Bold": require("../assets/fonts/NotoSansHK-Bold.otf"),
};
export class Home extends Component {
  state = {
    fontsLoaded: false,
    data: {},
    likeimage: require("../images/heart-outline.png"),
    liked: false,
    likes: 0
  };
  async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
  }
  renderpost = () => {
    Firebase.database()
      .ref("Data")
      .once("value")
      .then((snapshot) => {
        this.setState({ data: snapshot.val(), likes: snapshot.val().likes })
      });
  };
  handlelikes = () => {
    this.setState({ likeimage: require("../images/heart.png"), liked: true });
  };
  async componentDidMount() {
    Firebase.database()
      .ref("Data")
      .once("value")
      .then((snapshot) => {
        console.log(snapshot.val())
        this.setState({ data: snapshot.val(), likes: snapshot.val().likes });
      });
    this._loadFontsAsync();
  }
  render() {
    const data = Object.values(this.state.data);
    if (this.state.fontsLoaded) {
      return (
        <View>
          <View
            style={{
              paddingTop: 10,
              backgroundColor: "#E9446A",
              borderBottomRightRadius: 50,
              borderBottomLeftRadius: 50,
              marginBottom: 5,
            }}
          >
            <Text
              style={{
                fontSize: 38,
                color: "white",
                fontFamily: "Pacifico-Regular",
                textAlign: "center",
              }}
            >
              Feed
            </Text>
          </View>
          <View>
            <ScrollView>
              {data.map((item) => (
                <ScrollView
                  style={{
                    paddingHorizontal: 10,
                    paddingTop: 10,
                    marginVertical: 10,
                    marginHorizontal: 10,
                  }}
                >
                  <NavigationEvents onDidFocus={() => this.renderpost()} />
                  <View>
                    <View style={{ flexDirection: "row" }}>
                      <TouchableOpacity
                        onPress={() =>
                          this.props.navigation.navigate("User", item)
                        }
                      >
                        <Image
                          source={{ uri: item.avatar }}
                          style={{ width: 50, height: 50, borderRadius: 50 }}
                        />
                      </TouchableOpacity>
                      <Text
                        style={{
                          textAlignVertical: "center",
                          marginLeft: 10,
                          fontSize: 18,
                        }}
                      >
                        {item.name}
                      </Text>
                    </View>
                    <Text
                      style={{
                        marginTop: 10,
                        fontSize: 16,
                      }}
                    >
                      {item.text}
                    </Text>
                    <Image
                      source={{ uri: item.image }}
                      style={{
                        width: "100%",
                        height: 300,
                        marginTop: 10,
                        borderRadius: 10,
                      }}
                    />
                    <Text
                      style={{
                        marginTop: 10,
                        fontSize: 12,
                        marginBottom: 10,
                      }}
                    >
                      {moment(item.timestamp).fromNow()}
                    </Text>
                  </View>
                </ScrollView>
              ))}
              <View style={{ marginTop: 200 }}></View>
            </ScrollView>
          </View>
        </View>
      );
    } else {
      return <AppLoading />;
    }
  }
}

export default Home;
