import {
  SET_ACTIVITYGROUPS,
  LOADING_DATA,
  LIKE_ACTIVITYGROUP,
  UNLIKE_ACTIVITYGROUP,
  DELETE_ACTIVITYGROUP,
  SET_ERRORS,
  POST_ACTIVITYGROUP,
  CLEAR_ERRORS,
  LOADING_UI,
  SET_ACTIVITYGROUP,
  STOP_LOADING_UI,
  SUBMIT_COMMENT,
} from '../types';
import axios from 'axios';


// Get all ActivityGroups
export const getActivityGroups = () => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  axios
    .get('/activityGroups')
    .then((res) => {
      dispatch({
        type: SET_ACTIVITYGROUPS,
        payload: res.data
      });
    })
    .catch((err) => {
      dispatch({
        type: SET_ACTIVITYGROUPS,
        payload: []
      });
    });
};
export const getActivityGroup = (activityGroupId) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .get(`/activityGroup/${activityGroupId}`)
    .then((res) => {
      dispatch({
        type: SET_ACTIVITYGROUP,
        payload: res.data
      });
      dispatch({ type: STOP_LOADING_UI });
    })
    .catch((err) => console.log(err));
};
// Post a ActivityGroup
export const postActivityGroup = (newActivityGroup) => (dispatch) => {
  console.log(newActivityGroup);
  dispatch({ type: LOADING_UI });
  axios
    .post('/activitygroup', newActivityGroup)
    .then((res) => {
      dispatch({
        type: POST_ACTIVITYGROUP,
        payload: res.data
      });
      dispatch(clearErrors());
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data
      });
    });
};
// Like a ActivityGroup
export const joinActivityGroup = (activityGroupId) => (dispatch) => {
  axios
    .get(`/activitygroup/${activityGroupId}/join`)
    .then((res) => {
      dispatch({
        type: LIKE_ACTIVITYGROUP,
        payload: res.data
      });
    })
    .catch((err) => console.log(err));
};
// Unlike a ActivityGroup
export const leaveActivityGroup = (activityGroupId) => (dispatch) => {
  axios
    .get(`/activitygroup/${activityGroupId}/leave`)
    .then((res) => {
      dispatch({
        type: UNLIKE_ACTIVITYGROUP,
        payload: res.data
      });
    })
    .catch((err) => console.log(err));
};
// Submit a comment
export const submitComment = (activityGroupId, commentData) => (dispatch) => {
  axios
    .post(`/activitygroup/${activityGroupId}/comment`, commentData)
    .then((res) => {
      dispatch({
        type: SUBMIT_COMMENT,
        payload: res.data
      });
      dispatch(clearErrors());
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data
      });
    });
};
export const deleteActivityGroup = (activityGroupId) => (dispatch) => {
  axios
    .delete(`/activitygroup/${activityGroupId}`)
    .then(() => {
      dispatch({ type: DELETE_ACTIVITYGROUP, payload: activityGroupId });
    })
    .catch((err) => console.log(err));
};

export const getUserData = (userHandle) => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  axios
    .get(`/user/${userHandle}`)
    .then((res) => {
      dispatch({
        type: SET_ACTIVITYGROUPS,
        payload: res.data.activityGroups
      });
    })
    .catch(() => {
      dispatch({
        type: SET_ACTIVITYGROUPS,
        payload: null
      });
    });
};

export const clearErrors = () => (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};

export const editActivityGroupDetails = (activityGroupDetails) => (dispatch) => {
  console.log(activityGroupDetails)
  axios
    .post(`/activitygroup/${activityGroupDetails.activityGroupId}/edit`, activityGroupDetails)
    .then(() => {
      dispatch(getActivityGroup(activityGroupDetails.activityGroupId));
    })
    .catch((err) => console.log(err));
};

export const kickParticipant = (activityGroupId, userHandle) => (dispatch) => {
  axios
    .delete(`/activityGroup/${activityGroupId}/userhandle/${userHandle}/kick`)
    .then((res) => {
      dispatch({
        type: SET_ACTIVITYGROUP,
        payload: res.data
      });
    })
    .catch((err) => console.log(err));
};