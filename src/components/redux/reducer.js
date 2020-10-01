const initialState = {
  listGenre: [],
  listMovie: {},
  movieDetail: {},
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LIST_GENRES':
      return {
        ...state,
        listGenre: action.value
      }  
    case 'LIST_MOVIES':
      return {
        ...state,
        listMovie: action.value
      }
    case 'DETAIL_MOVIE':
      return {
        ...state,
        movieDetail: action.value
      }
    default:
      return state
  }
}

export default reducer