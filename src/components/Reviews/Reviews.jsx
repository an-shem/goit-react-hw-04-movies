import { Component } from 'react';
import movieApi from '../../services/movieApi';
import Loading from '../Loading';

import styles from './Reviews.module.css';

class Reviews extends Component {
  state = {
    dataReviews: null,
    isLoading: false,
    showReviews: false,
    showNotFound: false,
  };

  async componentDidMount() {
    setTimeout(() => this.setState({ showNotFound: true }), 1000);
    this.setState({ isLoading: true });

    await movieApi
      .fetchReviews(this.props.id)
      .then(({ results }) =>
        results.map(result => ({
          author: result.author,
          content: result.content,
          id: result.id,
        })),
      )
      .then(arrayData => {
        if (arrayData.length > 0) {
          this.setState({
            dataReviews: arrayData,
            showReviews: true,
          });
        }
      })
      // .then(dataReviews => this.setState({ dataReviews }))
      .catch(error => console.log(error))
      .finally(this.setState({ isLoading: false }));

    console.log('this.props dataReviews >>>', this.state.dataReviews);
  }

  render() {
    const { dataReviews, isLoading, showReviews, showNotFound } = this.state;
    const ttt = (
      <h2 className={styles.titelError}>
        We don't have any reviews for this movie
      </h2>
    );

    return (
      <>
        {!isLoading && showReviews && (
          <ul className={styles.list}>
            {dataReviews.map(({ author, content, id }) => (
              <li key={id}>
                <h3>Author: {author}</h3>
                <p>{content}</p>
              </li>
            ))}
          </ul>
        )}
        {isLoading && <Loading />}
        {!isLoading && !showReviews && showNotFound && ttt}
      </>
    );
  }
}

export default Reviews;
