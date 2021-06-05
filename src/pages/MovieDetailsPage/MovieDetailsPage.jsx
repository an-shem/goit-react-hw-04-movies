import { Component } from 'react';
import { Link } from 'react-router-dom';
import movieApi from '../../services/movieApi';
import styles from './MovieDetailsPage.module.css';
import defoulImg from '../../images/ESlHHj2XkAIJUs4.jpg';

const IMAGE_URL = 'https://image.tmdb.org/t/p/w300';

class MovieDetailsPage extends Component {
  state = {
    movie: null,
    movies: this.props.location.state.movies,
  };

  componentDidMount() {
    // console.log(+this.props.match.params.movieID);
    const movieId = +this.props.match.params.movieID;
    movieApi.fetchMovie(movieId).then(movie => {
      this.setState({ movie });
    });
    // console.log('this.state.movies >>>', this.state.movies);
  }

  handleGoBack = () => {
    const { state } = this.props.location;
    // console.log('state.from <>>>', state.from);
    if (state) {
      this.props.history.push({ ...state.from, state: this.state.movies });
      // console.log('state.from <>>>', state.from);
      return;
    }

    this.props.history.push({
      pathname: '/',
    });
  };

  render() {
    if (!this.state.movie) return null;
    //
    // console.log(defoulImg);
    //
    const {
      genres,
      original_title: title,
      poster_path: imgUrl,
      overview,
      vote_average,
      release_date,
    } = this.state.movie;

    const ganresMovie = genres.map(item => item.name).join(' ');
    const path = this.props.match.url;
    const fullImageUrl = `${IMAGE_URL}${imgUrl}`;
    const imageUrl = imgUrl ? fullImageUrl : defoulImg;

    return (
      <>
        <div className={styles.moviePage}>
          <button
            type="button"
            onClick={this.handleGoBack}
            className={styles.btn}
          >
            {'<- Go beck'}
          </button>
          <div className={styles.aboutFilm}>
            <div className={styles.posterWrap}>
              <img src={imageUrl} alt="poster" className={styles.poster} />
            </div>
            <div className={styles.inform}>
              <h2 className={styles.titel}>
                {`${title}  (${Number.parseInt(release_date)})`}
              </h2>
              <p className={styles.informItem}>
                User Score: {vote_average * 10}%
              </p>
              <h3 className={styles.informItem}>Overview</h3>
              <p className={styles.informItem}>{overview}</p>
              <h3 className={styles.informItem}>Genres</h3>
              <p className={styles.informItem}>{ganresMovie}</p>
            </div>
          </div>
        </div>

        <div className={styles.additionalInformation}>
          <h3 className={styles.additionalInformationTitel}>
            Additional information
          </h3>
          <ul>
            <li className={styles.additionalInformationItem}>
              <Link to={`${path}/cast`}>Cast</Link>
            </li>
            <li className={styles.additionalInformationItem}>
              <Link to={`${path}/reviews`}>Reviews</Link>
            </li>
          </ul>
        </div>
      </>
    );
  }
}

export default MovieDetailsPage;
