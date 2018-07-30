import React from 'react';
import { Left, Right, Body, Title, Form, Picker, Input, Item, Header, Button, Icon } from 'native-base';

export default class AppHeader extends React.Component {
	render() {
		return (
				<Header rounded>
					<Left style={{flex:1}}>
						<Button transparent onPress={()=>this.props.navigation.openDrawer()}>
							<Icon name='menu' />
						</Button>
					</Left>
					<Body style={{flex:4}}>
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
							<Title>Home</Title>
					}
					</Body>
					<Right style={{flex:2}}>
						<Button transparent onPress={()=>this.props._onHeaderIconClick('search')}>
							<Icon name='ios-search' />
						</Button>
						<Button transparent onPress={()=>this.props._onHeaderIconClick('filter')}>
							<Icon type="MaterialCommunityIcons" name='filter' />
						</Button>
					</Right>

				</Header>
		);
	}
}
