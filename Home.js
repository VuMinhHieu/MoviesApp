import React from 'react';
import { Footer, FooterTab, Form, Picker, Spinner, Input, Item, Text, Container, Header, Content, Button, Icon } from 'native-base';
import {Dimensions, RefreshControl, View} from 'react-native';
import ListMovies from './listMovies';

// import listMoviesData from './popularMovies1';

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
		};
	}

	componentDidMount() {
		setTimeout( ()=>{
			this.getListMovies(this.state.paged);
		}, 0);
	}

	async getListMovies(page = 1, type = 'now_playing') {
		console.log(this.state.movies_type);
		let url = `https://api.themoviedb.org/3/movie/${type}?page=${page}&api_key=e9005481562bed9b8b04d9596191beed`;
		let moviesfetch = await fetch(url).then((response) => response.json());

		// let moviesfetch = listMoviesData;

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
				<Header hasSegment searchBar rounded>
					<Item>
						<Icon name="ios-search" />
						<Input placeholder="Search" onChangeText={text=> this._onSearch(text)} />
					</Item>
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
							{/*Start filter*/}
							<View style={{flexDirection:'row', flex: 1, alignItems: 'center', justifyContent: 'center',}}>
								<Text>Select Filter:</Text>
								<Form>
									<Picker
										mode="dropdown"
										iosIcon={<Icon name="ios-arrow-down-outline" />}
										placeholder="Select filter"
										placeholderStyle={{ color: "#bfc6ea" }}
										placeholderIconColor="#007aff"
										style={{ width: undefined }}
										selectedValue={this.state.filter_by}
										onValueChange={(selectedValue)=>this._onFilterChange(selectedValue)}
									>
										<Picker.Item label="Popularity" value="popularity" />
										<Picker.Item label="Rating" value="vote_average" />
										<Picker.Item label="Release Date" value="release_date" />
									</Picker>
								</Form>
							</View>
							{/*End filter*/}

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
							<Text> Now Playing </Text>
						</Button>
						<Button active={!this.state.now_playing} onPress={()=>this._onFooterTab('top_rated')}>
							<Text> Top Rated </Text>
						</Button>
					</FooterTab>
				</Footer>
			</Container>
		);
	}
}
