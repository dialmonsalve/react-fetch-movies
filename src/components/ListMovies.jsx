import responseMovies from '../mocks/response-movies.json'

export function ListMovies({ movies }) {
  return (
    <ul className='movies' >
      {movies?.map((movie) => (
        <li className='movie' key={movie.id}>
          <h3>{movie.title}</h3>
          <p>{movie.year}</p>
          <img src={movie.image} alt={movie.Title} />
        </li>
      ))}
    </ul>
  )
}

export function NoMoviesResults() {
  return <p>No se encontraron películas para esta búsqueda</p>
}

export function Movies({ movies }) {
  const hasMovies = responseMovies.Search.length > 0

  return hasMovies ? <ListMovies movies={movies} /> : <NoMoviesResults />
}
