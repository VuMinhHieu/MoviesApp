import React from 'react';
import { Footer, FooterTab, Text, Button, Icon } from 'native-base';

export default class AppFooter extends React.Component {
	constructor(props){
	    super(props);
	    this.state = {
	        now_playing: true,
		      movie_type: 'now_playing',
	    }
	}
	_onFooterClick(type){
		if ( type !== this.state.movie_type ) {
			this.props._onFooterTab(type);
			this.setState({
				now_playing: !this.state.now_playing,
				movie_type: type
			});
		}
	}

	render() {
		return (
			<Footer>
				<FooterTab>
					<Button active={this.state.now_playing} onPress={()=>this._onFooterClick('now_playing')}>
						<Icon type='MaterialCommunityIcons' name='play-circle'/>
						<Text> Now Playing </Text>
					</Button>
					<Button active={!this.state.now_playing} onPress={()=>this._onFooterClick('top_rated')}>
						<Icon type='MaterialCommunityIcons' name='star-circle'/>
						<Text> Top Rated </Text>
					</Button>
				</FooterTab>
			</Footer>
		);
	}
}
