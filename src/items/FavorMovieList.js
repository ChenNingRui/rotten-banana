import React from 'react';

export default class FavorMovieList extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      favorList: [],
      checked: false,
      movieTitle: null
    }
  }

  render () {
    return (
      <div>
        <table key={this.props.movie} align='left'>
          <tbody>
            <tr>
              <td>{this.props.movie}</td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }
}
