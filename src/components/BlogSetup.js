import React, { Component } from "react";
import {
  View,
  StyleSheet,
  TouchableHighlight,
  Linking
} from "react-native";
import { Text, Card, Divider, Button } from 'react-native-elements';
import moment from 'moment';




class BlogSetup extends Component {
  render() {
    const {
      image,
      title, 
      summary,
      link,
      author
    } = this.props.blogs;

    const { noteStyle, featuredTitleStyle } = styles;
    return (

      <TouchableHighlight
        onPress={() => Linking.openURL(link)}>
        <Card
          featuredTitle={title}
          featuredTitleStyle={featuredTitleStyle}
          image={{
            uri: image
          }}>
          <Text style={{ marginBottom: 10 }}>
            {summary}
          </Text>
          <Divider style={{ backgroundColor: '#dfe6e9' }} />
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={noteStyle}>{author}</Text>
          </View>
        </Card>
      </TouchableHighlight>
    );
  }
}
export default BlogSetup;

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