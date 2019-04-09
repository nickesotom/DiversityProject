import React, { Component } from "react";
import {
  FlatList,
  StyleSheet,
  View
} from "react-native";
import BlogSetup from '../components/BlogSetup';
import { getBlogs } from '../components/fetchBlogs';
import SplashScreen from './SplashScreen'


class Blogs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      blogs: [],
    };
    this.fetchBlogs = this.fetchBlogs.bind(this);
  }

  componentDidMount() {
    this.fetchBlogs();
  }



  fetchBlogs() {
    getBlogs().then(blogs => {
      this.setState({ blogs /*, refreshing: false */});
    })//.catch(() => this.setState({ refreshing: false }));
  }
  // handleRefresh = () => {
  //   this.setState({ refreshing: true }, () => this.fetchNews())
  // }
  render() {
    return (
      <View style={styles.container}>
        <FlatList

          data={this.state.blogs}
          renderItem={({ item }) => <BlogSetup blogs={item} />}
          keyExtractor={item => item.link}
        // refreshing={this.state.refreshing}
        // onRefresh={this.handleRefresh.bind(this)}
        />
      </View>
      
    )
  }
}
export default Blogs;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#840029'
  }
});