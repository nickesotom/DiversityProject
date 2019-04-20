import React from 'react';
import {
  Text,
  Platform,
  View,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import { Button } from 'native-base';

import * as firebase from 'firebase';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;


export default class MenuDrawer extends React.Component {
  handleSignOut = () => {
    firebase.auth().signOut().then(() => {
      this.props.navigation.navigate('Login')
    }).catch(error => this.setState({ errorMessage: error.message }))
  }
  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.scroller}>
          <View style={styles.topLinks}>
            <View style={styles.profile}>
              <View style={styles.imgView}>
              </View>
            </View>
          </View>
        </ScrollView>
        <View style={styles.footer}>
          <Button
            bordered  
            style={styles.signOutButton}
            onPress={this.handleSignOut}>
            <Text style={styles.signOutText}>Sign Out</Text>
          </Button>
          <Text style={styles.version}>v1.0</Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  scroller: {
    flex: 1
  },
  profile: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 25,
    borderBottomWidth: 1,
    borderBottomColor: '#777777'
  },
  signOutButton: {
    backgroundColor: '#abcdef',
    left: 20,
  },
  signOutText: {
    fontSize: 20
  },
  profileText: {
    flex: 3,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  name: {
    fontSize: 20,
    paddingBottom: 5,
    color: 'white',
    textAlign: 'left',
  },
  img: {
    height: 70,
    width: 70,
    borderRadius: 40
  },
  imgView: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    paddingLeft: 20,
    paddingRight: 20,
  },
  link: {
    flex: 1,
    fontSize: 20,
    padding: 6,
    paddingLeft: 14,
    margin: 5,
    textAlign: 'left',
  },
  topLinks: {
    height: 160,
    backgroundColor: 'white',
  },
  bottomLinks: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 10,
    paddingBottom: 450,
  },
  footer: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: 'lightgrey'
  },
  version: {
    flex: 1,
    textAlign: 'right',
    marginRight: 20,
    color: 'grey'
  },
  description: {
    flex: 1,
    marginLeft: 20,
    fontSize: 16
  }
})