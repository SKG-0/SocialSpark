import React, { Component } from "react";
import * as firebase from "firebase";
import { FontAwesome } from "@expo/vector-icons";
import { Text, View, TextInput, TouchableOpacity, Image } from "react-native";
import { AppLoading } from "expo";
import * as Font from "expo-font";
console.disableYellowBox = true;
let customFonts = {
  "Montserrat-Regular": require("../assets/fonts/Montserrat-Regular.ttf"),
  "Raleway-SemiBold": require("../assets/fonts/Raleway-SemiBold.ttf"),
};
export class Login extends Component {
  state = {
    fontsLoaded: false,
    email: "",
    password: "",
  };

  async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
  }

  async componentDidMount() {
    this._loadFontsAsync();
  }
  handlelogin = () => {
    const { email, password } = this.state;
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch((err) => alert(err));
  };
  render() {
    if (this.state.fontsLoaded) {
      return (
        <View
          style={{
            height: "100%",
            width: "100%",
            backgroundColor:'#6290c8'
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
              color:'white'
            }}
          >
            Login
          </Text>
          <View>
            <View
              style={{
                marginHorizontal: 25,
                marginBottom: 50,
                borderBottomWidth: 0.6,
                paddingBottom: 2,
                borderBottomColor:'#dee2e6'
              }}
            >
              <TextInput
                placeholder="Email"
                placeholderTextColor="#dee2e6"
                style={{
                  color: "#dee2e6",
                  fontSize: 18
                }}
                onChangeText={(email) => this.setState({ email })}
                value={this.state.email}
                autoCapitalize="none"
              />
            </View>
            <View
              style={{
                marginHorizontal: 25,
                marginBottom: 30,
                borderBottomWidth: 0.6,
                paddingBottom: 2,
                borderBottomColor:'#dee2e6'
              }}
            >
              <TextInput
                placeholder="Password"
                placeholderTextColor="#dee2e6"
                secureTextEntry={true}
                style={{
                  color: "#dee2e6",
                  fontSize: 18,
                }}
                onChangeText={(password) => this.setState({ password })}
                value={this.state.password}
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
              onPress={this.handlelogin}
            >
              <FontAwesome
                style={{ color: "white"}} name="arrow-right" size={34}
              >
              </FontAwesome>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={{ marginTop: 50 }}
            onPress={() => this.props.navigation.navigate("Register")}
          >
            <Text
              style={{ textAlign: "center", marginLeft: 0, paddingLeft: 0,color:'#dee2e6' }}
            >
              New To Socialspark ?
              <Text style={{ color: "#E9446A" }}>  Sign Up</Text>
            </Text>
          </TouchableOpacity>
        </View>
      );
    } else {
      return <AppLoading />;
    }
  }
}

export default Login;
