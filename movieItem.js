import React from 'react';
import {Container, Text, H3} from 'native-base';
import {Image, Dimensions} from 'react-native';

const dimensions = Dimensions.get('window');
const wHeight = Dimensions.height;
const wWidth = dimensions.width;

export default class MovieItem extends React.Component {
	static navigationOptions = ({navigation}) => {
		return {
			title: navigation.getParam('title', 'Movie Detail'),
		};
	};

	render() {
		const params = this.props.navigation.state.params;
		return (
			<Container style={{flex: 1, padding: 10}}>
				<Image
					style={{width: wWidth, height: 350, resizeMode: 'center'}}
					source={{uri: `https://image.tmdb.org/t/p/w342${params.poster_path}`}}
				/>
				<H3 style={{marginTop: 10, alignSelf: 'center'}}>{params.title}</H3>
				<Text style={{marginTop: 10 }}>{params.overview}</Text>
				<Text style={{marginTop: 5 }}>- Vote: <Text style={{fontWeight:'bold'}}>{params.vote_average}</Text></Text>
				<Text style={{marginTop: 5 }}>- Release date: <Text style={{fontWeight:'bold'}}>{params.release_date}</Text></Text>
			</Container>
		);
	}
};
