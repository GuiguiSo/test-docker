import {
  SET_USER,
  SET_AUTHENTICATED,
  SET_UNAUTHENTICATED,
  LOADING_USER,
  LIKE_ACTIVITYGROUP,
  UNLIKE_ACTIVITYGROUP,
  MARK_NOTIFICATIONS_READ
} from '../types';

const initialState = {
  authenticated: false,
  loading: false,
  credentials: {},
  activityGroupParticipants: [],
  notifications: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_AUTHENTICATED:
      return {
        ...state,
        authenticated: true
      };
    case SET_UNAUTHENTICATED:
      return initialState;
    case SET_USER:
      return {
        authenticated: true,
        loading: false,
        ...action.payload
      };
    case LOADING_USER:
      return {
        ...state,
        loading: true
      };
    case LIKE_ACTIVITYGROUP:
      return {
        ...state,
        activityGroupParticipants: [
          ...state.activityGroupParticipants,
          {
            userHandle: state.credentials.handle,
            activityGroupId: action.payload.activityGroupId
          }
        ]
      };
    case UNLIKE_ACTIVITYGROUP:
      return {
        ...state,
        activityGroupParticipants: state.activityGroupParticipants.filter(
          (activityGroupParticipant) => activityGroupParticipant.activityGroupId !== action.payload.activityGroupId
        )
      };
    case MARK_NOTIFICATIONS_READ:
      state.notifications.forEach((not) => (not.read = true));
      return {
        ...state
      };
    default:
      return state;
  }
}
