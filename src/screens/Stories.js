import React, { Component } from "react";
import { 
  View,
  Text,
  StyleSheet
} from "react-native";

class Stories extends Component {
  static navigationOptions
  render() {
    return (
      <View style={styles.container}>
        <Text>Stories</Text>
      </View>
    );
  }
}
export default Stories;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});