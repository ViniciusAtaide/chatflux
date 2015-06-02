import Dispatcher from '../dispatcher/Dispatcher';
import Constants from '../constants/ChatConstants';

var ActionTypes = Constants.ActionTypes;

export default {

	receiveAll(messages) {
		Dispatcher.dispatch({
			type: ActionTypes.RECEIVE_MESSAGES,
			messages: messages.map((m) => {return m.message;})
		});
	},

	receiveCreatedMessage(createdMessage) {
		Dispatcher.dispatch({
			type: ActionTypes.RECEIVE_CREATED_MESSAGE,
			message: createdMessage
		});
	},

	errorMessage(message) {
		Dispatcher.dispatch({
			type: ActionTypes.ERROR_MESSAGE,
			message: message
		});
	},

	createUser(usr) {
		Dispatcher.dispatch({
			type: ActionTypes.CREATE_USER,
			user: usr
		});
	},
	createUserError() {
		Dispatcher.dispatch({
			type: ActionTypes.USER_ERROR
		});
	}
}