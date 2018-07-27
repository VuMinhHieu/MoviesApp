import React from 'react';
import { createStackNavigator } from 'react-navigation';
import ListMovies from './listMovies';
import MovieItem from './movieItem';
import Home from './Home';

import {Container} from 'native-base';

const RootStack = createStackNavigator(
	{
		Home: { screen: Home, navigationOptions: { header: null } },
		ListMovies: { screen: ListMovies, navigationOptions: { header: null } },
		MovieItem: MovieItem
	},
	{
		initialRouteName: 'Home',
	}
);

export default class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			font_loading : true,
		}
	}
	async componentWillMount() {
		await Expo.Font.loadAsync({
			'Ionicons': require('native-base/Fonts/Ionicons.ttf'),
		});
		this.setState({
			font_loading: false,
		});
	}

	render() {
		if ( !this.state.font_loading ) {
			return <RootStack/>;
		}
		else {
			return <Container/>;
		}
	}
}