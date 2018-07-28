import React from 'react';
import {Container, Text} from 'native-base';
import {Image, View, StyleSheet} from 'react-native';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';

export default class MovieItem extends React.Component {
	static navigationOptions = ({navigation}) => {
		return {
			title: navigation.getParam('title', 'Movie Detail'),
		};
	};

	render() {
		const params = this.props.navigation.state.params;
		let stars = []
		let starInterger = Math.floor(params.vote_average / 2);
		let starFloat = params.vote_average / 2;
		for (let i = 0; i < 5; i++) {
			if ( starInterger > i ){
				stars.push(<Icon key={i} name='star' style={styles.icon_star} />);
			} else if(starFloat > i){
				stars.push(<Icon key={i} name='star-half' style={styles.icon_star} />);
			} else {
				stars.push(<Icon key={i} name='star-outline' style={styles.icon_star} />);
			}
		}
		return (
			<Container>
					<Image
						style={styles.backgroundImage}
						source={{uri: `https://image.tmdb.org/t/p/w342${params.poster_path}`}}
					/>
					<View style={styles.movie_detail}>
						<Text style={{color: '#fff', marginTop: 10, fontWeight: '500', fontSize: 20}}>{params.title}</Text>
						<Text>{stars}</Text>
						<Text style={{color: '#fff',marginTop: 5 }}><Icon name='calendar' style={{fontSize:25}}/> <Text style={{color: '#fff',fontWeight:'500'}}>{params.release_date}</Text></Text>
						<Text style={{color: '#fff',marginTop: 10 }}>{params.overview}</Text>
					</View>
			</Container>
		);
	}
};

let styles = StyleSheet.create({
	backgroundImage: {
		flex: 1,
		resizeMode: 'cover'
	},
	icon_star: {fontSize:20, color:'#fffd16'},
	movie_detail: {
		position: 'absolute',
		padding: 5,
		bottom: 0,
		left: 0,
		right: 0,
		backgroundColor: '#000',
		opacity: 0.8
	},
});