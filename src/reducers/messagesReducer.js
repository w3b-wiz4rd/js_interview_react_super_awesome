/* API */
import { getMessages, sendMessage } from "../api/chat";
/* Utils */
import { errorHandling } from "../errorHandling";

// Action types
const FETCH_MESSAGES = "FETCH_MESSAGES";
const ADD_MESSAGE = "ADD_MESSAGE";

const INTIAL_STATE = {
  messages: []
};

export const fetchMessagesAction = () => async dispatch => {
  try {
    const response = await getMessages();
    dispatch({ type: FETCH_MESSAGES, payload: response.data });
  } catch (err) {
    errorHandling(err);
  }
};

export const sendMessageAction = (name, message) => async dispatch => {
  try {
    const response = await sendMessage(name, message);
    dispatch({ type: ADD_MESSAGE, payload: response.data });
  } catch (err) {
    errorHandling(err);
  }
};

export default (state = INTIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_MESSAGES:
      return { ...state, messages: action.payload };
    case ADD_MESSAGE:
      return { ...state, messages: [...state.messages, action.payload] };
    default:
      return state;
  }
};
