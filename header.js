import React from 'react';
import { Left, Right, Body, Title, Form, Picker, Input, Item, Header, Button, Icon } from 'native-base';

export default class AppHeader extends React.Component {
	constructor(props){
	    super(props);
	    this.state = {
	        flexLeft: 1,
	        flexBody: 1,
	        flexRight: 1,
	    }
	}

	_onHeaderIconClick(type){
		if (!this.props.filter_open && !this.props.search_open){
			this.setState({
				flexLeft: 1,
				flexBody: 4,
				flexRight: 2,
			});
		}
		this.props._onHeaderIconClick(type);
	}

	render() {
		return (
				<Header rounded>
					<Left style={{flex:this.state.flexLeft}}>
						<Button transparent onPress={()=>this.props.navigation.openDrawer()}>
							<Icon name='menu' />
						</Button>
					</Left>
					<Body style={{flex:this.state.flexBody}}>
					{this.props.filter_open ?
						<Form>
							<Picker
								mode="dropdown"
								iosIcon={<Icon name="ios-arrow-down-outline"/>}
								placeholder="Select filter"
								placeholderStyle={{color: "#bfc6ea"}}
								placeholderIconColor="#007aff"
								selectedValue={this.props.filter_by}
								onValueChange={(selectedValue) => this.props._onFilterChange(selectedValue)}
							>
								<Picker.Item label="Popularity" value="popularity"/>
								<Picker.Item label="Rating" value="vote_average"/>
								<Picker.Item label="Release Date" value="release_date"/>
							</Picker>
						</Form>
						: this.props.search_open ?
							<Item>
								<Input placeholder="Search" onChangeText={text=> this.props._onSearch(text)} />
							</Item>
							:
							<Title>Flixie</Title>
					}
					</Body>
					<Right style={{flex:this.state.flexRight}}>
						<Button transparent onPress={()=>this._onHeaderIconClick('search')}>
							<Icon name='ios-search' />
						</Button>
						<Button transparent onPress={()=>this._onHeaderIconClick('filter')}>
							<Icon type="MaterialCommunityIcons" name='filter' />
						</Button>
					</Right>

				</Header>
		);
	}
}
