import React, { Component } from "react";
import { 
  View,
  Text,
  StyleSheet,
  Linking
} from "react-native";
import {
  Container, Header, Content, Accordion
} from 'native-base'
import Hyperlink from 'react-native-hyperlink'


// this is just an array to store the information within the screen
const dataArray = [
  { 
    title: 'Elizabeth Campa, LASO',
    content: 'Elizabeth is a senior who will graduate May 2019 with a degree in Psychology and plans to get her masters after in Mental Health and Counseling. ' +
    'Currently she has a job where does Applied Behavior Analysis (ABA) therapy with kids that have autism. What diversity and inclusion means to Elizabeth is branching out '+
    'and not always sticking with what\'s comfortable. "Never thinking that you know enough", so that we\'re all educated, not just within one community, but other communities as well. '+
    'She encourages not just students but faculty as well to attend more events so that students have a better on campus experience and faculty can see what their students are up to outside of the classroom. '+
    'LASO is not just big on helping other committees on campus, but with helping people during community service where they recently created feminine packs to help homeless women.'
  }
]

// these hold the urls of each of the committees where contact information/where to sign up to be a member will be placed
const url = {
  laso: 'https://lewisu.presence.io/organization/latin-american-student-organization',
  bsa: 'https://lewisu.presence.io/organization/black-student-association',
  gsa: 'https://lewisu.presence.io/organization/gender-sexuality-alliance',
  gospel: 'https://lewisu.presence.io/organization/gospel-choir'
}
// this is just all the rendering which you will already see on screen
class Stories extends Component {
  static navigationOptions
  render() {
    return (
      <Container>
        <Content>
          <Hyperlink
            linkStyle={{ color: '#2980b9', fontSize: 16 }}
            linkText={url => url === 'https://lewisu.presence.io/organization/latin-american-student-organization' ? 'here' : url}
            // linkDefault={true}
            onPress={() => Linking.openURL(url.laso)}>
            <Text style={{ fontSize: 16, padding: 20 }}>
              You can find more information on how to get in contact or become a member of LASO https://lewisu.presence.io/organization/latin-american-student-organization
            </Text>
          </Hyperlink>
          <Accordion
            style={{padding: 16}}
            dataArray={dataArray}
            icon="add"
            expandedIcon="remove"
            iconStyle={{ color: "green" }}
            expandedIconStyle={{ color: "red" }}
          />
        </Content>
      </Container>
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