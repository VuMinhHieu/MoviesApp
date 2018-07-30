import React from 'react';
import { Footer, FooterTab, Text, Button, Icon } from 'native-base';

export default class AppFooter extends React.Component {
	render() {
		return (
			<Footer>
				<FooterTab>
					<Button active={this.props.now_playing} onPress={()=>this.props._onFooterTab('now_playing')}>
						<Icon type='MaterialCommunityIcons' name='play-circle'/>
						<Text> Now Playing </Text>
					</Button>
					<Button active={!this.props.now_playing} onPress={()=>this.props._onFooterTab('top_rated')}>
						<Icon type='MaterialCommunityIcons' name='star-circle'/>
						<Text> Top Rated </Text>
					</Button>
				</FooterTab>
			</Footer>
		);
	}
}
