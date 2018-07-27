import React from 'react';
import { Form, Picker, Spinner, Input, Item, Thumbnail, List, ListItem, Text, Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon } from 'native-base';
import { RefreshControl, View } from 'react-native';

import popularMoviesData from './popularMovies1';

export default class ListMovies extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      searchText : "",
      popularMovies: [],
      moviesfetch: [],
      paged: 1,
      total_pages: 0,
      refreshing: false,
      filter_by: "popularity",
    };
  }
  componentDidMount() {
    setTimeout( ()=>{
      this.getPopularMovies(this.state.paged);
    }, 0);
  }
  async getPopularMovies(page = 1) {
      // let url = "https://api.themoviedb.org/3/movie/popular?page="+page+"&api_key=e9005481562bed9b8b04d9596191beed";
      // let moviesfetch = await fetch(url).then((response) => response.json());

      let moviesfetch = popularMoviesData;

      this.setState({
        moviesfetch,
        popularMovies: moviesfetch.results,
        total_pages:moviesfetch.total_pages,
        isLoading: false,
        refreshing: false,
        paged: page,
      });

      if (this.state.filter_by != 'popularity'){
        this._onFilterChange();
      }
  }

  _onPullRefresh() {
    this.setState({
      refreshing: true
    });
    this.getPopularMovies(1);
  }
  _onSearch(searchText){
    let tempMovies = this.state.moviesfetch.results;
    let popularMovies = tempMovies.filter(movie => movie.title.toLowerCase().includes(searchText.toLowerCase()));
    this.setState({
      searchText,
      popularMovies
    });
  }
  _onFilterChange (selectedValue = '') {
    if ( selectedValue != this.state.filter_by ) {
      if ( selectedValue == '' ) {selectedValue = this.state.filter_by;}
      let popularMovies = this.state.popularMovies;
      if (selectedValue == "vote_average" ) {
        popularMovies = popularMovies.sort((a, b) => b.vote_average - a.vote_average );
      }
      else if ( selectedValue == "popularity" ) {
        popularMovies = popularMovies.sort((a, b) => b.popularity - a.popularity );
      }
      else if (selectedValue == "release_date") {
        popularMovies = popularMovies.sort((a, b) => new Date(b.release_date) - new Date(a.release_date) );
      }

      this.setState({
        filter_by: selectedValue,
        popularMovies
      });
    }
  }
  _onPaging(paged){
    this.setState({
      isLoading: true,
    });
    this.getPopularMovies(paged);
  }
  _onClickItem(movie){
    console.log(movie);
    this.props.navigation.navigate('MovieItem',{...movie});
  }


  render() {
    return (
      <Container>
        <Header searchBar rounded>
          <Item>
            <Icon name="ios-search" />
            <Input placeholder="Search"
            onChangeText={text=> this._onSearch(text) } />
          </Item>
        </Header>
        <Content
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={()=>this._onPullRefresh()}
            />
          }
          >
          <View style={{
            flexDirection:'row',
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            }}>
            <Text>Select Filter:</Text>
            <Form>
              <Picker
                mode="dropdown"
                iosIcon={<Icon name="ios-arrow-down-outline" />}
                placeholder="Select filter"
                placeholderStyle={{ color: "#bfc6ea" }}
                placeholderIconColor="#007aff"
                style={{ width: undefined }}
                selectedValue={this.state.filter_by}
                onValueChange={(selectedValue)=>this._onFilterChange(selectedValue)}
              >
                <Picker.Item label="Popularity" value="popularity" />
                <Picker.Item label="Rating" value="vote_average" />
                <Picker.Item label="Release Date" value="release_date" />
              </Picker>
            </Form>
          </View>

          {this.state.isLoading ? <Spinner /> :
          <View>
            <List>
              {this.state.popularMovies.map(movie =>
                  <ListItem key={movie.id} thumbnail onPress={()=>this._onClickItem(movie)}>
                    <Left>
                      <Thumbnail square large source={{uri: `https://image.tmdb.org/t/p/w342${movie.poster_path}`}} />
                    </Left>
                    <Body>
                      <Text>{movie.title}</Text>
                      <Text note numberOfLines={4}>{movie.overview}</Text>
                    </Body>
                  </ListItem>
              )}
            </List>

            <View style={{flexWrap: 'wrap',
              flexDirection:'row',
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 20,
              marginBottom: 20,
              }}>

              {this.state.paged > 1 ?
                <Button onPress={()=>this._onPaging(this.state.paged-1)} info style={{marginRight:5}}>
                  <Icon name='arrow-back' />
                </Button>
                : ""
              }
              {this.state.paged > 2 ?
                <Button onPress={()=>this._onPaging(this.state.paged-2)} info style={{marginRight:5}}><Text>{this.state.paged-2}</Text></Button>
                : ""
              }
              {this.state.paged > 1 ?
                <Button onPress={()=>this._onPaging(this.state.paged-1)} info style={{marginRight:5}}><Text>{this.state.paged-1}</Text></Button>
                : ""
              }

              <Button info bordered style={{marginRight:5}}><Text>{this.state.paged}</Text></Button>

              {this.state.paged < this.state.total_pages ?
                <Button onPress={()=>this._onPaging(this.state.paged+1)} info style={{marginRight:5}}><Text>{this.state.paged+1}</Text></Button>
                : ""
              }
              {this.state.paged < this.state.total_pages-1 ?
                <Button onPress={()=>this._onPaging(this.state.paged+2)} info style={{marginRight:5}}><Text>{this.state.paged+2}</Text></Button>
                : ""
              }
              {this.state.paged < this.state.total_pages ?
                <Button onPress={()=>this._onPaging(this.state.paged+1)} info>
                  <Icon name='arrow-forward' />
                </Button>
                : ""
              }
            </View>
          </View>
          }
        </Content>
      </Container>
    );
  }
}
