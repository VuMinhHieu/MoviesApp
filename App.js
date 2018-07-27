import React from 'react';
import { createStackNavigator } from 'react-navigation';
import ListMovies from './listMovies';
import MovieItem from './movieItem';

const RootStack = createStackNavigator(
  {
    ListMovies: { screen: ListMovies, navigationOptions: { header: null } },
    MovieItem: MovieItem
  },
  {
    initialRouteName: 'ListMovies',
  }
);

export default class App extends React.Component {
  render() {
    return <RootStack />;
  }
}