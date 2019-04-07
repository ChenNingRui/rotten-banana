import React from 'react';

export default class MovieListItem extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      checked: false,
      movieTitle: this.props.movie.title
    }
  }

  handleCheckboxChange (event) {
    this.setState({ checked: event.target.checked })
    this.props.receiveDataFromChild(
      this.state.movieTitle,
      event.target.checked
    )
  }

  render () {
    return (
      <div>
        <table key={this.props.movie.id} align='left'>
          <tbody>
            <tr>
              <td>
                <img
                  alt='poster'
                  width='120'
                  src={this.props.movie.poster_path}
                />
              </td>
              <td align='left'>
                <font size='5'>
                  <b>{this.props.movie.title}</b>
                </font>
                &nbsp;
                <font size='3'>{this.props.movie.vote_average}</font>
                <p>{this.props.movie.overview}</p>
              </td>
              <td>
                <input
                  type='checkbox'
                  onChange={this.handleCheckboxChange.bind(this)}
                />
                add to favor
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }
}
