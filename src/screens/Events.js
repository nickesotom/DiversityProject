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
      refreshing: false
    };
    this.addItem = this.addItem.bind(this);
    // this.removeItem = this.removeItem.bind(this);

  }


  componentDidMount() {
    const { currentUser } = firebase.auth()
    this.setState({ currentUser })

    

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
    let key = firebase.database().ref('/events').push().key
    firebase.database().ref('/events').child(key).set(this.state.nameOfEvent, () => this.setState({nameOfEvent: ''}))
    // firebase.database().ref('/events').child(key).set({name: data})

    // const newEvent = firebase.database().ref().child('events/').push();
    

    //TODO: figure out how to display all the information i need and then see if i can place them in a card viewer

    // newEvent.set(this.state.nameOfEvent, () => this.setState({ nameOfEvent: '' }))

    // newDate.set(this.state.date, () => this.setState({ date: '' }))
    // newLocation.set(this.state.location, () => this.setState({ location: '' }))

  }

  editItem() {
    
  }
  
  handleSignOut = () => {
    firebase.auth().signOut().then(() => {
      this.props.navigation.navigate('Login')
    }).catch(error => this.setState({ errorMessage: error.message }))
  }

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
      <View style={styles.container}>
        <View style={styles.msgBox}>
          <TextInput
            value={this.state.nameOfEvent}
            // multiline={true}
            placeholder='Enter Event Information'
            onChangeText={(name) => this.setState({nameOfEvent: name})}
            style={styles.textInput}/>
         
            
          
           {/*<Button title="Sign Out" onPress={this.handleSignOut} />*/}
        </View>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => this.addItem(this.state.nameOfEvent)}>

          <Text style={{ color: 'white' }}>Send</Text>

        </TouchableOpacity>
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
                style={styles.noteDelete}
                >
                <Ionicons name="md-trash" color={'white'} size={25}/>
              </TouchableOpacity>
            </View>
          }
          // extraData={this.state}
          
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
    backgroundColor: '#AED6F1'
  },
  
  msgBox: {
    flexDirection: 'row',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 5,
    paddingLeft: 40
  },
  textInput: {
    flex: 1
  },
  addButton: {
    position: 'absolute',
    zIndex: 11,
    right: 10,
    backgroundColor: '#e91e63',
    width: 70,
    height: 40,
    bottom: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 30,

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
    borderLeftColor: '#5B2C6F',
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