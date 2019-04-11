import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
// import firebaseConfig from './config';
import * as firebase from 'firebase';
import { createAppContainer, createSwitchNavigator, createDrawerNavigator, createBottomTabNavigator, createStackNavigator } from 'react-navigation';
import Loading from './src/screens/Loading';
import SignUp from './src/screens/SignUp';
import Login from './src/screens/Login';
import Events from './src/screens/Events';
import News from './src/screens/News';
import Stories from './src/screens/Stories';
import Education from './src/screens/Education';
import Icon from '@expo/vector-icons/Ionicons';
import { firebaseConfig } from './src/config/firebaseAPI';
import Holiday from './src/screens/Holiday';
import Blog from './src/screens/Blog'

firebase.initializeApp(firebaseConfig);
// git remote add origin [//your github url]

// //pull those changes

// git pull origin master

// //now, push your work to your new repo

// git push origin master


// export default class App extends React.Component {
//   render() {
//     return (
//       <View style={styles.container}>
//         <AppNavigator/>
//       </View>
//     );
//   }
// }


const WelcomeTabNavigator = createBottomTabNavigator({
  Events: {
    screen: Events,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => (
        <Icon name="md-filing" color={tintColor} size={24} />
      )
    }
  },
  News: {
    screen: News,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => (
        <Icon name="md-paper" color={tintColor} size={24} />
      )
    }
  },
  Stories: {
    screen: Stories,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => (
        <Icon name="md-book" color={tintColor} size={24} />
      )
    }
  },
  Education: {
    screen: Education,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => (
        <Icon name="md-information-circle-outline" color={tintColor} size={24} />
      )
    }
  },
  Blog: {
    screen: Blog,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => (
        <Icon name="md-calendar" color={tintColor} size={24} />
      )
    }
  },
}, {
    tabBarOptions: {
    }
}, {
  navigationOptions: ({navigation}) => {
    const { routeName } = navigation.state.routes[navigation.state.index];
    return {
      headerTitle: routeName
    }
  }
})

const WelcomeStackNavigator = createStackNavigator({
  WelcomeTabNavigator: WelcomeTabNavigator
}, {
  defaultNavigationOptions:({navigation}) => {
    return {
      headerLeft:(
        <Icon style={{paddingLeft: 10}} onPress={() => navigation.openDrawer()} name="md-menu" size={30}/>
      )
    }
  }
})

const AppDrawerNavigator = createDrawerNavigator({
  Dashboard: {
    screen: WelcomeStackNavigator
  }
})

export default createAppContainer(createSwitchNavigator({
  Loading: {
    screen: Loading
  },
  SignUp: {
    screen: SignUp
  },
  Login: {
    screen: Login
  },
  Events: {
    screen: AppDrawerNavigator
  },
  Blog: {
    screen: Blog
  }
}, {
    initialRouteName: 'Loading',
  }
));


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
