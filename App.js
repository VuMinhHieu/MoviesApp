import React from 'react';
import {NetInfo} from 'react-native';
import { createStackNavigator , createDrawerNavigator,DrawerItems} from 'react-navigation';
import MovieItem from './containers/movieItem';
import Home from './containers/home';
import SideBar from './components/sidebar';

import {Container, Text} from 'native-base';

const DrawerStack = createDrawerNavigator({
	Home: { screen: Home },
}, {
	contentComponent: props => <SideBar><DrawerItems {...props} /></SideBar>
});

const RootStack = createStackNavigator(
	{
		Home: { screen: DrawerStack, navigationOptions: { title: 'Fliexe',  header: null }  },
		MovieItem: MovieItem,
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
			no_internet : false,
			net_message: '',
		}
	}
	async componentWillMount() {
		NetInfo.getConnectionInfo().then((connectionInfo) => {
			console.log('Initial, type: ' + connectionInfo.type + ', effectiveType: ' + connectionInfo.effectiveType);
		});

		handleFirstConnectivityChange = (connectionInfo) => {
			if (connectionInfo.type === 'none'){
				this.setState({
					no_internet: true,
					net_message : 'No Internet connection.Make sure that Wi-Fi or mobile data is turned on that try again',
				});
			}
			NetInfo.removeEventListener(
				'connectionChange',
				handleFirstConnectivityChange
			);
		}

		NetInfo.addEventListener(
			'connectionChange',
			handleFirstConnectivityChange
		);
		await Expo.Font.loadAsync({
			'Ionicons': require('native-base/Fonts/Ionicons.ttf'),
			'MaterialCommunityIcons': require('native-base/Fonts/MaterialCommunityIcons.ttf'),
		});
		this.setState({
			font_loading: false,
		});
	}

	render() {
		if ( !this.state.font_loading && !this.state.no_internet) {
			return <RootStack/>;
		}
		else {
			return <Container style={{flex: 1, padding: 20, justifyContent: 'center', alignItems: 'center'}}>
				{this.state.no_internet ? <Text>{this.state.net_message}</Text> : ''}
			</Container>;
		}
	}
}