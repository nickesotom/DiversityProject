import React, { Component } from "react";
import { 
  View,
  Text,
  StyleSheet
} from "react-native";

class Education extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Education</Text>
      </View>
    );
  }
}
export default Education;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});