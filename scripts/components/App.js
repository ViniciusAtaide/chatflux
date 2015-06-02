import React from 'react';
import ChatList from './ChatList.react';
import NewMessage from './NewMessage.react';
import UserList from './UserList.react';
import ChatActions from '../actions/ChatActions';
import ChatStore from '../stores/ChatStore';
import UserStore from '../stores/UserStore';
import assign from 'object-assign';


function getState() {
  return assign(ChatStore.getAll(), UserStore.getAll());

}


export default class App extends React.Component {

  constructor() {
    super();
    this.state = getState();
  }

  componentDidMount() {
    ChatStore.addChangeListener(this._onChange.bind(this));
    UserStore.addChangeListener(this._onChange.bind(this));
    ChatActions.getMessages();
  }

  componentWillUnmount() {
    ChatStore.removeChangeListener(this._onChange);
    UserStore.removeChangeListener(this._onChange);
  }

  render() {
    let { loading } = this.state;
    return (
      <div>
        <h2>ChatApp</h2>
        <UserList users={ this.state.users } />
        <ChatList messages={ this.state.messages }/>
        <NewMessage />
        <p style={loading ? {display: 'block'} : {display: 'none'}  }>Loading</p>
      </div>
    );
  }

  _onChange() {
    this.setState(getState());
  }
}