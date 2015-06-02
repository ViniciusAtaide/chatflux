import React from 'react';
import ChatActions from '../actions/ChatActions';

export default class NewMessage extends React.Component {

  _newMessage(e) {

    e.preventDefault();
    let newmessage = this.refs.newmessage.getDOMNode();

    ChatActions.newMessage(newmessage.value);

    newmessage.value = '';

  }

  render() {
    return (
 			<div>
        <form onSubmit={this._newMessage.bind(this)} method="post">
          <input type="text" ref="newmessage" placeholder="Digite uma nova mensagem" />
          <input type="submit" value="nova mensagem!"/>
        </form>
 			</div>
    );
  }
}