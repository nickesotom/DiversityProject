import React, { Component } from "react";
import { 
  View,
  Text,
  StyleSheet,
  FlatList
} from "react-native";
import HolidaySetup from '../components/HolidaySetup';
import { getHolidays } from '../components/fetchHoliday';
class Holiday extends Component {
  constructor(props) {
    super(props);
    this.state = {
      holidays: []
    }
    this.fetchHolidays = this.fetchHolidays.bind(this)
  }

  componentDidMount() {
    this.fetchHolidays();
  }

  fetchHolidays() {
    getHolidays().then(holidays=> {
      this.setState({holidays});
    })
  }
  render() {
    return (
      <FlatList
        data={this.state.holidays}
        renderItem={({ item }) => <HolidaySetup holidays={item} />}
        // keyExtractor={item => item.url}
        // refreshing={this.state.refreshing}
        // onRefresh={this.handleRefresh.bind(this)}
      />
    );
  }
}
export default Holiday;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});