import { 
  PROJECT_LIST_REQUEST,
  PROJECT_LIST_SUCCESS,
  PROJECT_LIST_FAILURE 
} from './actions'


const initialState = {
  loading: false,
  list: {},
  error: null
}

export function projectsReducer(state = initialState, action) {
  switch(action.type) {
    case PROJECT_LIST_REQUEST:
      return Object.assign({}, state, {
        loading: true
      })
    case PROJECT_LIST_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        list: action.projects
      })
    case PROJECT_LIST_FAILURE:
      return Object.assign({}, state, {
        loading: false,
        error: action.error
      })
    default:
      return state;
  }
}