import React, { Component } from "react";
import { 
  FlatList,
  StyleSheet,
  View
} from "react-native";
import NewsSetup from '../components/NewsSetup';
import { getUSNews } from '../components/fetchNews';



class News extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      refreshing: true
    };
    this.fetchNews = this.fetchNews.bind(this);
  }
  
  // only thing that's really important here is that this takes information from a news API that's JSON, uses a method
  // to receive that data and then places it into the app. the refresh on a new article happens every 15 minutes
  componentDidMount() {
    this.fetchNews();
  }

  fetchNews() {
    getUSNews().then(articles => {
      this.setState({articles, refreshing: false});
    }).catch(() => this.setState({refreshing: false}));
  }
  handleRefresh = () => {
    this.setState({refreshing: true}, () => this.fetchNews())
  }
  render() {
    return(
      <View style={styles.container}>
        <FlatList
          data={this.state.articles}
          renderItem={({ item }) => <NewsSetup article={item} />}
          keyExtractor={item => item.url}
          refreshing={this.state.refreshing}
          onRefresh={this.handleRefresh.bind(this)}
        />
      </View>
      
    )
  }
}
export default News;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#DB7093'
  }
});