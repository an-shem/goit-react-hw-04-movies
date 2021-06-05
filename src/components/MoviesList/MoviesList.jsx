import { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
// import PropTypes from 'prop-types';
import styles from './MoviesList.module.css';

class MoviesList extends Component {
  render() {
    const { movies } = this.props;
    // console.log('render MoviesList & this.props >>>', this.props);

    return (
      <ul className={styles.list}>
        {movies.map(movie => {
          const { id, title } = movie;

          return (
            <li key={id} className={styles.link}>
              <Link
                to={{
                  pathname: `/movie/${id}`,
                  state: {
                    from: this.props.location,
                    movies: movies,
                  },
                }}
              >
                {title}
              </Link>
            </li>
          );
        })}
      </ul>
    );
  }
}

// export default MoviesList;

// const MoviesList = props => {
//   const { movies, location } = props;
//   if (!movies) return null;
//   return (
//     <ul className={styles.list}>
//       {movies.map(movie => {
//         const { id, title } = movie;

//         return (
//           <li key={id} className={styles.link}>
//             <Link
//               to={{
//                 pathname: `/movie/${id}`,
//                 state: { from: location },
//               }}
//             >
//               {title}
//             </Link>
//           </li>
//         );
//       })}
//     </ul>
//   );
// };

// MoviesList.propTypes = {
//   movies: PropTypes.array,
// };

export default withRouter(MoviesList);
