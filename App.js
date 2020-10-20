import React,{Component} from 'react'
import {Ionicons} from '@expo/vector-icons'
import {createAppContainer,createSwitchNavigator} from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack'
import {createBottomTabNavigator} from 'react-navigation-tabs'
import Loading from './screens/Loading'
import Home from './screens/Home'
import Register from './screens/Register'
import Login from './screens/Login'
import Profile from './screens/Profile'
import Edit from './screens/Edit'
import Post from './screens/Post'
import User from './screens/User'
const AppContainer=createStackNavigator({
  default:createBottomTabNavigator({
    Home:{
      screen:Home,
      navigationOptions:{
        tabBarIcon:({tintColor})=> < Ionicons name="ios-home" size={30} color={tintColor} />
      }
    },
    Post:{
      screen:Post,
      navigationOptions:{
        tabBarIcon:({tintColor})=> < Ionicons name="ios-add-circle" size={30} color={tintColor} />
      }
    },
    Profile:{
      screen:Profile,
      navigationOptions:{
        tabBarIcon:({tintColor})=> < Ionicons name="ios-person" size={30} color={tintColor} />
      }
    },
  },{
    tabBarOptions:{
      activeTintColor:'#E9446A',
      inactiveTintColor:'#adb5bd',
      showLabel:false
    },
    initialRouteName:"Home"
  }),
},
{
  headerMode:'none'
})
const AuthStack=createStackNavigator({
  Login:{
    screen:Login,
    navigationOptions:{
      headerShown:false
    }
  },
  Register:{
    screen:Register,
    navigationOptions:{
      headerShown:false
    }
  }
},{
  initialRouteName:"Login"
})
export default createAppContainer(
  createSwitchNavigator({
    Loading:Loading,
    Auth:AuthStack,
    App:AppContainer,
    Edit:Edit,
    User:User
  },{
    initialRouteName:'Loading'
  })
)
