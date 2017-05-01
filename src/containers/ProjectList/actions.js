import database from '../../firebase';

export const PROJECT_LIST_REQUEST = 'PROJECT_LIST_REQUEST'
export const PROJECT_LIST_SUCCESS = 'PROJECT_LIST_SUCCESS'
export const PROJECT_LIST_FAILURE = 'PROJECT_LIST_FAILURE'

const projectsListRequested = () => ({
  type: PROJECT_LIST_REQUEST
})

const projectsListSuccess = (projects) => ({
  type: PROJECT_LIST_SUCCESS,
  projects
})

const projectsListFailed = (error) => ({
  type: PROJECT_LIST_FAILURE,
  error
})

export function fetchProjects() {
  return dispatch => {
    dispatch(projectsListRequested());
    return database.ref('/projects').once('value', snap => {
      const projects = snap.val();
      dispatch(projectsListSuccess(projects))
    })
    .catch((error) => {
      console.log(error);
      dispatch(projectsListFailed(error));
    });
  }
}
