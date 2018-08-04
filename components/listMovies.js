import React from 'react';
import { Thumbnail, ListItem, Left, Body } from 'native-base';
import { FlatList, Text } from 'react-native';
import styles from './style';

export default class ListMovies extends React.Component {
  _onClickItem(movie){
    this.props.navigation.navigate('MovieItem',{...movie});
  }

  render() {
    return (
	    <FlatList
		    data={this.props.movies}
		    keyExtractor={(item, index) => item.id.toString()}
		    renderItem={({item}) =>
			    <ListItem thumbnail onPress={()=>this._onClickItem(item)}>
				    <Left>
					    <Thumbnail square large source={{uri: `https://image.tmdb.org/t/p/w342${item.poster_path}`}} />
				    </Left>
				    <Body>
				    <Text style={styles.movieListTitle}>{item.title}</Text>
				    <Text note numberOfLines={4}>{item.overview}</Text>
				    </Body>
			    </ListItem>
		    }
	    />
    );
  }
}