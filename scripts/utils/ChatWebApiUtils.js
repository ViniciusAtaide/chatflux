import ChatServerActionCreators from '../actions/ChatServerActions';
import request from 'superagent';

export default {
	getAllMessages() {
		request
      .get('api/v1/messages')
      .end(function (err, resp) {
        if (err) console.log(err);
        return resp.body.length ? ChatServerActionCreators.receiveAll(resp.body) : ['Nenhuma Mensagem'];
      });
	},

  addMessage(message) {
    request
      .post('api/v1/messages')
      .send({message: message})
      .end(function (err, resp) {
        if (err) console.log(err);
        ChatServerActionCreators.receiveCreatedMessage(message);
      });
  }
}