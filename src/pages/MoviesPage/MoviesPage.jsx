import { Component } from 'react';
import queryString from 'query-string';

import MoviesList from '../../components/MoviesList';
import movieApi from '../../services/movieApi.js';
import styles from './MoviesPage.module.css';

class MoviesPage extends Component {
  state = {
    value: '',
    searchMovies: null,
  };

  async componentDidMount() {
    console.log('this.props in Mount >>>', this.props);

    const searchNoParse = await this.props.location.search;
    console.log('searchNoParse', searchNoParse);

    if (!searchNoParse) return;

    const search = queryString.parse(searchNoParse);
    console.log('SEARCH in Mount >>>', search);

    const searchQuery = search.query;
    console.log('searchQuery >>>>', searchQuery);
    movieApi
      .fetchSearchMovies(searchQuery)
      .then(searchMovies => this.setState({ searchMovies }));
  }

  componentDidUpdate(prevProps) {
    console.log('this.props in Upodate >>>', this.props);
    console.log('this.props in prevProps >>>', prevProps);

    if (this.props.location.search === prevProps.location.search) return;
    this.setState({ searchMovies: null });
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
      .then(searchMovies => this.setState({ searchMovies, value: '' }))
      .then(
        this.props.history.push({
          pathname: this.props.location.pathname,
          search: `query=${value}`,
        }),
      );
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
