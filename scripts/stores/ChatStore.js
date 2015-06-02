import Dispatcher from '../dispatcher/Dispatcher';
import Constants from '../constants/ChatConstants';
import assign from 'object-assign';
import { EventEmitter } from 'events';

var CHANGE_EVENT  = 'change'
  , ActionTypes   = Constants.ActionTypes
  , _messages     = []
  , _loading       = false;

function _addMessage(message) {
  _messages.push(message);
}

function _setMessages(messages) {
  _messages = messages;
}

var MessageStore = assign({}, EventEmitter.prototype, {

  emitChange() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  getAll() {
    return {
      messages: _messages,
      loading: _loading
    };
  }

});

MessageStore.dispatchToken = Dispatcher.register((action) => {

  switch (action.type) {

    case ActionTypes.ADDING_MESSAGE:
      _loading = true;
      MessageStore.emitChange();

      return;

    case ActionTypes.RECEIVE_MESSAGES:
      _setMessages(action.messages);

      MessageStore.emitChange();

      return;

    case ActionTypes.RECEIVE_CREATED_MESSAGE:
      _addMessage(action.message);
      _loading = false;

      MessageStore.emitChange();

      return;

    case ActionTypes.ERROR_MESSAGE:
      let msg = (typeof(action.message) === Object) ? action.message.message : action.message;
      _addMessage('A mensagem: ' + msg + ' nao pode ser enviada.');
      _loading = false;
      MessageStore.emitChange();

      return;

    default:
      return;

  }
});

module.exports = MessageStore;