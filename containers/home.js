import React from 'react';
import { Container } from 'native-base';
import ListMovies from '../components/listMovies';
import AppHeader from '../components/header';
import AppFooter from '../components/footer';

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
			movie_type : "now_playing",
			is_searching: false,
		};
	}

	componentDidMount() {
		this.getListMovies(1);
	}

	async getListMovies(page = 1, isLoadMore = false) {
		let type = this.state.movie_type;
		let url = `https://api.themoviedb.org/3/movie/${type}?page=${page}&api_key=e9005481562bed9b8b04d9596191beed`;
		let moviesfetch = await fetch(url).then((response) => response.json());
		let total_pages = moviesfetch.total_pages;
		moviesfetch = moviesfetch.results;
		if ( isLoadMore )
			moviesfetch = [...this.state.moviesfetch, ...moviesfetch];
		this.setState({
			moviesfetch,
			listMovies: moviesfetch,
			total_pages,
			refreshing: false,
			paged: page,
		},()=>{
			this._onFilterChange();
		});

	}

	_onPullRefresh() {
		this.setState({
			refreshing: true
		});
		this.getListMovies();
	}

	_onSearch(searchText){
		if (searchText !== '' ){
			this.setState({
				is_searching: true
			});
		} else {
			this.setState({
				is_searching: false
			});
		}
		let tempMovies = this.state.moviesfetch;
		let listMovies = tempMovies.filter(movie => movie.title.toLowerCase().includes(searchText.toLowerCase()));
		this.setState({
			searchText,
			listMovies
		});
	}

	_onFilterChange (selectedValue = '') {
		if ( selectedValue != this.state.filter_by ) {
			this.setState({
				isLoading: true,
			});

			if ( selectedValue == '' ) {selectedValue = this.state.filter_by;}
			let listMovies = this.state.moviesfetch;
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
				listMovies,
				isLoading: false,
			});
		}
	}

	_onPaging(paged){
		console.log('_onPaging');
		this.setState({
			isLoading: true,
		});
		this.getListMovies(paged);
	}

	_onLoadMore(){
		if ( !this.state.isLoading && !this.state.is_searching) {
			let newPage = this.state.paged + 1;
			console.log(newPage);
			this.getListMovies(newPage, true);
		}
	}

	_onFooterTab(type){
		this.setState({
			isLoading: true,
			movie_type : type,
		},()=> {
			this.getListMovies(1, false);
		});
	}

	render() {
		return (
			<Container>
				<AppHeader
					navigation={this.props.navigation}
					filter_by={this.state.filter_by}
					searchText={this.state.searchText}
					_onFilterChange={(selectedValue)=>this._onFilterChange(selectedValue)}
					_onSearch={(text)=>this._onSearch(text)}
				/>

				<ListMovies
					movies={this.state.listMovies}
					refreshing={this.state.refreshing}
					navigation={this.props.navigation}
					is_searching={this.state.is_searching}
					_onLoadMore={()=>this._onLoadMore()}
					_onPullRefresh={()=>this._onPullRefresh()}
				/>

				<AppFooter
					_onFooterTab={(type)=>this._onFooterTab(type)}
				/>
			</Container>
		);
	}
}
