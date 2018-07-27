import React from 'react';
import {Container,Content, Text,Icon, H3} from 'native-base';
import {Image, Dimensions} from 'react-native';

const dimensions = Dimensions.get('window');
const wWidth = dimensions.width;

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
				stars.push(<Icon key={i} name='ios-star' style={{color:'#fffd16'}} />);
			} else if(starFloat > i){
				stars.push(<Icon key={i} name='ios-star-half' style={{color:'#fffd16'}} />);
			} else {
				stars.push(<Icon key={i} name='ios-star-outline' style={{color:'#fffd16'}} />);
			}
		}
		return (
			<Container style={{flex: 1, padding: 10}}>
				<Content>
					<Image
						style={{width: wWidth, height: 450, resizeMode: 'cover'}}
						source={{uri: `https://image.tmdb.org/t/p/w342${params.poster_path}`}}
					/>
					<H3 style={{marginTop: 10, alignSelf: 'center'}}>{params.title}</H3>
					<Text style={{marginTop: 5 }}>
						- Vote:
						<Text style={{fontWeight:'bold'}}>{params.vote_average}</Text>
						{stars}
					</Text>
					<Text style={{marginTop: 5 }}>- Release date: <Text style={{fontWeight:'bold'}}>{params.release_date}</Text></Text>
					<Text style={{marginTop: 10 }}>{params.overview}</Text>
				</Content>
			</Container>
		);
	}
};
