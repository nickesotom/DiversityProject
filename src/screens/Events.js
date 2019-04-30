import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  TouchableOpacity,
  FlatList,
  Modal,
  Platform
} from "react-native";
import { Ionicons } from '@expo/vector-icons';

import { Fab } from 'native-base';
import * as firebase from 'firebase';
import { firebaseConfig } from '../config/firebaseAPI'
import { Card } from 'react-native-elements'
import { Constants } from "expo";
import { TextInput } from "react-native-gesture-handler";
class Events extends Component {
  
  constructor(props) {
    super(props);
    
    this.state = {
      nameOfEvent: '',
      // date: '',
      // location: '',
      events: [],
      currentUser: null,
      refreshing: false,
      showTextInput: false,
    };
    this.addItem = this.addItem.bind(this);
    // this.removeItem = this.removeItem.bind(this);

  }


  componentDidMount() {
    const { currentUser } = firebase.auth()
    this.setState({ currentUser })
    const userID = firebase.auth().currentUser.email
    if (userID === 'test123@gmail.com') {
      this.setState({showTextInput: true})
    }
    

    // firebase
    //   .database()
    //   .ref("events/")
      
    //   .once("value", snapshot => {
    //     const data = snapshot.val()
    //     if (data) {
    //       const initEvents = [];
    //       Object
    //         .keys(data)
    //         .forEach(events => initEvents.push(data[events]));
    //       this.setState({
    //         events: initEvents
    //       })
    //     }
    //   });

    // firebase.database().ref('/events').on('child_added', data => {
    //   var newData = [...this.state.events]
    //   newData.push[data]
    //   this.setState({ events: newData })
    //   // console.warn(data)
    // })
    firebase
      .database()
      .ref("events")
      .on("child_added", snapshot => {
        const data = snapshot.val();
        if (data) {
          this.setState(prevState => ({
            events: [data, ...prevState.events]
          }))
        }
      })
  }
  addItem() {
    // firebase function here for sending the data
    if (!this.state.nameOfEvent) return;
    // let key = firebase.database().ref('/events').push().key
    // firebase.database().ref('/events').child(key).set(this.state.nameOfEvent, () => this.setState({nameOfEvent: ''}))
    // firebase.database().ref('/events').child(key).set({name: data})

    const newEvent = firebase.database().ref().child('events/').push();
    

    //TODO: figure out how to display all the information i need and then see if i can place them in a card viewer
    
    newEvent.set(this.state.nameOfEvent, () => this.setState({ nameOfEvent: '' }))
    

    // newDate.set(this.state.date, () => this.setState({ date: '' }))
    // newLocation.set(this.state.location, () => this.setState({ location: '' }))

  }

  editItem() {
    
  }
  
  // handleSignOut = () => {
  //   firebase.auth().signOut().then(() => {
  //     this.props.navigation.navigate('Login')
  //   }).catch(error => this.setState({ errorMessage: error.message }))
  // }

  handleRefresh = () => {
    const res = firebase
      .database()
      .ref("events/")

      .once("value", snapshot => {
        const data = snapshot.val()
        if (data) {
          const initEvents = [];
          Object
            .keys(data)
            .forEach(events => initEvents.push(data[events]));
          this.setState({
            events: initEvents
          })
        }
      });
    this.setState({
      res,
    })
  }
  
  render() {
    
    const { currentUser } = this.state;
    return (
      <View style={styles.container}>{
        this.state.showTextInput &&
        <View style={styles.msgBox}>
          <TextInput 
            value={this.state.nameOfEvent}
            // multiline={true}
            placeholder='Enter Event Information'
            onChangeText={(name) => this.setState({nameOfEvent: name})}
            style={styles.textInput}/>
        </View>
      } 
        {this.state.showTextInput &&
        
        <TouchableOpacity
          style={styles.addButton}
          onPress={this.addItem}>

          <Text style={{ color: 'white', fontSize: 20 }}>Send</Text>

        </TouchableOpacity>}

        <FlatList 
          data={this.state.events}
          refreshing={this.state.refreshing}
          onRefresh={this.handleRefresh}
          renderItem={({item}) => 
            <View style={styles.note}>
              <Text style={styles.noteText}>
                {item}
                
              </Text>
              <TouchableOpacity
                style={styles.noteDelete}>
                {/*<Ionicons name="md-trash" color={'white'} size={25}/>*/}
              </TouchableOpacity>
            </View>
          }
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
  }
}

export default Events;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#d3d3d3'
  },
  
  msgBox: {
    flexDirection: 'row',
    // padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingLeft: 40,
    height: 55,
    width: '70%',
    right: 60,
  },
  textInput: {
    flex: 1
  },
  addButton: {
    // position: 'absolute',
    zIndex: 11,
    backgroundColor: '#e91e63',
    width: 90,
    height: 55,
    alignSelf: 'flex-end',
    borderRadius: 10,
    marginTop: -5,
    bottom: 51,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 100,
  },
  note: {
    position: 'relative',
    padding: 20,
    paddingRight: 100,
    borderBottomWidth: 2,
    borderBottomColor: '#ededed',
  },
  noteText: {
    paddingLeft: 20,
    borderLeftWidth: 10,
    borderLeftColor: '#D3D3D3',
    fontSize: 20,
    color: '#424949'
  },
  noteDelete: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2980b9',
    padding: 10,
    top: 10,
    bottom: 10,
    right: 10
  },
  noteDeleteText: {
    color: 'white',
  }
});