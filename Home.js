import React from 'react';
import { Footer, FooterTab, Spinner, Text, Container, Content, Button, Icon } from 'native-base';
import {Dimensions, RefreshControl, View} from 'react-native';
import ListMovies from './listMovies';
import AppHeader from './header';
import Pagination from './pagination';
import AppFooter from './footer';

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

	_onHeaderIconClick = (type) => {
		if ( type === 'search')
			this.setState({search_open : !this.state.search_open, filter_open: false});
		else this.setState({filter_open : !this.state.filter_open, search_open: false})
	};

	render() {
		return (
			<Container>
				<AppHeader
					navigation={this.props.navigation}
					filter_open={this.state.filter_open}
					search_open={this.state.search_open}
					filter_by={this.state.filter_by}
					_onHeaderIconClick={(type)=>this._onHeaderIconClick(type)}
					_onFilterChange={(selectedValue)=>this._onFilterChange(selectedValue)}
					_onSearch={(text)=>this._onSearch(text)}
				/>

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

							<Pagination
								paged={this.state.paged}
								total_pages={this.state.total_pages}
								_onPaging={(paged)=>this._onPaging(paged)}
							/>
						</View>
					}

				</Content>

				<AppFooter
					now_playing={this.state.now_playing}
					_onFooterTab={(type)=>this._onFooterTab(type)}
				/>
			</Container>
		);
	}
}
