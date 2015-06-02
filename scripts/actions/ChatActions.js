import Dispatcher from '../dispatcher/Dispatcher';
import Constants from '../constants/ChatConstants';
import ApiUtils from '../utils/ChatWebApiUtils';

export default {
  newMessage(message) {
    Dispatcher.dispatch({
      type: Constants.ActionTypes.ADDING_MESSAGE,
      message: message
    });
    ApiUtils.addMessage(message);
  },
  getMessages() {
    ApiUtils.getAllMessages();
  },
  createUser(user) {

  },
  loginAction(login) {
    ApiUtils.loginUser(login);
  }
};