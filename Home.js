import React from 'react';
import { Form, Picker, Spinner, Input, Item, Text, Container, Header, Content, Button, Icon } from 'native-base';
import {Dimensions, RefreshControl, View} from 'react-native';
import ListMovies from './listMovies';

// import popularMoviesData from './popularMovies1';

const dimensions = Dimensions.get('window');
const wHeight = dimensions.height;
export default class Home extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoading: true,
			searchText : "",
			popularMovies: [],
			moviesfetch: [],
			paged: 1,
			total_pages: 0,
			refreshing: false,
			filter_by: "popularity",
		};
	}
	componentDidMount() {
		setTimeout( ()=>{
			this.getPopularMovies(this.state.paged);
		}, 2000);
	}

	async getPopularMovies(page = 1) {
		let url = "https://api.themoviedb.org/3/movie/popular?page="+page+"&api_key=e9005481562bed9b8b04d9596191beed";
		let moviesfetch = await fetch(url).then((response) => response.json());

		// let moviesfetch = popularMoviesData;

		this.setState({
			moviesfetch,
			popularMovies: moviesfetch.results,
			total_pages:moviesfetch.total_pages,
			isLoading: false,
			refreshing: false,
			paged: page,
		});

		if (this.state.filter_by != 'popularity'){
			this._onFilterChange();
		}
	}

	_onPullRefresh() {
		this.setState({
			refreshing: true
		});
		this.getPopularMovies(1);
	}

	_onSearch(searchText){
		let tempMovies = this.state.moviesfetch.results;
		let popularMovies = tempMovies.filter(movie => movie.title.toLowerCase().includes(searchText.toLowerCase()));
		this.setState({
			searchText,
			popularMovies
		});
	}

	_onFilterChange (selectedValue = '') {
		if ( selectedValue != this.state.filter_by ) {
			if ( selectedValue == '' ) {selectedValue = this.state.filter_by;}
			let popularMovies = this.state.popularMovies;
			if (selectedValue == "vote_average" ) {
				popularMovies = popularMovies.sort((a, b) => b.vote_average - a.vote_average );
			}
			else if ( selectedValue == "popularity" ) {
				popularMovies = popularMovies.sort((a, b) => b.popularity - a.popularity );
			}
			else if (selectedValue == "release_date") {
				popularMovies = popularMovies.sort((a, b) => new Date(b.release_date) - new Date(a.release_date) );
			}

			this.setState({
				filter_by: selectedValue,
				popularMovies
			});
		}
	}

	_onPaging(paged){
		this.setState({
			isLoading: true,
		});
		this.getPopularMovies(paged);
	}

	_onClickItem(movie){
		this.props.navigation.navigate('MovieItem',{...movie});
	}

	render() {
		return (
			<Container>
				<Header searchBar rounded>
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

							<ListMovies movies={this.state.popularMovies} navigation={this.props.navigation}/>

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
			</Container>
		);
	}
}
