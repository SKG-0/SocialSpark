import React, { Component } from "react";
import { Text, View, TextInput, TouchableOpacity,Image } from "react-native";
import { AppLoading } from "expo";
import * as Font from "expo-font";
import Fire from "../Fire";
import { FontAwesome } from "@expo/vector-icons";
import { YellowBox } from "react-native";
import _ from "lodash";

YellowBox.ignoreWarnings(["Setting a timer"]);
const _console = _.clone(console);
console.warn = (message) => {
  if (message.indexOf("Setting a timer") <= -1) {
    _console.warn(message);
  }
};
console.disableYellowBox = true;
let customFonts = {
  "Montserrat-Regular": require("../assets/fonts/Montserrat-Regular.ttf"),
  "Raleway-SemiBold": require("../assets/fonts/Raleway-SemiBold.ttf"),
};
export class Register extends Component {
  state = {
    fontsLoaded: false,
    user: {
      name: "",
      email: "",
      password: "",
    },
  };

  async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
  }

  async componentDidMount() {
    this._loadFontsAsync();
  }
  handlesignup = () => {
    Fire.shared.createUser(this.state.user);
  };
  render() {
    if (this.state.fontsLoaded) {
      return (
        <View
          style={{
            height: "100%",
            width: "100%",
            backgroundColor: "#6290c8",
          }}
        >
          <View style={{ marginTop: 40, alignItems: "center" }}>
            <Image
              source={require("../images/image1.png")}
              style={{
                width: 700,
                height: 250,
                marginTop: -90,
                marginRight: -40,
              }}
            ></Image>
            <Image
              source={require("../images/image2.png")}
              style={{ position: "absolute", bottom: -980, right: -170 }}
            ></Image>
          </View>
          <Text
            style={{
              fontSize: 44,
              marginBottom: "20%",
              fontFamily: "Raleway-SemiBold",
              textAlign: "center",
              color: "white",
            }}
          >
            Register
          </Text>
          <View>
            <View
              style={{
                marginHorizontal: 25,
                marginBottom: 40,
                borderBottomWidth: 0.6,
                paddingBottom: 2,
                borderBottomColor:'#dee2e6'
              }}
            >
              <TextInput
                placeholder="Enter Name"
                placeholderTextColor="#dee2e6"
                style={{
                  color: "#dee2e6",
                  fontSize: 18
                }}
                onChangeText={(name) =>
                  this.setState({ user: { ...this.state.user, name } })
                }
                value={this.state.user.name}
              />
            </View>
            <View
              style={{
                marginHorizontal: 25,
                marginBottom: 40,
                borderBottomWidth: 0.6,
                paddingBottom: 2,
                borderBottomColor:'#dee2e6'
              }}
            >
              <TextInput
                placeholder="Enter Email"
                placeholderTextColor="#dee2e6"
                style={{
                  color: "#dee2e6",
                  fontSize: 18,
                }}
                onChangeText={(email) =>
                  this.setState({ user: { ...this.state.user, email } })
                }
                value={this.state.user.email}
                autoCapitalize="none"
              />
            </View>
            <View
              style={{
                marginHorizontal: 25,
                marginBottom: 40,
                borderBottomWidth: 0.6,
                paddingBottom: 2,
                borderBottomColor:'#dee2e6'
              }}
            >
              <TextInput
                placeholder="Enter Password"
                placeholderTextColor="#dee2e6"
                secureTextEntry={true}
                style={{
                  color: "#dee2e6",
                  fontSize: 18,
                }}
                autoCapitalize="none"
                onChangeText={(password) =>
                  this.setState({ user: { ...this.state.user, password } })
                }
                value={this.state.user.password}
                autoCapitalize="none"
              />
            </View>
          </View>
          <View style={{alignItems:'flex-end',marginRight:20}}>
            <TouchableOpacity
              style={{
                backgroundColor: "#E9446A",
                padding: 10,
                marginTop: 30,
                borderRadius:34,height:60,width:60,
                alignItems:'center'
              }}
              onPress={this.handlesignup}
            >
              <FontAwesome
                style={{ color: "white"}} name="arrow-right" size={34}
              >
              </FontAwesome>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={{ marginTop: 20 }}
            onPress={() => this.props.navigation.navigate("Login")}
          >
            <Text style={{ textAlign: "center", marginLeft: 0, paddingLeft: 0,color:'white' }}>
              Have an Account ? <Text style={{ color: "#E9446A" }}>Log in</Text>
            </Text>
          </TouchableOpacity>
        </View>
      );
    } else {
      return <AppLoading />;
    }
  }
}

export default Register;
