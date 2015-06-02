import React from 'react';
import ChatActions from '../Actions/UserActions';

export default class UserList extends React.Component {

  _login() {
    let login = this.refs.login.getDOMNode();

    ChatActions.loginAction(login.value);
    login.value = "";
  }

  _subscribe() {
    let login = this.refs.login.getDOMNode();

    ChatActions.createUser(login.value);
    login.value = "";
  }

  render() {
    let style = {
      ul: {
        margin: 0,
        padding: 5
      },
      li: {
        margin: '0 10px',
        listStyleType: 'none',
        display: 'inline-block'
      }
    };

    let users = this.props.users.map((user) => {
      return <li style={style.li} key={user._id}>{user.name}</li>
    });


    return (
 			<div>
        <form onSubmit={this._login.bind(this)}>
          <input type="text" ref="login" />
          <input type="submit" value="Login"/>
          <button onClick={this._subscribe.bind(this)}>Cadastro</button>
        </form>
        <ul style={style.ul}>
          {users}
        </ul>
 			</div>
    );
  }
}