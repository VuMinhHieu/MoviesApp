import React from 'react';
import {Spinner, Container, Content, View } from 'native-base';
import { RefreshControl} from 'react-native';
import ListMovies from '../components/listMovies';
import AppHeader from '../components/header';
import Pagination from '../components/pagination';
import AppFooter from '../components/footer';

import styles from  '../components/style';

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
		};
	}

	componentWillMount() {
		setTimeout( ()=>{
			this.getListMovies(this.state.paged);
		}, 0);
	}

	async getListMovies(page = 1, type = 'now_playing') {
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
		this.setState({
			isLoading: true,
		});
		this.getListMovies(1, type);
	}

	render() {
		return (
			<Container>
				<AppHeader
					navigation={this.props.navigation}
					filter_by={this.state.filter_by}
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

					{this.state.isLoading ? <View style={styles.loading}><Spinner/></View> :
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
					_onFooterTab={(type)=>this._onFooterTab(type)}
				/>
			</Container>
		);
	}
}
