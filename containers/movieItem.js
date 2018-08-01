import React from 'react';
import {Image, View, Text} from 'react-native';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import styles from  '../components/style';

export default class MovieItem extends React.Component {
	static navigationOptions = ({navigation}) => {
		return {
			title: navigation.getParam('title', 'Movie Detail'),
		};
	};

	render() {
		const params = this.props.navigation.state.params;
		let stars = [];
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
			<View style={styles.container}>
					<Image
						style={styles.backgroundImage}
						source={{uri: `https://image.tmdb.org/t/p/w342${params.poster_path}`}}
					/>
					<View style={styles.movieDetailWapper}>
						<Text style={[styles.movieDetailTitle, styles.movieDetailText]}>{params.title}</Text>
						<Text>{stars}</Text>
						<Text style={[styles.movieDetailDate, styles.movieDetailText]}>
							<Icon name='calendar' style={{fontSize:25}}/>
							<Text style={[styles.movieDetailText, {fontWeight:'500'}]}>{params.release_date}</Text>
						</Text>
						<Text style={[styles.movieDetailText, {marginBottom: 5}]}>{params.overview}</Text>
					</View>
			</View>
		);
	}
};