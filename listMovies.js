import React from 'react';
import { Thumbnail, List, ListItem, Text, Left, Body } from 'native-base';


export default class ListMovies extends React.Component {
  _onClickItem(movie){
    this.props.navigation.navigate('MovieItem',{...movie});
  }

  render() {
    return (
      <List>
        {this.props.movies && this.props.movies.map(movie =>
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
    );
  }
}
