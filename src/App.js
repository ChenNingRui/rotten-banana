import React, { Component } from 'react';
import './App.css';
import MovieListItem from './items/MovieListItem';
import FavorMovieList from './items/FavorMovieList';
import $ from 'jquery';

export default class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      movies: null,
      searchTerm: 'Banana',
      loading: true,
      favorListVisible: false,
      favorMovieList: [],
      movieTitle: null,
      checked: null
    }

    this.fetchMoviesData(this.state.searchTerm)
  }

  onSearchChangeListener (event) {
    const searchTerm = event.target.value
    this.fetchMoviesData(searchTerm)
  }

  onfavorListVisibleClickListener (event) {
    this.setState({ favorListVisible: !this.state.favorListVisible })
  }

  receiveDataFromChild (movieTitle, checked) {
    var movieRows = this.state.favorMovieList

    var index = movieRows.indexOf(movieTitle)
    if (index === -1) {
      movieRows.push(movieTitle)
    }

    if (index !== -1 && !checked) {
      movieRows.splice(index, 1)
    }

    this.setState({ favorMovieList: movieRows })
    this.inputToFavorTable()
  }

  inputToFavorTable () {
    var moviefavors = []
    this.state.favorMovieList.forEach(movie => {
      const movieRow = <FavorMovieList movie={movie} />
      moviefavors.push(movieRow)
    })

    this.setState({ favors: moviefavors })
  }

  fetchMoviesData (str) {
    const url =
      'https://api.themoviedb.org/3/search/movie?api_key=03641267623b564e1a54b4271496b5a5&query=' +
      str

    $.ajax({
      url: url,
      success: searchResults => {
        console.log('Fetched data successfully')
        const results = searchResults.results

        var movieRows = []

        results.forEach(movie => {
          movie.poster_path =
            'https://image.tmdb.org/t/p/w185' + movie.poster_path
          const movieRow = (
            <MovieListItem
              key={movie.id}
              movie={movie}
              handleCheckboxChange={this.onHandleCheckboxChange}
              receiveDataFromChild={this.receiveDataFromChild.bind(this)}
            />
          )
          movieRows.push(movieRow)
          console.log(movie.poster_path)
        })

        this.setState({ rows: movieRows, loading: false })
      },
      error: (xhr, status, err) => {
        console.error('Failed to fetch data')
      }
    })
  }

  render () {
    return (
      <div className='App'>
        <div>
          <table className='titleBar'>
            <tbody>
              <tr>
                <td>
                  <img
                    alt='app icon'
                    height='20%'
                    width='20%'
                    src='https://i1.kknews.cc/SIG=1i4f07m/10695/7655662068.jpg'
                  />
                </td>
                <td witdth='8'>
                  <h1>Rotten Banna</h1>
                </td>
              </tr>
            </tbody>
          </table>
          <div>
            <input
              placeholder='Enter the movie name'
              className='searchBar'
              onChange={this.onSearchChangeListener.bind(this)}
            />
            {this.state.favorListVisible ? (
              <div>{this.state.favors}</div>
            ) : null}
            <button onClick={this.onfavorListVisibleClickListener.bind(this)}>
              show my favor movies
            </button>
          </div>
          {this.state.loading || !this.state.rows ? (
            <div>loading....</div>
          ) : (
            <div>{this.state.rows}</div>
          )}
        </div>
      </div>
    )
  }
}
