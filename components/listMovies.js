import React from 'react';
import { Thumbnail, ListItem, Left, Body } from 'native-base';
import { FlatList, Text,ActivityIndicator, View } from 'react-native';
import styles from './style';

export default class ListMovies extends React.Component {
  _onClickItem(movie){
    this.props.navigation.navigate('MovieItem',{...movie});
  }
  render() {
    return (
	    <FlatList
		    style={{width: '100%'}}
		    data={this.props.movies}
		    keyExtractor={(item, index) => index.toString()}
		    refreshing={this.props.refreshing}
		    onRefresh={this.props._onPullRefresh}
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
		    onEndReachedThreshold={1}
		    onEndReached={this.props._onLoadMore}
		    ListFooterComponent={() => {
		    	return (
		    	this.props.is_searching ? '' :
			    <View>
				    <ActivityIndicator size="large" />
			    </View>
			    )
		    }}
	    />
    );
  }
}