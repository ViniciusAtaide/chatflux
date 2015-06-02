import Dispatcher from '../dispatcher/Dispatcher';
import Constants from '../constants/ChatConstants';
import { EventEmitter } from 'events';
import assign from 'object-assign';

var CHANGE_EVENT  = 'change'
  , ActionTypes   = Constants.ActionTypes
  , _users        = []
  , _logged       = null
  , error         = false;

function _addUsr(usr) {
  _users.push(usr);
}

var UserStore = assign({}, EventEmitter.prototype, {

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
      users: _users
    };
  }

});
UserStore.dispatchToken = Dispatcher.register((action) => {
  switch (action.type) {

    case ActionTypes.LOGIN_USER:
      let usr = _users
        .filter((user) => { return user.name === action.user.name});
      _logged = usr !== null ? usr : null;
      UserStore.emitChange();

      return;

    case ActionTypes.CREATE_USER:
      _addUsr(action.user);
      UserStore.emitChange();

      return;
    case ActionTypes.USER_ERROR:
      error = true;
      UserStore.emitChange();

      return;
    default:
      return;
  }
});
export default UserStore;