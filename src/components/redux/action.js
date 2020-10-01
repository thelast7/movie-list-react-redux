import axios from 'axios'

export const getListGenre = () => async (dispatch) => {
  try {
    let temp = await axios.get('https://api.themoviedb.org/3/genre/movie/list?api_key=2fccde01a371b106b09a241d6d1d5b49')
    if (temp) {
      dispatch({ type: 'LIST_GENRES', value: temp.data.genres })
    }
  } catch (error) {
    console.log('error', error)
  }
}

export const getListMovies = query => async (dispatch) => {
  try {
    let temp = await axios.get(`https://api.themoviedb.org/3/movie/upcoming?api_key=2fccde01a371b106b09a241d6d1d5b49`, {
      params: query
    })
    if (temp) {
      dispatch({ type: 'LIST_MOVIES', value: temp.data })
    }
  } catch (error) {
    console.log('error', error);
  }
}

export const getDetailMovie = id => async (dispatch) => {
  try {
    let temp = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=2fccde01a371b106b09a241d6d1d5b49`)
    if (temp) {
      dispatch({ type: 'DETAIL_MOVIE', value: temp.data })
    }
  } catch (error) {
    console.log('error', error)
  }
}