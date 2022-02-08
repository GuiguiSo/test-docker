
import {
  SET_ACTIVITYGROUPS,
  LIKE_ACTIVITYGROUP,
  UNLIKE_ACTIVITYGROUP,
  LOADING_DATA,
  DELETE_ACTIVITYGROUP,
  POST_ACTIVITYGROUP,
  SET_ACTIVITYGROUP,
  SUBMIT_COMMENT
} from '../types';

const initialState = {
  activityGroups: [],
  activityGroup: {},
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOADING_DATA:
      return {
        ...state,
        loading: true
      };
    case SET_ACTIVITYGROUPS:
      return {
        ...state,
        activityGroups: action.payload,
        loading: false
      };
    case SET_ACTIVITYGROUP:
      return {
        ...state,
        activityGroup: action.payload
      };
    case LIKE_ACTIVITYGROUP:
    case UNLIKE_ACTIVITYGROUP:
      let index = state.activityGroups.findIndex(
        (activityGroup) => activityGroup.activityGroupId === action.payload.activityGroupId
      );
      state.activityGroups[index] = action.payload;
      if (state.activityGroup.activityGroupId === action.payload.activityGroupId) {
        state.activityGroup = action.payload;
      }
      return {
        ...state
      };
    case DELETE_ACTIVITYGROUP:
      index = state.activityGroups.findIndex(
        (activityGroup) => activityGroup.activityGroupId === action.payload
      );
      state.activityGroups.splice(index, 1);
      return {
        ...state
      };
    case POST_ACTIVITYGROUP:
      return {
        ...state,
        activityGroups: [action.payload, ...state.activityGroups]
      };
    case SUBMIT_COMMENT:
      return {
        ...state,
        activityGroup: {
          ...state.activityGroup,
          comments: [action.payload, ...state.activityGroup.comments]
        }
      };
    default:
      return state;
  }
}
