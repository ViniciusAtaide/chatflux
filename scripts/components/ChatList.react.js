import React from 'react';

export default class ChatList extends React.Component {

  render() {
    let { messages } = this.props;

    let style= {
      ul: {
        padding: 0,
        margin: 0,
        height: 300,
        width: 1000,
        border: '1px solid black',
        overflowY: 'scroll'
      },
      li: {
        listStyleType: 'none',
        display: 'block',
        margin: '0 10px'
      }
    };

    let messagelist = messages.map((m, i) => {
      return (
        typeof(m) === Object ?
          <li style={style.li} key={i}>{m.user}: {m.message}</li>
        :
          <li style={style.li} key={i}>{ m }</li>
      );
    });

    return (
      <div>
        <ul style={style.ul}>
          {messagelist}
        </ul>
      </div>
    );
  }

};
