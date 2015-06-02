import ChatServerActionCreators from '../actions/ChatServerActions';
import request from 'superagent';

export default {
	getAllMessages() {
		request
      .get('api/v1/messages')
      .end(function (err, resp) {
        if (err) console.log(err);
        return ChatServerActionCreators.receiveAll(resp.body);
      });
	},

  addMessage(message) {
    request
      .post('api/v1/messages')
      .send({message: message})
      .end(function (err, resp) {
        if (err) {
          ChatServerActionCreators.errorMessage(message);
          return;
        }

        ChatServerActionCreators.receiveCreatedMessage(message);
      });
  },

  createUser(usr) {
    request
      .post('api/v1/users')
      .send(usr)
      .end(function (err, resp) {
        if (err) {
          ChatServerActionCreators.createUserError(usr);
          return;
        }

        ChatServerActionCreators.createUser(usr);
      });
  },

  loginUser(login) {
    request
      .post('api/v1/sessions')
      .send({login: login})
      .end(function (err, resp) {
        if (err) {
          ChatServerActionCreators.loginUserError(login);
          return;
        }

        ChatServerActionCreators.loginUser(login);
      });
  }
}