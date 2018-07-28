import React from 'react';
import { Left, Right, Body, Title, Footer, FooterTab, Form, Picker, Spinner, Input, Item, Text, Container, Header, Content, Button, Icon } from 'native-base';
import {Dimensions, RefreshControl, View} from 'react-native';
import ListMovies from './listMovies';

const dimensions = Dimensions.get('window');
const wHeight = dimensions.height;

export default class Home extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoading: true,
			searchText : "",
			listMovies: [],
			moviesfetch: [],
			paged: 1,
			total_pages: 0,
			refreshing: false,
			filter_by: "popularity",
			now_playing : true,
			movies_type : 'now_playing',
			filter_open: false,
			search_open: false,
		};
	}

	componentWillMount() {
		setTimeout( ()=>{
			this.getListMovies(this.state.paged);
		}, 0);
	}

	async getListMovies(page = 1, type = 'now_playing') {
		console.log(this.state.movies_type);
			let url = `https://api.themoviedb.org/3/movie/${type}?page=${page}&api_key=e9005481562bed9b8b04d9596191beed`;
		let moviesfetch = await fetch(url).then((response) => response.json());

		this.setState({
			moviesfetch,
			listMovies: moviesfetch.results,
			total_pages:moviesfetch.total_pages,
			isLoading: false,
			refreshing: false,
			paged: page,
		});

		this._onFilterChange();
	}

	_onPullRefresh() {
		this.setState({
			refreshing: true
		});
		this.getListMovies();
	}

	_onSearch(searchText){
		let tempMovies = this.state.moviesfetch.results;
		let listMovies = tempMovies.filter(movie => movie.title.toLowerCase().includes(searchText.toLowerCase()));
		this.setState({
			searchText,
			listMovies
		});
	}

	_onFilterChange (selectedValue = '') {
		if ( selectedValue != this.state.filter_by ) {
			if ( selectedValue == '' ) {selectedValue = this.state.filter_by;}
			let listMovies = this.state.moviesfetch.results;
			if (selectedValue == "vote_average" ) {
				listMovies = listMovies.sort((a, b) => b.vote_average - a.vote_average );
			}
			else if ( selectedValue == "popularity" ) {
				listMovies = listMovies.sort((a, b) => b.popularity - a.popularity );
			}
			else if (selectedValue == "release_date") {
				listMovies = listMovies.sort((a, b) => new Date(b.release_date) - new Date(a.release_date) );
			}

			this.setState({
				filter_by: selectedValue,
				listMovies
			});
		}
	}

	_onPaging(paged){
		this.setState({
			isLoading: true,
		});
		this.getListMovies(paged);
	}

	_onFooterTab(type){
		if ( type !== this.state.movies_type ){
			this.setState({
				movies_type : type,
				isLoading: true,
				now_playing : !this.state.now_playing
			});
			this.getListMovies(1, type);
		}
	}

	render() {
		return (
			<Container>
				<Header rounded>
					<Left style={{flex:1}}>
						<Button transparent onPress={()=>this.props.navigation.openDrawer()}>
							<Icon name='menu' />
						</Button>
					</Left>
					<Body style={{flex:4}}>
					{this.state.filter_open ?
						<Form>
							<Picker
								mode="dropdown"
								iosIcon={<Icon name="ios-arrow-down-outline"/>}
								placeholder="Select filter"
								placeholderStyle={{color: "#bfc6ea"}}
								placeholderIconColor="#007aff"
								selectedValue={this.state.filter_by}
								onValueChange={(selectedValue) => this._onFilterChange(selectedValue)}
							>
								<Picker.Item label="Popularity" value="popularity"/>
								<Picker.Item label="Rating" value="vote_average"/>
								<Picker.Item label="Release Date" value="release_date"/>
							</Picker>
						</Form>
						: this.state.search_open ?
						<Item>
							<Input placeholder="Search" onChangeText={text=> this._onSearch(text)} />
						</Item>
						:
						<Title>Home</Title>
					}
					</Body>
					<Right style={{flex:2}}>
						<Button transparent onPress={()=>this.setState({search_open : !this.state.search_open, filter_open: false}) }>
							<Icon name='ios-search' />
						</Button>
						<Button transparent onPress={()=>this.setState({filter_open : !this.state.filter_open, search_open: false}) }>
							<Icon type="MaterialCommunityIcons" name='filter' />
						</Button>
					</Right>

				</Header>
				<Content
					refreshControl={
						<RefreshControl
							refreshing={this.state.refreshing}
							onRefresh={()=>this._onPullRefresh()}
						/>
					}
				>

					{this.state.isLoading ? <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', height:wHeight-200 }} ><Spinner /></View> :
						<View>

							<ListMovies movies={this.state.listMovies} navigation={this.props.navigation}/>

							{/*Start pagination*/}
							<View style={{flexWrap: 'wrap', flexDirection:'row', flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: 20, marginBottom: 20,}}>
								{this.state.paged > 1 ?
									<Button onPress={()=>this._onPaging(this.state.paged-1)} info style={{marginRight:5}}>
										<Icon name='arrow-back' />
									</Button>
									: ""
								}
								{this.state.paged > 2 ?
									<Button onPress={()=>this._onPaging(this.state.paged-2)} info style={{marginRight:5}}><Text>{this.state.paged-2}</Text></Button>
									: ""
								}
								{this.state.paged > 1 ?
									<Button onPress={()=>this._onPaging(this.state.paged-1)} info style={{marginRight:5}}><Text>{this.state.paged-1}</Text></Button>
									: ""
								}

								<Button info bordered style={{marginRight:5}}><Text>{this.state.paged}</Text></Button>

								{this.state.paged < this.state.total_pages ?
									<Button onPress={()=>this._onPaging(this.state.paged+1)} info style={{marginRight:5}}><Text>{this.state.paged+1}</Text></Button>
									: ""
								}
								{this.state.paged < this.state.total_pages-1 ?
									<Button onPress={()=>this._onPaging(this.state.paged+2)} info style={{marginRight:5}}><Text>{this.state.paged+2}</Text></Button>
									: ""
								}
								{this.state.paged < this.state.total_pages ?
									<Button onPress={()=>this._onPaging(this.state.paged+1)} info>
										<Icon name='arrow-forward' />
									</Button>
									: ""
								}
							</View>
							{/*End pagination*/}
						</View>
					}
				</Content>
				<Footer>
					<FooterTab>
						<Button active={this.state.now_playing} onPress={()=>this._onFooterTab('now_playing')}>
							<Icon type='MaterialCommunityIcons' name='play-circle'/>
							<Text> Now Playing </Text>
						</Button>
						<Button active={!this.state.now_playing} onPress={()=>this._onFooterTab('top_rated')}>
							<Icon type='MaterialCommunityIcons' name='star-circle'/>
							<Text> Top Rated </Text>
						</Button>
					</FooterTab>
				</Footer>
			</Container>
		);
	}
}
