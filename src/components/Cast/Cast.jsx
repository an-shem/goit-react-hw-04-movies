import { Component } from 'react';
import Loading from '../Loading';
import movieApi from '../../services/movieApi.js';
import styles from './Cast.module.css';
import defaulImg from '../../images/unnamed.png';

const IMAGE_URL = 'https://image.tmdb.org/t/p/w154';

class Cast extends Component {
  state = {
    dataCast: null,
    isLoading: false,
    showCast: false,
    showNotFound: false,
  };

  componentDidMount() {
    setTimeout(() => this.setState({ showNotFound: true }), 1000);
    this.setState({ isLoading: true });

    movieApi
      .fetchCast(this.props.id)
      .then(({ cast }) =>
        cast.map(item => ({
          name: item.name,
          character: item.character,
          img: item.profile_path,
        })),
      )
      .then(arrayData => {
        if (arrayData.length > 0) {
          this.setState({
            dataCast: arrayData,
            showCast: true,
          });
        }
      })
      .catch(error => console.log(error))
      .finally(this.setState({ isLoading: false }));
    console.log('this.props Cast >>>', this.props);
  }

  render() {
    const { dataCast, isLoading, showCast, showNotFound } = this.state;

    return (
      <>
        {isLoading && <Loading />}
        {!isLoading && showCast && (
          <ul className={styles.list}>
            {dataCast.map(({ name, character, img }) => {
              console.log('путь картинки >>>', img);
              const authorImg = img ? `${IMAGE_URL}${img}` : defaulImg;
              return (
                <li className={styles.listItem} key={name}>
                  <div className={styles.imgWrapp}>
                    <img
                      className={styles.authorImg}
                      src={authorImg}
                      alt="actor"
                    />
                  </div>
                  <p>{name}</p>
                  <p>Character: {character}</p>
                </li>
              );
            })}
          </ul>
        )}
        {!isLoading && !showCast && showNotFound && (
          <h2 className={styles.titelError}>DATA NOT FOUND</h2>
        )}
      </>
    );
  }
}

export default Cast;
