import React, { Component } from "react";
import {
  View,
  StyleSheet,
  TouchableHighlight,
  Linking
} from "react-native";
import { Text, Card, Divider, Button } from 'react-native-elements';
import moment from 'moment';




class HolidaySetup extends Component {
  render() {
    const {
      name,
      description,
      date
    } = this.props.holidays;
    
    const { noteStyle, featuredTitleStyle } = styles;
    // const time = moment(publishedAt || moment.now()).fromNow();
    const defaultImg = 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Continents.svg/1280px-Continents.svg.png';

    return (

      <TouchableHighlight>
        <Card
          featuredTitle={name}
          featuredTitleStyle={featuredTitleStyle}
          image={{
            uri: defaultImg
          }}>
          <Text style={{ marginBottom: 10 }}>
            {description}
          </Text>
          <Divider style={{ backgroundColor: '#dfe6e9' }} />
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={noteStyle}>{name.toUpperCase()}</Text>
            <Text style={noteStyle}>{date.datetime.month}-{date.datetime.day}-{date.datetime.year}</Text>

          </View>
        </Card>
      </TouchableHighlight>
    );
  }
}
export default HolidaySetup;

const styles = StyleSheet.create({
  noteStyle: {
    margin: 5,
    fontStyle: 'italic',
    color: '#b2bec3',
    fontSize: 15
  },
  featuredTitleStyle: {
    marginHorizontal: 5,
    textShadowColor: '#00000f',
    textShadowOffset: { width: 3, height: 3 },
    textShadowRadius: 3
  }
});