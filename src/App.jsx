import { useState, useEffect, useRef, useCallback } from 'react'

import debounce from 'just-debounce-it'

import { Movies } from './components/ListMovies'
import { useMovies } from './hooks/useMovies'

import './App.css'

function useSearch() {
  const [search, setSearch] = useState('')
  const [error, setError] = useState(null)
  const isFirstInput = useRef(true)

  useEffect(() => {
    if (isFirstInput.current) {
      isFirstInput.current = search === ''
      return
    }

    if (search === '') {
      setError('No se puede buscar una película vacía')
      return
    }
    if (search.match(/^\d+$/)) {
      setError('No se puede buscar una película con número')
      return
    }
    if (search.length < 3) {
      setError('La búsqueda debe tener al menos tres caracteres')
      return
    }
  }, [search])

  return { search, error, setSearch }
}

function App() {
  const { search, setSearch, error } = useSearch()
  const [sort, setSort] = useState(false)
  const { movies, loading, getMovies } = useMovies({ search, sort })

  // ! Forma NO controlada
  // const handleSubmit = (event) => {
  //   event.preventDefault()
  //   const {query} = Object.fromEntries(new window.FormData(event.target))
  // }
  const debouncedGetMovies = useCallback(
    debounce( search => {
      getMovies({ search })
    }, 300),
    [getMovies]
  )
  const handleSubmit = (event) => {
    event.preventDefault()
    getMovies({ search })
  }

  const handleChange = (event) => {
    const newSearch = event.target.value
    setSearch(newSearch)
    debouncedGetMovies(newSearch)
  }

  const handleSort = () => {
    setSort(!sort)
  }

  return (
    <div className="page">
      <header>
        <h1>Buscador de películas</h1>
        <form className="form" onSubmit={handleSubmit}>
          <input
            type="text"
            value={search}
            placeholder="Avengers, Star wars, The matrix"
            onChange={handleChange}
          />
          <input type="checkbox" onChange={handleSort} checked={sort} />
          <button type="submit">Buscar</button>
        </form>
      </header>

      <main>
        {loading ? <p>Cargando...</p> : <Movies movies={movies} />}

        <p style={{ color: 'red' }}>{error}</p>
      </main>
    </div>
  )
}

export default App
