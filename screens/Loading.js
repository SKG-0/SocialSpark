import React, { Component } from 'react'
import { Text, View,ActivityIndicator,Image } from 'react-native'
import * as firebase from 'firebase'
export class Loading extends Component {
    componentDidMount(){
        firebase.auth().onAuthStateChanged(user=>{
            this.props.navigation.navigate(user?"App":"Auth")
        })
    }
    render() {
        return (
            <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                <Text style={{fontSize:24}}>Loading...</Text>
                <View style={{alignItems:"center"}}>
                    <Image source={require('../images/gif.gif')} style={{width:200,height:200}} />
                </View>
            </View>
        )
    }
}
export default Loading
