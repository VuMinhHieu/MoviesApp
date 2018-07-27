
To run this project need follow these steps:
1. Clone this project.
2. Run `npm install` or `yarn install`
3. Run `react-native run-ios`

Or run app on real device via [expo](https://expo.io/@pious/moviesapp)
# Project 1 - *MoviesApp*

**Name of your app** is a movies app using the [The Movie Database API](http://docs.themoviedb.apiary.io/#).

Time spent: **20** hours spent in total

## User Stories

The following **required** functionality is completed:

- [ ] User can view a list of movies currently playing in theaters.
- [ ] User sees loading state while waiting for the API.
- [ ] User sees an error message when there is a network error.
- [ ] User can refresh the movie list.
- [ ] User can search/filter the movie results via a search bar.

The following **optional** features are implemented:

- [ ] Toggle between **Now Playing** and **Top Rated** movies.
- [ ] Sort Movies by rating, popularity, release date.
- [ ] Animations on open/close details.
- [ ] Multiple Layout Options

The following **additional** features are implemented:

- [ ] Pagination

## Video Walkthrough

Here's a walkthrough of implemented user stories:

GIF created with [LiceCap](https://github.com/VuMinhHieu/MoviesApp/blob/master/walkthrough.gif).

## Notes

Describe any challenges encountered while building the app.
1. In home component setState for 'movies_type' run after getListMovies function run - line 103
2. At page 3, now_playing tab. I sees that we have 2 film with same `release_date` so change sort from `popular -> release_date` get different result with change from `rating -> release_date`
## License

    Copyright [2018] [Pious]

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.