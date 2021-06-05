import { Component } from 'react';
import MoviesList from '../../components/MoviesList';
import movieApi from '../../services/movieApi.js';
import styles from './MoviesPage.module.css';

class MoviesPage extends Component {
  state = {
    value: '',
    searchMovies: null,
  };

  componentDidMount() {
    const moviesFromHistory = this.props.location.state;
    if (moviesFromHistory) {
      this.setState({ searchMovies: moviesFromHistory });
    }
    // console.log('this.props from MoviesPage >>>', this.props);
    // console.log('привет из дидмаунт муви, state >>>', this.state);
    // console.log('this.props.location.state >>>', this.props.location.state);
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  handeleSubmit = e => {
    e.preventDefault();
    const { value } = this.state;
    const processedValue = value.trim();
    if (processedValue.length === 0) return;
    movieApi
      .fetchSearchMovies(value)
      .then(searchMovies => this.setState({ searchMovies, value: '' }));
  };

  render() {
    const { value, searchMovies } = this.state;

    return (
      <div className={styles.moviesPage}>
        <form className={styles.searchForm} onSubmit={this.handeleSubmit}>
          <input
            className={styles.searchFormInput}
            type="text"
            name="value"
            value={value}
            autoComplete="off"
            autoFocus
            onChange={this.handleChange}
          />

          <button type="submit" className={styles.searchFormButton}>
            <span className={styles.searchFormButtonLabel}>Search</span>
          </button>
        </form>
        {searchMovies && <MoviesList movies={searchMovies} />}
      </div>
    );
  }
}

export default MoviesPage;
