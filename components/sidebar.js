import React from 'react';
import {Image, View, Switch} from 'react-native';
import {Text, Thumbnail, Icon, ListItem, Left, Body, Right, Button, Content, Badge } from 'native-base';

export default class SideBar extends React.Component {
	constructor(props){
	    super(props);
	    this.state = {
				air_plane: false,

	    }
	}
	render() {
		return (
			<Content>
				<Image style={{height:180, width:280, resizeMode:'cover'}}
				       source={require('../images/sidebar_image.jpg')} />
				<View style={{alignItems: 'center', position:'absolute', top:60, right: 90,flexDirection:'row', flexWrap:'wrap'}}>
						<Thumbnail source={require('../images/logo.jpg')}/>
						<View style={{ paddingLeft: 10}}>
							<Text style={{ fontSize: 25 }}>Flixie</Text>
							<Text note style={{color:'#252525', fontSize:13}}>Movies List</Text>
						</View>
				</View>
				<View style={{backgroundColor:'#d0d0d0'}}>
					<View style={{ backgroundColor:'#fff' }}>
						<ListItem icon>
							<Left>
								<Button style={{ backgroundColor: "#FF9501" }}>
									<Icon active name="plane" />
								</Button>
							</Left>
							<Body>
							<Text>Airplane Mode</Text>
							</Body>
							<Right>
								<Switch value={this.state.air_plane} onValueChange={()=>this.setState({air_plane: !this.state.air_plane})} />
							</Right>
						</ListItem>
						<ListItem icon>
							<Left>
								<Button style={{ backgroundColor: "#007AFF" }}>
									<Icon active name="wifi" />
								</Button>
							</Left>
							<Body>
							<Text>Wi-Fi</Text>
							</Body>
							<Right>
								<Text>Pious</Text>
								<Icon active name="arrow-forward" />
							</Right>
						</ListItem>
						<ListItem icon>
							<Left>
								<Button style={{ backgroundColor: "#007AFF" }}>
									<Icon active name="bluetooth" />
								</Button>
							</Left>
							<Body>
							<Text>Bluetooth</Text>
							</Body>
							<Right>
								<Text>On</Text>
								<Icon active name="arrow-forward" />
							</Right>
						</ListItem>
						<ListItem icon>
							<Left>
								<Button style={{ backgroundColor: "#20ff29" }}>
									<Icon active type='MaterialCommunityIcons' name="cellphone" />
								</Button>
							</Left>
							<Body>
							<Text>Mobile Data</Text>
							</Body>
							<Right>
								<Icon active style={{ color: "#007AFF" }} name="md-checkmark" />
							</Right>
						</ListItem>
						<ListItem icon>
							<Left>
								<Button style={{ backgroundColor: "#20ff29" }}>
									<Icon active name="ios-link" />
								</Button>
							</Left>
							<Body>
							<Text>Personal Hotspot</Text>
							</Body>
							<Right>
								<Text>Off</Text>
								<Icon active name="arrow-forward" />
							</Right>
						</ListItem>
					</View>

					<View style={{marginTop: 20, backgroundColor:'#fff'}}>
						<ListItem icon>
							<Left>
								<Button style={{ backgroundColor: "#20ff29" }}>
									<Icon active name="ios-notifications" />
								</Button>
							</Left>
							<Body>
							<Text>Notifications</Text>
							</Body>
							<Right>
								<Icon active name="arrow-forward" />
							</Right>
						</ListItem>
						<ListItem icon>
							<Left>
								<Button style={{ backgroundColor: "#797271" }}>
									<Icon active type='Feather' name="server" />
								</Button>
							</Left>
							<Body>
							<Text>Control Center</Text>
							</Body>
							<Right>
								<Icon active name="arrow-forward" />
							</Right>
						</ListItem>
						<ListItem icon>
							<Left>
								<Button style={{ backgroundColor: "#792da9" }}>
									<Icon active name="ios-moon" />
								</Button>
							</Left>
							<Body>
							<Text>Do Not Disturb</Text>
							</Body>
							<Right>
								<Text>Yes</Text>
							</Right>
						</ListItem>
					</View>

					<View style={{marginTop: 20, backgroundColor:'#fff'}}>
						<ListItem icon>
							<Left>
								<Button style={{ backgroundColor: "#797271" }}>
									<Icon active name="ios-settings" />
								</Button>
							</Left>
							<Body>
							<Text>General</Text>
							</Body>
							<Right>
								<Badge danger>
									<Text>2</Text>
								</Badge>
								<Icon active name="arrow-forward" />
							</Right>
						</ListItem>
						<ListItem icon>
							<Left>
								<Button style={{ backgroundColor: "#20ff29" }}>
									<Icon active name="ios-battery-full" />
								</Button>
							</Left>
							<Body>
							<Text>Battery</Text>
							</Body>
							<Right>
								<Icon active name="arrow-forward" />
							</Right>
						</ListItem>
						<ListItem icon>
							<Left>
								<Button style={{ backgroundColor: "#007AFF" }}>
									<Icon active name="ios-hand" />
								</Button>
							</Left>
							<Body>
							<Text>Privacy</Text>
							</Body>
							<Right>
								<Icon active name="arrow-forward" />
							</Right>
						</ListItem>
					</View>
				</View>
			</Content>
		);
	}
};